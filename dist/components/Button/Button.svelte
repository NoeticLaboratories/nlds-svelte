<script lang="ts">
    import type { Component } from "svelte";
    import type { CarbonIconProps } from "carbon-icons-svelte";
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
    export let icon: Component<CarbonIconProps> | undefined = undefined;

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
    /* --- Style Variables (Uses nlds core.css) --- */
    /* Component-Specific Variables (can be overridden or based on theme) */
    :root {
        /* Prefixed component vars with nlds- */
        --nlds-btn-font-size-sm: 0.875rem; /* 14px */
        --nlds-btn-font-size-md: 0.875rem; /* 14px */
        --nlds-btn-font-size-lg: 1rem; /* 16px */
        --nlds-btn-height-sm: 2rem; /* 32px */
        --nlds-btn-height-md: 2.5rem; /* 40px */
        --nlds-btn-height-lg: 3rem; /* 48px */
        --nlds-btn-padding-sm: calc(
            (var(--nlds-btn-height-sm) - var(--nlds-btn-font-size-sm) * 1.375) /
                2 - var(--nlds-btn-border-width)
        ); /* Dynamic padding based on height/line-height */
        --nlds-btn-padding-md: calc(
            (var(--nlds-btn-height-md) - var(--nlds-btn-font-size-md) * 1.375) /
                2 - var(--nlds-btn-border-width)
        );
        --nlds-btn-padding-lg: calc(
            (var(--nlds-btn-height-lg) - var(--nlds-btn-font-size-lg) * 1.375) /
                2 - var(--nlds-btn-border-width)
        );
        --nlds-btn-border-radius: 0px; /* Default to 0, adjust as needed */
        --nlds-btn-border-width: 1px;
        --nlds-btn-outline-width: 2px;
        --nlds-btn-outline-offset: 2px;
        --nlds-btn-icon-margin: 0.5rem; /* 8px */

        /* DANGER COLORS (Placeholder - Need definition in core.css!) */
        /* Prefixed placeholder vars with nlds- */
        --nlds-danger-color: #da1e28;
        --nlds-danger-color-hover: #a2191f;
        --nlds-danger-color-active: #750e13;
        --nlds-danger-text-color: #ffffff; /* Consider --nlds-text-on-danger var */
    }

    /* --- Base Button Styles --- */
    .themed-btn {
        font-family: var(--nlds-font-sans, sans-serif);
        font-weight: 600;
        line-height: 1.375;
        text-decoration: none;
        cursor: pointer;
        border-radius: var(--nlds-btn-border-radius);
        border-style: solid;
        border-width: var(--nlds-btn-border-width);
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
        outline: none;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .themed-btn:focus-visible {
        outline: var(--nlds-btn-outline-width) solid
            var(--nlds-accent-primary, #ff9351);
        outline-offset: var(--nlds-btn-outline-offset);
    }
    .themed-btn:focus {
        outline-style: solid !important;
    }

    /* --- Size Variants --- */
    .themed-btn--sm {
        min-height: var(--nlds-btn-height-sm);
        padding-left: var(--nlds-btn-padding-sm);
        padding-right: var(--nlds-btn-padding-sm);
        font-size: var(--nlds-btn-font-size-sm);
    }
    .themed-btn--md {
        min-height: var(--nlds-btn-height-md);
        padding-left: var(--nlds-btn-padding-md);
        padding-right: var(--nlds-btn-padding-md);
        font-size: var(--nlds-btn-font-size-md);
    }
    .themed-btn--lg {
        min-height: var(--nlds-btn-height-lg);
        padding-left: var(--nlds-btn-padding-lg);
        padding-right: var(--nlds-btn-padding-lg);
        font-size: var(--nlds-btn-font-size-lg);
    }

    /* --- Kind Variants --- */

    /* Primary */
    .themed-btn--primary {
        background-color: var(--nlds-accent-primary);
        border-color: var(--nlds-accent-primary);
        color: #ffffff; /* Needs --nlds-text-on-accent or similar */
    }
    .themed-btn--primary:hover {
        background-color: var(--nlds-accent-primary-hover);
        border-color: var(--nlds-accent-primary-hover);
    }
    .themed-btn--primary:active {
        background-color: var(--nlds-accent-primary-active);
        border-color: var(--nlds-accent-primary-active);
    }

    /* Secondary */
    .themed-btn--secondary {
        background-color: var(--nlds-button-secondary-bg);
        border-color: var(--nlds-button-secondary-bg);
        color: var(--nlds-button-secondary-text);
    }
    .themed-btn--secondary:hover {
        background-color: var(--nlds-button-secondary-hover-bg);
        border-color: var(--nlds-button-secondary-hover-bg);
    }
    .themed-btn--secondary:active {
        /* Use explicit active var if available, otherwise darken hover */
        background-color: color-mix(
            in srgb,
            var(--nlds-button-secondary-hover-bg, #d1d1d1),
            #000 10%
        );
        border-color: color-mix(
            in srgb,
            var(--nlds-button-secondary-hover-bg, #d1d1d1),
            #000 10%
        );
    }

    /* Tertiary (Outline) */
    .themed-btn--tertiary {
        background-color: transparent;
        border-color: var(--nlds-accent-primary);
        color: var(--nlds-accent-primary);
    }
    .themed-btn--tertiary:hover {
        background-color: color-mix(
            in srgb,
            var(--nlds-accent-primary, #ff9351),
            transparent 90%
        );
        border-color: var(--nlds-accent-primary-hover);
        color: var(--nlds-accent-primary-hover);
    }
    .themed-btn--tertiary:active {
        background-color: color-mix(
            in srgb,
            var(--nlds-accent-primary, #ff9351),
            transparent 80%
        );
        border-color: var(--nlds-accent-primary-active);
        color: var(--nlds-accent-primary-active);
    }

    /* Danger (Using Placeholder Colors) */
    .themed-btn--danger {
        background-color: var(--nlds-danger-color);
        border-color: var(--nlds-danger-color);
        color: var(--nlds-danger-text-color);
    }
    .themed-btn--danger:hover {
        background-color: var(--nlds-danger-color-hover);
        border-color: var(--nlds-danger-color-hover);
    }
    .themed-btn--danger:active {
        background-color: var(--nlds-danger-color-active);
        border-color: var(--nlds-danger-color-active);
    }

    /* Ghost (Text-like) */
    .themed-btn--ghost {
        background-color: transparent;
        border-color: transparent;
        color: var(--nlds-link-color);
    }
    .themed-btn--ghost:hover {
        background-color: var(--nlds-accent-bg-hover);
        color: var(--nlds-link-hover-color);
    }
    .themed-btn--ghost:active {
        background-color: var(--nlds-accent-bg);
        color: var(--nlds-link-hover-color);
    }

    /* --- Disabled State --- */
    .themed-btn--disabled,
    .themed-btn[disabled] {
        cursor: not-allowed;
        background-color: var(--nlds-disabled-bg);
        border-color: transparent;
        color: var(--nlds-disabled-text);
        outline: none;
    }
    .themed-btn--disabled:hover,
    .themed-btn[disabled]:hover,
    .themed-btn--disabled:active,
    .themed-btn[disabled]:active,
    .themed-btn--disabled:focus,
    .themed-btn[disabled]:focus,
    .themed-btn--disabled:focus-visible,
    .themed-btn[disabled]:focus-visible {
        background-color: var(--nlds-disabled-bg);
        border-color: transparent;
        color: var(--nlds-disabled-text);
        outline: none;
    }

    /* Disabled - Tertiary/Ghost Specifics */
    .themed-btn--tertiary.themed-btn--disabled,
    .themed-btn--tertiary[disabled],
    .themed-btn--ghost.themed-btn--disabled,
    .themed-btn--ghost[disabled] {
        background-color: transparent;
        border-color: transparent;
        color: var(--nlds-disabled-text);
    }

    /* --- Icon Styles --- */
    :global(.themed-btn__icon) {
        margin-left: var(--nlds-btn-icon-margin);
        fill: currentColor;
        display: inline-block;
        vertical-align: middle;
    }
    .themed-btn--icon-only :global(.themed-btn__icon) {
        margin-left: 0;
    }

    /* Specific Icon Colors */
    /* Needs --nlds-text-on-accent or similar for primary */
    .themed-btn--primary :global(.themed-btn__icon),
    /* Needs --nlds-text-on-danger or similar for danger */
    .themed-btn--danger :global(.themed-btn__icon) {
        fill: #ffffff;
    }

    /* Disabled Icon Color */
    .themed-btn--disabled :global(.themed-btn__icon),
    .themed-btn[disabled] :global(.themed-btn__icon) {
        fill: var(--nlds-disabled-text);
    }

    /* --- Icon Only Styles --- */
    .themed-btn--icon-only {
        padding: 0;
        width: var(--nlds-btn-height-sm);
    }
    .themed-btn--icon-only.themed-btn--md {
        width: var(--nlds-btn-height-md);
    }
    .themed-btn--icon-only.themed-btn--lg {
        width: var(--nlds-btn-height-lg);
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
