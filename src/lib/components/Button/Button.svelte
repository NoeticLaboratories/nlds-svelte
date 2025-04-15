<script lang="ts">
    import type { ComponentType, SvelteComponent } from "svelte";
    import { createEventDispatcher } from "svelte";

    /** The visual style of the button */
    export let kind: "primary" | "secondary" | "tertiary" | "danger" | "ghost" =
        "primary";

    /** The size of the button */
    export let size: "sm" | "md" | "lg" = "md";

    /** Set to true to disable the button */
    export let disabled: boolean = false;

    /** Optional: Provide an href to render the button as an anchor link */
    export let href: string | undefined = undefined;

    /** Optional: The Svelte component to use as the icon */
    export let icon: ComponentType<SvelteComponent> | undefined = undefined;

    /** Required if `icon` is provided and `hasIconOnly` is true. Describes the icon for screen readers. */
    export let iconDescription: string | undefined = undefined;

    /** Set to true if the button should only contain an icon */
    export let hasIconOnly: boolean = false;

    /** Specify the type attribute for the button element */
    export let type: "button" | "submit" | "reset" = "button";

    /** For anchor links, specify the target attribute */
    export let target: string | undefined = undefined;

    /** For anchor links, specify the rel attribute */
    export let rel: string | undefined = undefined;

    /** Any additional classes to apply to the button */
    let className: string = "";
    export { className as class };

    /** Forwarded click event */
    const dispatch = createEventDispatcher();

    function handleClick(event: MouseEvent) {
        if (disabled) {
            event.preventDefault();
            return;
        }
        dispatch("click", event);
    }

    $: ariaDisabled = disabled ? true : undefined;
    $: computedRel =
        href && target === "_blank" ? (rel ?? "noopener noreferrer") : rel;

    // Map button size to approximate icon size (adjust as needed)
    $: iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 16;

    $: {
        if (hasIconOnly && !icon) {
            console.warn(
                "Button: `hasIconOnly` is true but no `icon` component was provided.",
            );
        }
        if (hasIconOnly && !iconDescription) {
            console.warn(
                "Button: `hasIconOnly` is true but no `iconDescription` was provided for accessibility.",
            );
        }
    }
</script>

