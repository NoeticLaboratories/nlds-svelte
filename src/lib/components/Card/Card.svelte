<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";

    /** Optional: Provide an href to render the card as an anchor link */
    export let href: string | undefined = undefined;

    /** For anchor links, specify the target attribute */
    export let target: string | undefined = undefined;

    /** For anchor links, specify the rel attribute */
    export let rel: string | undefined = undefined;

    /**
     * If true and the card is not a link (`href` is not set),
     * the card will be interactive (focusable, emits click event on interaction).
     */
    export let clickable: boolean = false;

    /**
     * Accessible label for the card. Highly recommended if the card is interactive
     * and its visual content alone doesn't clearly describe its purpose or action.
     * e.g., "View details for annual report".
     */
    export let ariaLabel: string | undefined = undefined;

    /** Any additional classes to apply to the card's root element */
    let className: string = "";
    export { className as class };

    // Define props that can be passed via $$restProps for type checking and intellisense.
    // This interface combines attributes for both <div> and <a> elements.
    interface $$Props
        extends HTMLAttributes<HTMLDivElement>,
            HTMLAnchorAttributes {
        // If you have custom props passed via $$restProps, define them here.
    }

    const dispatch = createEventDispatcher<{
        click: MouseEvent | KeyboardEvent;
    }>();

    function handleInteraction(event: MouseEvent | KeyboardEvent) {
        // Dispatch a 'click' event for Svelte listeners when the card is interacted with.
        // This applies to both <a> links and clickable <div> cards.
        if (isInteractive) {
            dispatch("click", event);
        }
    }

    function handleCardKeydown(event: KeyboardEvent) {
        // For non-anchor (<div>) interactive cards, trigger interaction on Enter or Space key.
        if (clickable && !href) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Prevent default browser action (e.g., space scrolling).
                handleInteraction(event);
            }
        }
    }

    $: isInteractive = clickable || !!href;
    $: computedRel =
        href && target === "_blank" ? (rel ?? "noopener noreferrer") : rel;
    $: divTabIndex = clickable && !href ? 0 : undefined; // Make clickable <div> focusable.

    // Determine the role:
    // - If `role` is passed via $$restProps, use that.
    // - Else, for an <a> tag, its implicit role is 'link' (so, undefined here to not override).
    // - Else (for a <div>), default to 'region' (a landmark for a significant section).
    $: computedRole = $$restProps.role || (href ? undefined : "region");
</script>

