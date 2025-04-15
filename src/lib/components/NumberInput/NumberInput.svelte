<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    // Import icons (install carbon-icons-svelte if you haven't)
    import ErrorFilled from "~icons/carbon/error-filled";
    import WarningFilled from "~icons/carbon/warning-filled";

    // --- Props ---
    /** Input Label */
    export let label = "";
    /** Current numeric value (can be null if noValueAllowed) */
    export let value: number | null = 0;
    /** Optional helper text */
    export let helperText = "";
    /** Minimum allowed value */
    export let min: number | null = null;
    /** Maximum allowed value */
    export let max: number | null = null;
    /** Increment/decrement step */
    export let step = 1;
    /** Disable the input */
    export let disabled = false;
    /** Make the input read-only */
    export let readonly = false;
    /** Hide the label visually */
    export let hideLabel = false;
    /** Hide the increment/decrement steppers */
    export let hideSteppers = false;
    /** Input size */
    export let size: "sm" | "md" | "lg" = "md";
    /** Use light variant (for dark backgrounds) */
    export let light = false;
    /** Manually set invalid state */
    export let invalid = false;
    /** Text to display when invalid */
    export let invalidText = "";
    /** Manually set warning state */
    export let warn = false;
    /** Text to display when warning */
    export let warnText = "";
    /** Allow the input value to be null (empty) */
    export let noValueAllowed = false;
    /** Unique ID for the input */
    export let id = `ni-${Math.random().toString(36).substring(2, 9)}`;
    /** Additional classes for the wrapper */
    let className: string = "";
    export { className as class };

    const dispatch = createEventDispatcher<{
        change: { value: number | null };
    }>();

    let inputElement: HTMLInputElement;

    // --- State Calculation ---
    // Determine if value is outside bounds (only if value is not null)
    $: isOutOfBounds =
        value !== null &&
        ((min !== null && value < min) || (max !== null && value > max));
    // Determine overall invalid state (manual prop takes precedence)
    $: isInvalid = invalid || isOutOfBounds;
    // Determine overall warning state (invalid takes precedence over warning)
    $: isWarning = !isInvalid && warn;

    $: state = isInvalid ? "invalid" : isWarning ? "warning" : "default";
    $: stateText = isInvalid ? invalidText : isWarning ? warnText : "";
    $: ariaDescribedByIds = [
        helperText ? `${id}-helper-text` : null,
        stateText ? `${id}-state-text` : null,
    ]
        .filter(Boolean)
        .join(" "); // Create space-separated list for aria-describedby

    // --- Event Handlers ---
    function increment() {
        if (readonly || disabled) return;
        let currentValue = value ?? (min !== null ? min - step : 0 - step); // Start from 0 or min if null
        let newValue = currentValue + step;

        if (max !== null && newValue > max) return; // Prevent incrementing beyond max

        value = newValue;
        dispatch("change", { value }); // Notify of programmatic change
    }

    function decrement() {
        if (readonly || disabled) return;
        let currentValue = value ?? (max !== null ? max + step : 0 + step); // Start from 0 or max if null
        let newValue = currentValue - step;

        if (min !== null && newValue < min) return; // Prevent decrementing below min

        value = newValue;
        dispatch("change", { value }); // Notify of programmatic change
    }

    // Handle direct input and ensure constraints
    function handleInput(event: Event) {
        if (readonly) {
            // Restore previous value if readonly
            (event.target as HTMLInputElement).value =
                value === null ? "" : String(value);
            return;
        }

        let rawValue = (event.target as HTMLInputElement).value;

        if (rawValue === "" && noValueAllowed) {
            value = null;
            // NOTE: Native 'change' event will fire if needed
        } else if (rawValue === "") {
            // If empty not allowed, reset to min or 0 if min doesn't exist
            value = min ?? 0;
            (event.target as HTMLInputElement).value = String(value);
        } else {
            const numericValue = Number(rawValue);

            if (!isNaN(numericValue)) {
                // Clamp value immediately if outside bounds during typing
                if (min !== null && numericValue < min) {
                    value = min;
                    // Update the input visually if clamped
                    (event.target as HTMLInputElement).value = String(min);
                } else if (max !== null && numericValue > max) {
                    value = max;
                    // Update the input visually if clamped
                    (event.target as HTMLInputElement).value = String(max);
                } else {
                    value = numericValue;
                }
            }
            // If input was not numeric, potentially revert or handle differently?
            // For now, we just update bound `value` if numeric.
        }
        // Svelte handles the binding, native change/input events fire as usual
    }

    // Ensure initial value respects constraints
    onMount(() => {
        if (value !== null) {
            if (min !== null && value < min) {
                value = min;
            } else if (max !== null && value > max) {
                value = max;
            }
        }
    });
</script>

