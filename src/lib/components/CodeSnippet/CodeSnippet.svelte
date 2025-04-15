<script lang="ts">
    import { tick, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import "@catppuccin/highlightjs/css/catppuccin-latte.css";
    import CopyIcon from "~icons/carbon/copy";
   	import Tooltip from '../Tooltip/Tooltip.svelte';

    // --- highlight.js setup ---
    import hljs from "highlight.js/lib/core";
    // Import only necessary languages
    import javascript from "highlight.js/lib/languages/javascript";
    import css from "highlight.js/lib/languages/css";
    import xml from "highlight.js/lib/languages/xml"; // Used for html too
    import json from "highlight.js/lib/languages/json";
    import bash from "highlight.js/lib/languages/bash";
    import plaintext from "highlight.js/lib/languages/plaintext";
    import svelte from "highlight.js/lib/languages/xml"; // Often XML works ok for Svelte structure initially

    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("js", javascript);
    hljs.registerLanguage("typescript", javascript); // Often JS works ok for TS
    hljs.registerLanguage("ts", javascript);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("xml", xml);
    hljs.registerLanguage("html", xml);
    hljs.registerLanguage("svelte", svelte); // Register svelte alias
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("shell", bash);
    hljs.registerLanguage("plaintext", plaintext);
    // --- End highlight.js setup ---

    // --- Props ---
    /** The code content to display */
    export let code = "";
    /** The highlight.js language alias (e.g., 'javascript', 'css', 'svelte') */
    export let language = "plaintext"; // Default to plaintext
    /** Type of snippet */
    export let type: "single" | "multi" | "inline" = "multi";
    /** Text for the "Show more" button */
    export let showMoreText = "Show more";
    /** Text for the "Show less" button */
    export let showLessText = "Show less";
    /** Aria-label for the copy button */
    export let copyButtonDescription = "Copy code";
    /** Feedback text after copying */
    export let copyFeedback = "Copied!";
    /** Duration (ms) to show copy feedback */
    export let copyTimeoutDuration = 2000;
    /** For multi-line: max lines shown before needing expansion (0 = never collapse) */
    export let maxLinesBeforeExpand = 15;
    /** Wrap long lines in multi-line snippets */
    export let wrapText = false;
    /** Whether to highlight the code */
    export let highlight = true;
    /** Whether to expand the multi-line snippet by default */
    export let expandedByDefault = false;
    /** Add custom classes to the wrapper */
    let className = "";
    export { className as class };

    // --- State ---
    let codeContainerElement: HTMLElement;
    let isExpanded = expandedByDefault;
    let needsExpansion = false;
    let copyStatus: "idle" | "copied" | "error" = "idle";
    let copyTimeout: ReturnType<typeof setTimeout> | null = null;

    $: isMultiline = type === "multi";
    $: isSingleLine = type === "single";
    $: isInline = type === "inline";

    // --- Highlight Logic ---
    // Basic HTML escaping function for fallback
    function escapeHtml(unsafe: string): string {
        if (unsafe === null || unsafe === undefined) return "";
        return String(unsafe)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    $: highlightedCode = (() => {
        if (!highlight) return escapeHtml(code); // Use basic escaping if highlighting is disabled

        const langToUse = language || "plaintext";
        // Verify language exists, fallback to plaintext
        const effectiveLang = hljs.getLanguage(langToUse)
            ? langToUse
            : "plaintext";

        try {
            // Ensure code is a string
            const codeToHighlight = String(code ?? "");
            return hljs.highlight(codeToHighlight, {
                language: effectiveLang,
                ignoreIllegals: true,
            }).value;
        } catch (e) {
            console.error(
                `highlight.js error for language "${effectiveLang}":`,
                e,
            );
            return escapeHtml(code); // Fallback to escaped HTML on error
        }
    })();

    // --- Expansion Logic ---
    $: {
        if (isMultiline && maxLinesBeforeExpand > 0) {
            const lineCount = (code || "").split("\n").length;
            needsExpansion = lineCount > maxLinesBeforeExpand;
            // If it no longer needs expansion, ensure it's collapsed (unless initially expanded)
            if (!needsExpansion && !expandedByDefault) isExpanded = false;
            // If it needs expansion, set initial state based on prop
            if (needsExpansion) isExpanded = expandedByDefault;
        } else {
            needsExpansion = false;
            isExpanded = false; // Cannot be expanded if it doesn't need it
        }
    }

    // --- Lifecycle ---
    onDestroy(() => {
        if (copyTimeout) clearTimeout(copyTimeout);
    });

    // --- Enhanced Copy Handlers ---
    function handleCopy() {
        if (copyStatus === "copied") return;

        // Try using the Clipboard API first (modern approach)
        if (browser && navigator.clipboard) {
            navigator.clipboard
                .writeText(code)
                .then(() => {
                    copyStatus = "copied";
                    resetCopyTimeout();
                })
                .catch((err) => {
                    console.error("Clipboard API error:", err);
                    // Fall back to execCommand method
                    fallbackCopy();
                });
        } else if (browser) {
            // Fall back to older method if Clipboard API not available
            fallbackCopy();
        }
    }

    // Fallback copy method using execCommand (older browsers)
    function fallbackCopy() {
        try {
            // Create a temporary textarea element to hold our text
            const textArea = document.createElement("textarea");
            textArea.value = code;

            // Make it non-visible but functional
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            // Execute copy command
            const successful = document.execCommand("copy");

            // Clean up
            document.body.removeChild(textArea);

            if (successful) {
                copyStatus = "copied";
                resetCopyTimeout();
            } else {
                copyStatus = "error";
                console.error("fallback copy failed");
                resetCopyTimeout();
            }
        } catch (err) {
            console.error("Fallback copy error:", err);
            copyStatus = "error";
            resetCopyTimeout();
        }
    }

    // Helper to reset the copy status after timeout
    function resetCopyTimeout() {
        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyStatus = "idle";
            copyTimeout = null;
        }, copyTimeoutDuration);
    }

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>