{#if href}
    <a
        {href}
        {target}
        rel={computedRel}
        class="themed-card {className}"
        class:themed-card--interactive={isInteractive}
        role={computedRole}
        aria-label={ariaLabel}
        on:click={handleInteraction}
        {...$$restProps}
    >
        <slot />
    </a>
{:else}
    <div
        class="themed-card {className}"
        class:themed-card--interactive={isInteractive}
        role={computedRole}
        aria-label={ariaLabel}
        tabindex={divTabIndex}
        on:click={handleInteraction}
        on:keydown={handleCardKeydown}
        {...$$restProps}
    >
        <slot />
    </div>
{/if}

<style>
    /* --- Style Variables (Assumes nlds core.css provides these or similar) --- */
    :root {
        /* Card specific variables, prefixed with nlds- */
        --nlds-card-padding: var(--nlds-spacing-05, 1rem); /* Default: 16px */
        --nlds-card-bg: var(
            --nlds-layer-01,
            var(--nlds-ui-background, #ffffff)
        ); /* Carbon often uses layers for background */

        /* Carbon default tiles often have no border or a very subtle one */
        --nlds-card-border-color: var(--nlds-border-subtle-00, transparent);
        --nlds-card-border-width: var(
            --nlds-border-width-sm,
            1px
        ); /* Assuming a theme variable for thin borders */
        --nlds-card-border-radius: var(
            --nlds-border-radius,
            0px
        ); /* Default 0px, consistent with Button example */

        /* Shadows - Carbon uses distinct shadow levels (e.g., $shadow-sm, $shadow-md) */
        /* Provide sensible fallbacks if specific nlds shadow variables aren't defined */
        --nlds-card-box-shadow: var(
            --nlds-shadow-sm,
            0 1px 2px rgba(0, 0, 0, 0.05)
        ); /* Subtle base shadow */
        --nlds-card-box-shadow-hover: var(
            --nlds-shadow-md,
            0 2px 6px rgba(0, 0, 0, 0.1)
        ); /* More pronounced on hover/focus */

        --nlds-card-text-color: var(
            --nlds-text-primary,
            #161616
        ); /* Default text color inside card */

        /* Focus styles, aiming for consistency with the provided Button component */
        --nlds-card-focus-outline-color: var(
            --nlds-focus,
            var(--nlds-accent-primary, #ff9351)
        );
        --nlds-card-outline-width: 2px;
        --nlds-card-outline-offset: 2px; /* Consistent with Button component */

        /* Transitions for hover/focus effects */
        --nlds-card-transition-duration: var(
            --nlds-duration-fast-01,
            110ms
        ); /* Carbon often uses specific duration tokens */
        --nlds-card-transition-timing-function: var(
            --nlds-easing-productive-enter,
            cubic-bezier(0, 0, 0.38, 0.9)
        ); /* Carbon productive easing */
    }

    .themed-card {
        font-family: var(--nlds-font-sans, sans-serif);
        background-color: var(--nlds-card-bg);
        border: var(--nlds-card-border-width) solid
            var(--nlds-card-border-color);
        border-radius: var(--nlds-card-border-radius);
        padding: var(--nlds-card-padding);
        box-shadow: var(--nlds-card-box-shadow);
        color: var(--nlds-card-text-color);
        display: block; /* Cards are typically block-level elements */
        text-decoration: none; /* Removes underline from anchor link version */
        position: relative; /* For potential absolutely positioned children or pseudo-elements */
        outline: none; /* Reset user-agent default outline, custom focus style is applied below */
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        transition:
            box-shadow var(--nlds-card-transition-duration)
                var(--nlds-card-transition-timing-function),
            border-color var(--nlds-card-transition-duration)
                var(--nlds-card-transition-timing-function),
            outline var(--nlds-card-transition-duration)
                var(--nlds-card-transition-timing-function);
    }

    .themed-card--interactive {
        cursor: pointer;
    }

    .themed-card--interactive:hover {
        box-shadow: var(--nlds-card-box-shadow-hover);
        /* Optional: Carbon clickable tiles might also get a border on hover if they don't have one by default.
           If your design requires it, uncomment and adjust:
           border-color: var(--nlds-border-interactive, var(--nlds-accent-primary));
        */
    }

    /* Focus state for interactive cards (both div and a elements) */
    .themed-card--interactive:focus-visible {
        outline: var(--nlds-card-outline-width) solid
            var(--nlds-card-focus-outline-color);
        outline-offset: var(--nlds-card-outline-offset);
        /* Optionally, maintain hover shadow on focus for visual consistency, or use a dedicated focus shadow */
        box-shadow: var(--nlds-card-box-shadow-hover);
    }

    /*
      The Button component included a style to force outline visibility on :focus.
      This can be helpful for consistency across browsers or if :focus-visible is not fully supported/desired.
      Including it here for consistency with the Button's pattern.
    */
    .themed-card--interactive:focus {
        outline-style: solid !important; /* Ensures outline is applied, see note in Button */
    }

    /*
      Image Handling: Ensure direct child images respect the card's border-radius.
      These rules apply if the card has a border-radius > 0.
      The calculation `calc(var(--nlds-card-border-radius) - var(--nlds-card-border-width))`
      adjusts the image's radius to fit neatly inside the card's border.
    */
    .themed-card > :global(img:first-child:last-child), /* An image that is the sole child */
    .themed-card > :global(figure:first-child:last-child img) {
        border-radius: calc(
            var(--nlds-card-border-radius) - var(--nlds-card-border-width)
        );
    }

    .themed-card > :global(img:first-child:not(:last-child)), /* Image at the start of multiple children */
    .themed-card > :global(figure:first-child:not(:last-child) img) {
        border-top-left-radius: calc(
            var(--nlds-card-border-radius) - var(--nlds-card-border-width)
        );
        border-top-right-radius: calc(
            var(--nlds-card-border-radius) - var(--nlds-card-border-width)
        );
    }

    .themed-card > :global(img:last-child:not(:first-child)), /* Image at the end of multiple children */
    .themed-card > :global(figure:last-child:not(:first-child) img) {
        border-bottom-left-radius: calc(
            var(--nlds-card-border-radius) - var(--nlds-card-border-width)
        );
        border-bottom-right-radius: calc(
            var(--nlds-card-border-radius) - var(--nlds-card-border-width)
        );
    }
</style>