<div
    class="themed-ni-wrapper {className}"
    class:themed-ni-wrapper--light={light}
    class:themed-ni-wrapper--invalid={isInvalid}
    class:themed-ni-wrapper--warning={isWarning}
    class:themed-ni-wrapper--disabled={disabled}
    class:themed-ni-wrapper--readonly={readonly}
    class:themed-ni--sm={size === "sm"}
    class:themed-ni--md={size === "md"}
    class:themed-ni--lg={size === "lg"}
>
    {#if label}
        <label
            for={id}
            class="themed-ni-label"
            class:themed-visually-hidden={hideLabel}
        >
            {label}
        </label>
    {/if}

    <div class="themed-ni-control">
        <input
            type="number"
            {id}
            bind:this={inputElement}
            value={value === null ? "" : value}
            on:input={handleInput}
            {min}
            {max}
            {step}
            {disabled}
            {readonly}
            class="themed-ni-field"
            aria-invalid={isInvalid ? "true" : undefined}
            aria-describedby={ariaDescribedByIds || undefined}
        />
        {#if isInvalid}
            <ErrorFilled
                size={16}
                class="themed-ni-icon themed-ni-icon--invalid"
            />
        {:else if isWarning}
            <WarningFilled
                size={16}
                class="themed-ni-icon themed-ni-icon--warning"
            />
        {/if}

        {#if !hideSteppers && !readonly}
            <div class="themed-ni-steppers">
                <button
                    type="button"
                    class="themed-ni-stepper-btn themed-ni-stepper-btn--inc"
                    on:click={increment}
                    disabled={disabled ||
                        readonly ||
                        (max !== null && value !== null && value >= max)}
                    tabindex="-1"
                    aria-label="Increment number"
                >
                    <!-- Up Arrow SVG -->
                    <svg
                        width="8"
                        height="4"
                        viewBox="0 0 8 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M4 0L8 4H0L4 0Z" fill="currentColor" />
                    </svg>
                </button>
                <button
                    type="button"
                    class="themed-ni-stepper-btn themed-ni-stepper-btn--dec"
                    on:click={decrement}
                    disabled={disabled ||
                        readonly ||
                        (min !== null && value !== null && value <= min)}
                    tabindex="-1"
                    aria-label="Decrement number"
                >
                    <!-- Down Arrow SVG -->
                    <svg
                        width="8"
                        height="4"
                        viewBox="0 0 8 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M4 4L0 0L8 0L4 4Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
        {/if}
    </div>

    {#if helperText && !stateText}
        <div class="themed-ni-helper-text" id="{id}-helper-text">
            {helperText}
        </div>
    {/if}
    {#if stateText}
        <div
            class="themed-ni-helper-text"
            class:themed-ni-helper-text--invalid={isInvalid}
            class:themed-ni-helper-text--warning={isWarning}
            id="{id}-state-text"
        >
            {stateText}
        </div>
    {/if}
</div>

<style>
    /* --- Variable Defaults (Uses core.css) --- */
    :root {
        /* Using px for consistency, adjust if needed */
        --ni-height-sm: 2rem; /* 32px */
        --ni-height-md: 2.5rem; /* 40px */
        --ni-height-lg: 3rem; /* 48px */
        --ni-padding-horizontal: 1rem; /* 16px */
        --ni-padding-vertical: calc(
            0.375rem - 1px
        ); /* Approx center align text */
        --ni-font-size-sm: 0.75rem; /* 12px */
        --ni-font-size-md: 0.875rem; /* 14px */
        --ni-font-size-lg: 1rem; /* 16px */
        --ni-label-size: 0.75rem; /* 12px */
        --ni-helper-size: 0.75rem; /* 12px */
        --ni-icon-size: 1rem; /* 16px */
        --ni-stepper-width: 2.5rem; /* Width of the steppers area */
        --ni-outline-width: 2px;
        --ni-outline-offset: -2px; /* Offset inside */

        /* DANGER/WARN COLORS (Add these to your core.css themes!) */
        /* Use placeholders if not in core.css yet */
        --danger-color: #da1e28; /* Placeholder */
        --warning-color: #f1c21b; /* Placeholder */
    }

    /* --- Base Wrapper --- */
    .themed-ni-wrapper {
        display: flex;
        flex-direction: column;
        font-family: var(--font-sans, sans-serif);
    }

    /* --- Label --- */
    .themed-ni-label {
        font-size: var(--ni-label-size);
        font-weight: 400; /* Carbon uses regular weight */
        margin-bottom: 0.5rem; /* Spacing below label */
        color: var(--text-secondary, #525252); /* Use secondary text color */
        line-height: 1.33;
        cursor: default;
    }
    .themed-ni-wrapper--disabled .themed-ni-label {
        color: var(--disabled-text, #a8a8a8);
    }

    /* --- Control Container (Input + Steppers + Icons) --- */
    .themed-ni-control {
        position: relative;
        display: flex;
        min-width: 6rem; /* Minimum width to avoid squishing */
    }

    /* --- Input Field --- */
    .themed-ni-field {
        flex-grow: 1; /* Take available space */
        width: 100%; /* Ensure it fills container */
        height: var(--ni-height-md); /* Default height */
        font-size: var(--ni-font-size-md); /* Default font size */
        padding-top: var(--ni-padding-vertical);
        padding-bottom: var(--ni-padding-vertical);
        padding-left: var(--ni-padding-horizontal);
        /* Dynamic padding-right based on steppers/icons */
        padding-right: calc(
            var(--ni-padding-horizontal) + var(--ni-stepper-width)
        );
        border-width: 1px;
        border-style: solid;
        border-color: var(--input-border, #8d8d8d); /* Theme border */
        background-color: var(--input-bg, #ffffff); /* Theme background */
        color: var(--input-text, #161616); /* Theme text */
        appearance: textfield; /* Hide browser default number spinners */
        border-radius: 0; /* Carbon default */
        box-sizing: border-box;
        transition:
            border-color 70ms ease-in-out,
            outline 70ms ease-in-out;
    }
    /* Remove spinners cross-browser */
    .themed-ni-field::-webkit-outer-spin-button,
    .themed-ni-field::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .themed-ni-field[type="number"] {
        -moz-appearance: textfield;
    }

    /* Focus State */
    .themed-ni-field:focus:not([readonly]) {
        outline: var(--ni-outline-width) solid var(--accent-primary, #ff9351); /* Theme accent */
        outline-offset: var(--ni-outline-offset);
    }

    /* Simplified selector for when steppers are hidden */
    .themed-ni-wrapper:not(.themed-ni-wrapper--readonly) .themed-ni-field:not(.themed-ni-steppers + *) {
        padding-right: var(--ni-padding-horizontal);
    }

    /* Adjust padding when there is an icon */
    .themed-ni-wrapper--invalid .themed-ni-field,
    .themed-ni-wrapper--warning .themed-ni-field {
        padding-right: calc(
            var(--ni-padding-horizontal) + var(--ni-icon-size) + 0.5rem
        ); /* Space for icon */
    }
    /* Adjust padding when steppers AND icon are present */
    .themed-ni-wrapper--invalid:not([class*="hide-steppers"]) .themed-ni-field,
    .themed-ni-wrapper--warning:not([class*="hide-steppers"]) .themed-ni-field {
        padding-right: calc(
            var(--ni-padding-horizontal) + var(--ni-stepper-width) +
                var(--ni-icon-size) + 0.5rem
        );
    }
    /* Hide steppers if readonly */
    .themed-ni-wrapper--readonly .themed-ni-steppers {
        display: none;
    }
    .themed-ni-wrapper--readonly .themed-ni-field {
        padding-right: var(--ni-padding-horizontal);
    }

    /* --- Steppers --- */
    .themed-ni-steppers {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: var(--ni-stepper-width);
        border-left: 1px solid var(--input-border, #8d8d8d);
        overflow: hidden; /* Clip button corners if needed */
    }
    .themed-ni-stepper-btn {
        flex: 1 1 50%; /* Each takes half the height */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background-color: var(
            --field-01,
            #f4f4f4
        ); /* Use theme field background */
        border: none;
        border-bottom: 1px solid var(--input-border, #8d8d8d);
        cursor: pointer;
        color: var(--text-primary, #161616);
        transition: background-color 70ms ease-in-out;
    }
    .themed-ni-stepper-btn--dec {
        border-bottom: none; /* Decrement button has no bottom border */
    }
    .themed-ni-stepper-btn svg {
        fill: currentColor;
        width: 8px; /* Match SVG size */
        height: 4px;
    }
    .themed-ni-stepper-btn:hover:not(:disabled) {
        background-color: var(--field-hover-01, #e8e8e8);
    }
    .themed-ni-stepper-btn:focus-visible {
        outline: 1px solid var(--accent-primary);
        outline-offset: -1px;
        z-index: 1; /* Ensure focus visible */
    }
    .themed-ni-stepper-btn:disabled {
        background-color: var(--field-01, #f4f4f4); /* Keep base background */
        color: var(--disabled-text, #a8a8a8); /* Disabled text color */
        cursor: not-allowed;
    }

    /* --- State Icons --- */
    .themed-ni-icon {
        position: absolute;
        top: 50%;
        /* Position depends on whether steppers are shown */
        right: calc(var(--ni-padding-horizontal) / 2);
        transform: translateY(-50%);
        fill: var(--text-primary); /* Default fill */
        pointer-events: none; /* Don't interfere with input clicks */
        width: var(--ni-icon-size);
        height: var(--ni-icon-size);
    }

    .themed-ni-icon--invalid {
        fill: var(--danger-color, #da1e28);
    }
    .themed-ni-icon--warning {
        fill: var(--warning-color, #f1c21b);
    }

    /* --- Helper Text --- */
    .themed-ni-helper-text {
        margin-top: 0.25rem;
        font-size: var(--ni-helper-size);
        line-height: 1.33;
        color: var(--text-secondary, #525252); /* Default helper text */
    }
    .themed-ni-helper-text--invalid {
        color: var(--danger-color, #da1e28);
    }
    .themed-ni-helper-text--warning {
        color: var(--warning-color, #f1c21b);
    }
    .themed-ni-wrapper--disabled .themed-ni-helper-text {
        color: var(--disabled-text, #a8a8a8);
    }

    /* --- Invalid State Styling --- */
    .themed-ni-wrapper--invalid .themed-ni-field {
        border-color: var(--danger-color, #da1e28);
    }
    .themed-ni-wrapper--invalid .themed-ni-field:focus {
        outline-color: var(
            --danger-color,
            #da1e28
        ); /* Keep outline color consistent with error */
    }

    /* --- Warning State Styling --- */
    .themed-ni-wrapper--warning .themed-ni-field {
        border-color: var(--warning-color, #f1c21b);
        /* Optional: Carbon uses a thicker outline for warning focus */
        /* outline: 1px solid var(--warning-color, #f1c21b); */
    }
    .themed-ni-wrapper--warning .themed-ni-field:focus {
        outline-color: var(--warning-color, #f1c21b);
    }

    /* --- Disabled State Styling --- */
    .themed-ni-wrapper--disabled .themed-ni-field {
        border-color: var(
            --disabled-bg,
            #f4f4f4
        ); /* Carbon uses background color for border */
        background-color: var(--disabled-bg, #f4f4f4);
        color: var(--disabled-text, #a8a8a8);
        cursor: not-allowed;
        outline: none !important; /* No focus outline on disabled */
    }
    .themed-ni-wrapper--disabled .themed-ni-steppers {
        border-left-color: var(--disabled-bg, #f4f4f4);
    }
    .themed-ni-wrapper--disabled .themed-ni-stepper-btn {
        border-bottom-color: var(--disabled-bg, #f4f4f4);
    }

    /* --- Readonly State Styling --- */
    .themed-ni-wrapper--readonly .themed-ni-field {
        border-color: transparent;
        background-color: var(
            --layer-01,
            #f4f4f4
        ); /* Slightly different background */
        cursor: default;
        outline: none !important;
    }
    /* Hide steppers in readonly via JS/template, no extra CSS needed */

    /* --- Light Variant Styling --- */
    .themed-ni-wrapper--light .themed-ni-field {
        /* Invert colors for dark backgrounds */
        border-color: var(
            --input-bg,
            #ffffff
        ); /* Use light bg color as border */
        background-color: var(--layer-01, #f4f4f4); /* Use a gray background */
        color: var(--text-primary, #161616); /* Ensure text is readable */
    }
    .themed-ni-wrapper--light .themed-ni-steppers {
        border-left-color: var(--input-bg, #ffffff);
    }
    .themed-ni-wrapper--light .themed-ni-stepper-btn {
        background-color: var(
            --layer-accent-01,
            #e0e0e0
        ); /* Darker stepper bg */
        border-bottom-color: var(--input-bg, #ffffff);
        color: var(--text-primary);
    }
    .themed-ni-wrapper--light .themed-ni-stepper-btn:hover:not(:disabled) {
        background-color: var(--layer-accent-hover-01, #d1d1d1);
    }
    .themed-ni-wrapper--light .themed-ni-stepper-btn:disabled {
        background-color: var(--layer-accent-01, #e0e0e0);
        color: var(--disabled-text);
    }
    .themed-ni-wrapper--light .themed-ni-label,
    .themed-ni-wrapper--light .themed-ni-helper-text {
        color: var(--inverse-01, #f4f4f4); /* Light text for labels/helpers */
    }
    /* Adjust state colors for light variant if needed */
    .themed-ni-wrapper--light.themed-ni-wrapper--disabled .themed-ni-field {
        border-color: var(--disabled-text);
        background-color: var(--disabled-text);
        color: var(--bg-primary);
    }
    .themed-ni-wrapper--light.themed-ni-wrapper--disabled .themed-ni-label,
    .themed-ni-wrapper--light.themed-ni-wrapper--disabled
        .themed-ni-helper-text {
        color: var(--disabled-text);
    }

    /* --- Size Variants --- */
    .themed-ni--sm .themed-ni-field {
        height: var(--ni-height-sm);
        font-size: var(--ni-font-size-sm);
    }
    .themed-ni--lg .themed-ni-field {
        height: var(--ni-height-lg);
        font-size: var(--ni-font-size-lg);
    }

    /* Removed unused icon size adjustment selectors */

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