{#if isInline}
    <code class="themed-cs--inline hljs {language} {className}">
        <!-- Use {@html} only if highlighting is enabled and successful -->
        {@html highlightedCode}
    </code>
{:else}
    <div
        class="themed-cs-container {className}"
        class:themed-cs--single={isSingleLine}
        class:themed-cs--multi={isMultiline}
    >
        <div
            bind:this={codeContainerElement}
            class="themed-cs-content"
            class:themed-cs--collapsed={needsExpansion && !isExpanded}
            style={needsExpansion && !isExpanded
                ? `--max-collapsed-lines: ${maxLinesBeforeExpand};`
                : null}
        >
            <pre
                class="hljs themed-cs-pre"
                class:themed-cs--wrap={wrapText}><code
                    class="themed-cs-code {language}"
                    >{@html highlightedCode}</code
                ></pre>
        </div>

        {#if isMultiline && needsExpansion}
            <button
                class="themed-cs-expand-btn"
                on:click={toggleExpand}
                type="button"
            >
                {isExpanded ? showLessText : showMoreText}
            </button>
        {/if}

        {#if type !== 'inline'}
			<div class="themed-cs-copy-btn-container">
                        <!-- The Button itself -->
				<button
					class="themed-cs-copy-btn"
					class:themed-cs--copied={copyStatus === 'copied'}
					on:click={handleCopy}
					aria-label={copyButtonDescription}
					aria-describedby={copyStatus === 'copied' ? 'copy-tooltip' : undefined}
					disabled={copyStatus === 'copied'}
					type="button"
				>
					<!-- Only show icon -->
                            <CopyIcon aria-hidden="true" size={16} />
                            <span class="themed-visually-hidden">{copyButtonDescription}</span>
				</button>

                        <!-- The Tooltip, controlled by copyStatus -->
                        <Tooltip
					id="copy-tooltip"
                            text={copyFeedback}
                            open={copyStatus === 'copied'}
                            position="top"
                        />

				<!-- REMOVED the old hover/focus span tooltip -->
				<!-- <span class="themed-cs-copy-tooltip">{copyButtonDescription}</span> -->
			</div>
		{/if}
    </div>
{/if}

<style>
    /* --- Variables (Reference NLDS core.css) --- */
    .themed-cs-container,
    .themed-cs--inline {
        /* Using component scope for defaults/overrides, referencing NLDS vars */
        --cs-background: var(--nlds-code-bg, #f4f4f4);
        --cs-background-inline: var(--nlds-code-bg-inline, #ededed);
        --cs-text-color: var(
            --nlds-code-text,
            #161616
        ); /* Updated - Base text, tokens colored by hljs theme */
        --cs-border-color: var(--nlds-border-color, #e0e0e0);
        --cs-focus-color: var(--nlds-accent-primary, #ff9351);
        --cs-button-bg: transparent; /* Ghost-like */
        --cs-button-bg-hover: var(--nlds-accent-bg-hover, #e5e5e5);
        --cs-button-bg-active: var(--nlds-accent-bg, #e0e0e0);
        --cs-button-text-color: var(--nlds-text-secondary, #525252);
        --cs-button-text-hover: var(--nlds-text-primary, #161616);
        --cs-copy-feedback-color: var(
            --nlds-success-color, /* Consider adding --nlds-success-color to core */
            #198038 /* Default green if not defined */
        );
        --cs-line-height: 1.4; /* Component specific */
        --cs-font-family: var(--nlds-font-mono, monospace);
        --cs-font-size: 0.875rem; /* Component specific (14px) */
        --cs-inline-font-size: 0.9em; /* Component specific */
        --cs-padding: 1rem; /* Component specific */
        --cs-button-padding: 0.5rem; /* Component specific */
        --cs-button-size: 2rem; /* Component specific */
        --cs-border-radius: 0; /* Component specific (Consistent with Carbon) */
        --cs-outline-offset: -2px; /* Component specific */
    }

    /* --- Base Container Styles --- */
    .themed-cs-container {
        position: relative;
        background-color: var(--cs-background);
        border: 1px solid var(--cs-border-color);
        border-radius: var(--cs-border-radius);
        margin: 1rem 0;
        color: var(--cs-text-color);
        font-family: var(--cs-font-family);
        font-size: var(--cs-font-size);
        line-height: var(--cs-line-height);
    }
    /* Single line container adjustments */
    .themed-cs-container.themed-cs--single {
        display: flex;
        align-items: center;
    }

    /* --- Code Content Area --- */
    .themed-cs-content {
        overflow: hidden;
    }

    /* --- Pre & Code tags --- */
    .themed-cs-pre.hljs {
        margin: 0;
        padding: var(--cs-padding);
        overflow-x: auto;
        white-space: pre;
        /* CRITICAL: Override hljs theme background/color */
        background-color: transparent !important;
        color: inherit !important;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
    /* Text wrapping */
    .themed-cs-pre.themed-cs--wrap {
        white-space: pre-wrap;
        word-break: break-all;
    }
    /* Code tag reset */
    .themed-cs-code {
        display: block;
        background: none !important;
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        line-height: inherit !important;
        white-space: inherit !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    /* Single line pre/code adjustments */
    .themed-cs-container.themed-cs--single .themed-cs-pre {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-right: calc(
            var(--cs-button-size) + var(--cs-padding) * 0.5
        );
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex-grow: 1;
    }
    .themed-cs-container.themed-cs--single .themed-cs-code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    /* --- Inline Specific --- */
    .themed-cs--inline.hljs {
        display: inline;
        font-family: var(--cs-font-family); /* Mono font */
        background-color: var(--cs-background-inline);
        padding: 0.1em 0.4em;
        border-radius: 3px;
        font-size: var(--cs-inline-font-size);
        color: var(--cs-text-color); /* Use code text color */
        white-space: normal;
        line-height: inherit;
        vertical-align: baseline;
    }

    /* --- Collapse/Expand --- */
    .themed-cs-content.themed-cs--collapsed {
        max-height: calc(
            var(--max-collapsed-lines, 15) * var(--cs-line-height) *
                var(--cs-font-size) + (var(--cs-padding) * 2)
        );
        position: relative;
    }
    /* Optional: Fade effect at bottom when collapsed */
    .themed-cs-content.themed-cs--collapsed::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3rem;
        background: linear-gradient(
            to bottom,
            transparent,
            var(--cs-background) /* Use the actual code background */
        );
        pointer-events: none;
    }

    /* --- Buttons (Base) --- */
    .themed-cs-expand-btn,
    .themed-cs-copy-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--cs-button-padding);
        font-size: 0.875rem; /* ~14px */
        font-family: var(--nlds-font-sans, sans-serif);
        line-height: 1;
        background-color: var(--cs-button-bg);
        border: 1px solid transparent;
        border-radius: var(--cs-border-radius);
        cursor: pointer;
        color: var(--cs-button-text-color);
        transition:
            background-color 70ms ease-in-out,
            color 70ms ease-in-out;
        width: var(--cs-button-size);
        height: var(--cs-button-size);
        box-sizing: border-box;
    }
    .themed-cs-expand-btn:hover:not(:disabled),
    .themed-cs-copy-btn:hover:not(:disabled) {
        background-color: var(--cs-button-bg-hover);
        color: var(--cs-button-text-hover);
    }
    .themed-cs-expand-btn:active:not(:disabled),
    .themed-cs-copy-btn:active:not(:disabled) {
        background-color: var(--cs-button-bg-active);
    }
    .themed-cs-expand-btn:focus-visible,
    .themed-cs-copy-btn:focus-visible {
        outline: 2px solid var(--cs-focus-color);
        outline-offset: var(--cs-outline-offset);
        position: relative;
        z-index: 3;
    }
    .themed-cs-expand-btn:disabled,
    .themed-cs-copy-btn:disabled {
        cursor: default;
        background-color: transparent;
        /* Consider using nlds-disabled-text color if needed */
        /* color: var(--nlds-disabled-text); */
    }

    /* --- Expand Button Specific --- */
    .themed-cs-expand-btn {
        /* Note: Positioned via JS if needed, or adjust positioning */
        /* Example static positioning: */
        position: absolute;
        bottom: calc(var(--cs-padding) / 2);
        right: calc(var(--cs-padding) / 2);
        width: auto; /* Fit text */
        height: auto; /* Fit text */
        padding: 0.3rem 0.75rem;
        z-index: 2;
    }

    /* --- Copy Button Specific --- */
    .themed-cs-copy-btn-container {
		position: absolute; /* Absolute within .themed-cs-container */
		top: 0;
		right: 0;
		padding: calc(var(--cs-padding) / 2); /* Consistent spacing */
		z-index: 2;
		/* This container now holds the button AND the tooltip */
	}
    .themed-cs-copy-btn {
        position: relative; /* Relative positioning is fine now */
    }

    .themed-cs-copy-btn.themed-cs--copied {
        color: var(--cs-copy-feedback-color);
        background-color: transparent; /* Keep transparent when copied */
    }
    .themed-cs-copy-btn.themed-cs--copied:hover {
        background-color: transparent;
    }

    /* --- Utility --- */
    .themed-visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }
</style>