{#if href}
    <a
        {href}
        {target}
        rel={computedRel}
        class="themed-btn themed-btn--{kind} themed-btn--{size} {className}"
        class:themed-btn--disabled={disabled}
        class:themed-btn--icon-only={hasIconOnly}
        class:has-icon={icon && !hasIconOnly}
        role="button"
        aria-disabled={ariaDisabled}
        on:click={handleClick}
        {...$$restProps}
        tabindex={disabled ? -1 : $$restProps.tabindex || 0}
    >
        {#if hasIconOnly && icon}
            <svelte:component
                this={icon}
                aria-hidden="true"
                size={iconSize}
                class="themed-btn__icon"
            />
            <span class="themed-visually-hidden">{iconDescription}</span>
        {:else}
            <slot />
            {#if icon}
                <svelte:component
                    this={icon}
                    aria-hidden="true"
                    size={iconSize}
                    class="themed-btn__icon"
                />
            {/if}
        {/if}
    </a>
{:else}
    <button
        {type}
        {disabled}
        class="themed-btn themed-btn--{kind} themed-btn--{size} {className}"
        class:themed-btn--disabled={disabled}
        class:themed-btn--icon-only={hasIconOnly}
        class:has-icon={icon && !hasIconOnly}
        aria-disabled={ariaDisabled}
        aria-label={hasIconOnly ? iconDescription : undefined}
        on:click={handleClick}
        {...$$restProps}
    >
        {#if hasIconOnly && icon}
            <svelte:component
                this={icon}
                aria-hidden="true"
                size={iconSize}
                class="themed-btn__icon"
            />
            {#if !iconDescription}
                <span class="themed-visually-hidden">Button</span>
            {/if}
        {:else}
            <slot />
            {#if icon}
                <svelte:component
                    this={icon}
                    aria-hidden="true"
                    size={iconSize}
                    class="themed-btn__icon"
                />
            {/if}
        {/if}
    </button>
{/if}

<style>
    /* --- Style Variables (Uses core.css) --- */
    /* Component-Specific Variables (can be overridden or based on theme) */
    :root {
        /* Using px for consistency with Carbon/similar systems, adjust if needed */
        --btn-font-size-sm: 0.875rem; /* 14px */
        --btn-font-size-md: 0.875rem; /* 14px (Carbon uses 14px for md too) */
        --btn-font-size-lg: 1rem; /* 16px */
        --btn-height-sm: 2rem; /* 32px */
        --btn-height-md: 2.5rem; /* 40px */
        --btn-height-lg: 3rem; /* 48px */
        --btn-padding-sm: 0.9375rem; /* 15px (~1rem - 1px border) */
        --btn-padding-md: 0.9375rem; /* 15px */
        --btn-padding-lg: 1.4375rem; /* 23px (~1.5rem - 1px border) */
        --btn-border-radius: 0px; /* Default to 0, adjust as needed */
        --btn-border-width: 1px;
        --btn-outline-width: 2px;
        --btn-outline-offset: 2px;
        --btn-icon-margin: 0.5rem; /* 8px */

        /* DANGER COLORS (Placeholder - Add these to your core.css themes!) */
        --danger-color: #da1e28;
        --danger-color-hover: #a2191f;
        --danger-color-active: #750e13;
        --danger-text-color: #ffffff;
    }

    /* --- Base Button Styles --- */
    .themed-btn {
        font-family: var(--font-sans, sans-serif); /* Use theme font */
        font-weight: 600; /* Common practice, adjust if needed */
        line-height: 1.375;
        text-decoration: none;
        cursor: pointer;
        border-radius: var(--btn-border-radius);
        border-style: solid;
        border-width: var(--btn-border-width);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        transition:
            background-color 70ms cubic-bezier(0, 0, 0.38, 0.9),
            box-shadow 70ms cubic-bezier(0, 0, 0.38, 0.9),
            border-color 70ms cubic-bezier(0, 0, 0.38, 0.9),
            color 70ms cubic-bezier(0, 0, 0.38, 0.9),
            outline 70ms cubic-bezier(0, 0, 0.38, 0.9);
        position: relative;
        outline: none; /* Use custom focus style */
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .themed-btn:focus-visible {
        /* Use focus-visible for keyboard users */
        outline: var(--btn-outline-width) solid var(--accent-primary, #0f62fe); /* Use theme accent for focus */
        outline-offset: var(--btn-outline-offset);
    }
    /* For High Contrast mode */
    .themed-btn:focus {
        outline-style: solid !important; /* Ensure outline visible */
    }

    /* --- Size Variants --- */
    .themed-btn--sm {
        min-height: var(--btn-height-sm);
        padding-left: var(--btn-padding-sm);
        padding-right: var(--btn-padding-sm);
        font-size: var(--btn-font-size-sm);
    }
    .themed-btn--md {
        min-height: var(--btn-height-md);
        padding-left: var(--btn-padding-md);
        padding-right: var(--btn-padding-md);
        font-size: var(--btn-font-size-md);
    }
    .themed-btn--lg {
        min-height: var(--btn-height-lg);
        padding-left: var(--btn-padding-lg);
        padding-right: var(--btn-padding-lg);
        font-size: var(--btn-font-size-lg);
    }

    /* --- Kind Variants --- */

    /* Primary */
    .themed-btn--primary {
        background-color: var(--accent-primary);
        border-color: var(--accent-primary);
        color: #ffffff; /* Assuming white text provides best contrast */
    }
    .themed-btn--primary:hover {
        background-color: var(--accent-primary-hover);
        border-color: var(--accent-primary-hover);
    }
    .themed-btn--primary:active {
        background-color: var(--accent-primary-active);
        border-color: var(--accent-primary-active);
    }

    /* Secondary */
    .themed-btn--secondary {
        background-color: var(--button-secondary-bg);
        border-color: var(--button-secondary-bg); /* Match background */
        color: var(--button-secondary-text);
    }
    .themed-btn--secondary:hover {
        background-color: var(--button-secondary-hover-bg);
        border-color: var(--button-secondary-hover-bg);
    }
    .themed-btn--secondary:active {
        /* Slightly darken hover state if no active variable exists */
        background-color: color-mix(
            in srgb,
            var(--button-secondary-hover-bg, #d1d1d1),
            #000 10%
        );
        border-color: color-mix(
            in srgb,
            var(--button-secondary-hover-bg, #d1d1d1),
            #000 10%
        );
    }

    /* Tertiary (Outline) */
    .themed-btn--tertiary {
        background-color: transparent;
        border-color: var(--accent-primary);
        color: var(--accent-primary);
    }
    .themed-btn--tertiary:hover {
        background-color: color-mix(
            in srgb,
            var(--accent-primary, #ff9351),
            transparent 90%
        );
        border-color: var(--accent-primary-hover);
        color: var(--accent-primary-hover);
    }
    .themed-btn--tertiary:active {
        background-color: color-mix(
            in srgb,
            var(--accent-primary, #ff9351),
            transparent 80%
        );
        border-color: var(--accent-primary-active);
        color: var(--accent-primary-active);
    }

    /* Danger (Using Placeholder Colors) */
    .themed-btn--danger {
        background-color: var(--danger-color);
        border-color: var(--danger-color);
        color: var(--danger-text-color);
    }
    .themed-btn--danger:hover {
        background-color: var(--danger-color-hover);
        border-color: var(--danger-color-hover);
    }
    .themed-btn--danger:active {
        background-color: var(--danger-color-active);
        border-color: var(--danger-color-active);
    }
    /* TODO: Add Danger Tertiary/Ghost variants if needed, potentially requiring more theme variables */

    /* Ghost (Text-like) */
    .themed-btn--ghost {
        background-color: transparent;
        border-color: transparent;
        color: var(--link-color);
    }
    .themed-btn--ghost:hover {
        background-color: var(
            --accent-bg-hover
        ); /* Use theme accent background */
        color: var(--link-hover-color);
    }
    .themed-btn--ghost:active {
        background-color: var(--accent-bg); /* Darker accent background */
        color: var(--link-hover-color); /* Keep hover color */
    }

    /* --- Disabled State --- */
    .themed-btn--disabled,
    .themed-btn[disabled] {
        cursor: not-allowed;
        background-color: var(--disabled-bg);
        border-color: transparent; /* Usually no border on disabled */
        color: var(--disabled-text);
        outline: none;
    }
    /* Ensure hover/active/focus states don't override disabled style */
    .themed-btn--disabled:hover,
    .themed-btn[disabled]:hover,
    .themed-btn--disabled:active,
    .themed-btn[disabled]:active,
    .themed-btn--disabled:focus,
    .themed-btn[disabled]:focus,
    .themed-btn--disabled:focus-visible,
    .themed-btn[disabled]:focus-visible {
        background-color: var(--disabled-bg);
        border-color: transparent;
        color: var(--disabled-text);
        outline: none;
    }

    /* Disabled - Tertiary/Ghost Specifics */
    .themed-btn--tertiary.themed-btn--disabled,
    .themed-btn--tertiary[disabled],
    .themed-btn--ghost.themed-btn--disabled,
    .themed-btn--ghost[disabled] {
        background-color: transparent; /* Keep transparent background */
        border-color: transparent;
        color: var(--disabled-text);
    }

    /* --- Icon Styles --- */
    :global(.themed-btn__icon) {
        /* Apply margin only when there's text content next to it */
        margin-left: var(--btn-icon-margin);
        fill: currentColor; /* Inherit color by default */
        display: inline-block; /* Ensure proper alignment */
        vertical-align: middle;
    }
    /* No margin needed if button only contains icon */
    .themed-btn--icon-only :global(.themed-btn__icon) {
        margin-left: 0;
    }

    /* Specific Icon Colors (where currentColor isn't sufficient) */
    .themed-btn--primary :global(.themed-btn__icon),
    .themed-btn--danger :global(.themed-btn__icon) {
        fill: #ffffff; /* Match text color */
    }
    /* Secondary, Tertiary, Ghost use currentColor which resolves correctly */

    /* Disabled Icon Color */
    .themed-btn--disabled :global(.themed-btn__icon),
    .themed-btn[disabled] :global(.themed-btn__icon) {
        fill: var(--disabled-text);
    }

    /* --- Icon Only Styles --- */
    .themed-btn--icon-only {
        padding: 0;
        width: var(--btn-height-sm); /* Square based on height */
    }
    .themed-btn--icon-only.themed-btn--md {
        width: var(--btn-height-md);
    }
    .themed-btn--icon-only.themed-btn--lg {
        width: var(--btn-height-lg);
    }

    /* --- Utility --- */
    .themed-visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap; /* Prevent line breaks */
    }
</style>
