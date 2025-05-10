<!-- TextArea.svelte -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // --- Props ---
    /** Provide a unique id for the textarea. A default will be generated if not provided. */
    export let id: string = `themed-textarea-${Math.random().toString(36).substring(2, 9)}`;

    /** Specify the name attribute for the textarea, used in form submissions. */
    export let name: string | undefined = undefined;

    /** The current value of the textarea. This prop is two-way bindable. */
    export let value: string = "";

    /** Placeholder text to display when the textarea is empty. */
    export let placeholder: string | undefined = undefined;

    /** Set to `true` to disable the textarea, preventing user interaction. */
    export let disabled: boolean = false;

    /** Set to `true` to make the textarea read-only. The user can select and copy text but not modify it. */
    export let readonly: boolean = false;

    /** Specifies the initial number of visible text lines for the textarea. */
    export let rows: number = 4;

    /** Specifies the maximum number of characters the user can enter. */
    export let maxlength: number | undefined = undefined;

    /** Set to `true` if the textarea must be filled out before submitting a form. */
    export let required: boolean = false;

    /** Set to `true` to indicate that the textarea's current value is invalid. */
    export let invalid: boolean = false;

    /** Text to display below the textarea when `invalid` is `true`. Crucial for accessibility. */
    export let invalidText: string | undefined = undefined;

    /** Optional helper text to display below the textarea for additional guidance. */
    export let helperText: string | undefined = undefined;

    /** The text content for the textarea's `<label>` element. Essential for accessibility. */
    export let labelText: string = "";

    /** Set to `true` to visually hide the label while keeping it accessible to screen readers. `labelText` is still required. */
    export let hideLabel: boolean = false;

    /** Set to `true` to display a character counter if `maxlength` is also defined. */
    export let enableCounter: boolean = false;

    /** Any additional CSS classes to apply to the root `div` of the component. */
    let className: string = "";
    export { className as class };

    /**
     * A Svelte binding that provides a reference to the underlying `HTMLTextAreaElement`.
     * @example <TextArea bind:textareaElement={myTextAreaEl} />
     */
    export let textareaElement: HTMLTextAreaElement | undefined = undefined;

    // --- Event Dispatcher ---
    const dispatch = createEventDispatcher<{
        input: { value: string; event: Event };
        change: { value: string; event: Event };
        focus: FocusEvent;
        blur: FocusEvent;
        keydown: KeyboardEvent;
        keyup: KeyboardEvent;
        keypress: KeyboardEvent;
    }>();

    // --- Internal State ---
    const helperTextId = `helper-${id}`;
    const invalidTextId = `invalid-${id}`;
    const counterId = `counter-${id}`;

    // --- Event Handlers ---
    // Svelte's bind:value handles updating the 'value' prop and dispatches 'input'
    // This handler is for explicit dispatch with event object if needed by consumer.
    function handleInput(
        event: Event & { currentTarget: HTMLTextAreaElement },
    ) {
        dispatch("input", { value: event.currentTarget.value, event });
    }

    function handleChange(
        event: Event & { currentTarget: HTMLTextAreaElement },
    ) {
        dispatch("change", { value: event.currentTarget.value, event });
    }

    function handleFocus(event: FocusEvent) {
        dispatch("focus", event);
    }

    function handleBlur(event: FocusEvent) {
        dispatch("blur", event);
    }

    function handleKeyDown(event: KeyboardEvent) {
        dispatch("keydown", event);
    }

    function handleKeyUp(event: KeyboardEvent) {
        dispatch("keyup", event);
    }

    function handleKeyPress(event: KeyboardEvent) {
        dispatch("keypress", event);
    }

    // --- Reactive Computations ---
    $: ariaInvalid = disabled ? undefined : invalid ? true : undefined;

    $: showHelperText = !invalid && helperText && !disabled;
    $: showErrorText = invalid && invalidText && !disabled;
    $: showActualCounter =
        enableCounter && maxlength !== undefined && !disabled;

    $: describedByIdsArray = [
        showHelperText ? helperTextId : undefined,
        showErrorText ? invalidTextId : undefined,
        // Counter is usually supplementary, but can be included if desired.
        // For this example, we'll keep helper/error text as primary describedby.
        // If counter provides critical info, add: showActualCounter ? counterId : undefined
    ];
    $: ariaDescribedBy =
        describedByIdsArray.filter(Boolean).join(" ") || undefined;

    $: charsCount = value?.length || 0;

    // --- Warnings for DX and a11y ---
    $: {
        if (typeof document !== "undefined") {
            // Run only in browser
            if (
                !labelText &&
                !hideLabel &&
                !$$restProps["aria-label"] &&
                !$$restProps["aria-labelledby"]
            ) {
                console.warn(
                    `TextArea (id: ${id}): \`labelText\` is highly recommended for accessibility. If the label is visually represented elsewhere, provide \`labelText\` and set \`hideLabel\` to true. Alternatively, provide 'aria-label' or 'aria-labelledby' via $$restProps.`,
                );
            } else if (!labelText && hideLabel) {
                console.warn(
                    `TextArea (id: ${id}): \`hideLabel\` is true, but no \`labelText\` was provided. A \`labelText\` is still required for screen reader accessibility when using this pattern.`,
                );
            }
            if (invalid && !invalidText && !disabled) {
                console.warn(
                    `TextArea (id: ${id}): \`invalid\` is true but no \`invalidText\` was provided. This message is important for users to understand the error.`,
                );
            }
            if (enableCounter && maxlength === undefined && !disabled) {
                console.warn(
                    `TextArea (id: ${id}): \`enableCounter\` is true but \`maxlength\` is not set. The counter will only show current characters, not the limit.`,
                );
            }
        }
    }
</script>

<div class="themed-form-item {className}">
    {#if labelText}
        <label
            for={id}
            class="themed-label"
            class:themed-visually-hidden={hideLabel}
        >
            {labelText}
            {#if required && !hideLabel && !disabled}
                <span
                    class="themed-label__required-indicator"
                    aria-hidden="true">*</span
                >
            {/if}
        </label>
    {/if}

    <div
        class="themed-textarea-wrapper"
        class:themed-textarea-wrapper--invalid={invalid && !disabled}
        class:themed-textarea-wrapper--disabled={disabled}
        class:themed-textarea-wrapper--readonly={readonly && !disabled}
    >
        <textarea
            bind:this={textareaElement}
            {id}
            {name}
            bind:value
            {placeholder}
            {disabled}
            {readonly}
            {rows}
            {maxlength}
            {required}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            class="themed-textarea"
            on:input={handleInput}
            on:change={handleChange}
            on:focus={handleFocus}
            on:blur={handleBlur}
            on:keydown={handleKeyDown}
            on:keyup={handleKeyUp}
            on:keypress={handleKeyPress}
            {...$$restProps}
        ></textarea>
    </div>

    {#if showActualCounter}
        <div class="themed-textarea__counter" id={counterId}>
            {charsCount}/{maxlength}
        </div>
    {/if}

    {#if showHelperText}
        <div class="themed-form__helper-text" id={helperTextId}>
            {helperText}
        </div>
    {/if}

    {#if showErrorText}
        <div class="themed-form__requirement" id={invalidTextId}>
            <!-- Consider adding an error icon here for visual feedback -->
            {invalidText}
        </div>
    {/if}
</div>

<style>
    /* --- Style Variables (Inspired by nlds/Carbon) --- */
    :root {
        /* Component-Specific Variables */
        --nlds-textarea-font-family: var(
            --nlds-font-sans,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial,
            "Noto Sans",
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji"
        );
        --nlds-textarea-font-size: var(
            --nlds-body-font-size-01,
            0.875rem
        ); /* 14px */
        --nlds-textarea-line-height: var(
            --nlds-line-height-body-01,
            1.42857
        ); /* ~20px for 14px font */
        --nlds-textarea-padding-vertical: 0.6875rem; /* 11px */
        --nlds-textarea-padding-horizontal: 0.9375rem; /* 15px */
        --nlds-textarea-padding: var(--nlds-textarea-padding-vertical)
            var(--nlds-textarea-padding-horizontal);

        --nlds-textarea-bg: var(--nlds-field-bg, #f4f4f4);
        --nlds-textarea-text-color: var(--nlds-text-primary, #161616);
        --nlds-textarea-placeholder-color: var(
            --nlds-text-placeholder,
            #a8a8a8
        );
        --nlds-textarea-border-width: 1px;
        --nlds-textarea-border-color: var(--nlds-border-subtle, #8d8d8d);
        --nlds-textarea-border-radius: 0px;
        --nlds-textarea-outline-width: 2px;
        --nlds-textarea-outline-color-focus: var(
            --nlds-focus,
            var(--nlds-accent-primary, #0f62fe)
        );
        --nlds-textarea-focus-shadow: 0 0 0 var(--nlds-textarea-outline-width)
            var(--nlds-textarea-outline-color-focus); /* Outer ring */
        /* Optional: Inner ring for contrast - 0 0 0 calc(var(--nlds-textarea-outline-width) + var(--nlds-textarea-border-width)) var(--nlds-field-bg-inverse, #ffffff) */

        /* Invalid State */
        --nlds-textarea-outline-color-invalid: var(
            --nlds-support-error,
            #da1e28
        ); /* Red */
        --nlds-textarea-invalid-focus-shadow: 0 0 0
            var(--nlds-textarea-outline-width)
            var(--nlds-textarea-outline-color-invalid);

        /* Disabled State */
        --nlds-textarea-disabled-bg: var(--nlds-disabled-bg-alt, #f4f4f4);
        --nlds-textarea-disabled-border-color: var(
            --nlds-border-disabled,
            #c6c6c6
        );
        --nlds-textarea-disabled-text-color: var(--nlds-text-disabled, #a8a8a8);

        /* Readonly State */
        --nlds-textarea-readonly-bg: var(
            --nlds-field-bg-readonly,
            var(--nlds-textarea-bg)
        );
        --nlds-textarea-readonly-border-color: var(
            --nlds-border-subtle-readonly,
            var(--nlds-textarea-border-color)
        );

        /* Label */
        --nlds-label-text-color: var(--nlds-text-secondary, #525252);
        --nlds-label-font-size: var(
            --nlds-label-font-size-01,
            0.75rem
        ); /* 12px */
        --nlds-label-margin-bottom: 0.5rem; /* 8px */
        --nlds-label-required-color: var(--nlds-support-error, #da1e28);

        /* Helper, Invalid Text, Counter */
        --nlds-supporting-text-color: var(--nlds-text-secondary, #525252);
        --nlds-supporting-text-font-size: var(
            --nlds-caption-font-size-01,
            0.75rem
        ); /* 12px */
        --nlds-supporting-text-margin-top: 0.375rem; /* 6px */
        --nlds-invalid-text-color: var(--nlds-support-error, #da1e28);
    }

    /* --- Base Form Item Wrapper --- */
    .themed-form-item {
        display: flex;
        flex-direction: column;
    }

    /* --- Label --- */
    .themed-label {
        font-family: var(--nlds-textarea-font-family);
        font-size: var(--nlds-label-font-size);
        font-weight: 600;
        color: var(--nlds-label-text-color);
        margin-bottom: var(--nlds-label-margin-bottom);
        line-height: 1.33333;
        user-select: none;
        display: block;
    }

    .themed-label__required-indicator {
        color: var(--nlds-label-required-color);
        margin-left: 0.125rem;
        font-weight: normal;
    }

    /* --- Textarea Wrapper (handles border, background, focus outline) --- */
    .themed-textarea-wrapper {
        position: relative;
        display: flex;
        background-color: var(--nlds-textarea-bg);
        border-radius: var(--nlds-textarea-border-radius);
        border: var(--nlds-textarea-border-width) solid
            var(--nlds-textarea-border-color);
        transition:
            border-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
            box-shadow 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }

    .themed-textarea-wrapper:focus-within {
        border-color: var(
            --nlds-textarea-outline-color-focus
        ); /* Change border color on focus */
        box-shadow: var(--nlds-textarea-focus-shadow);
    }

    .themed-textarea-wrapper--invalid {
        border-color: var(
            --nlds-textarea-outline-color-invalid
        ) !important; /* Override normal border */
    }
    .themed-textarea-wrapper--invalid:focus-within {
        border-color: var(
            --nlds-textarea-outline-color-invalid
        ) !important; /* Keep invalid color */
        box-shadow: var(--nlds-textarea-invalid-focus-shadow) !important;
    }

    /* --- Base Textarea Styles --- */
    .themed-textarea {
        font-family: var(--nlds-textarea-font-family);
        font-size: var(--nlds-textarea-font-size);
        line-height: var(--nlds-textarea-line-height);
        color: var(--nlds-textarea-text-color);
        background-color: transparent; /* Inherits from wrapper or is transparent */
        padding: var(--nlds-textarea-padding);
        border: none; /* Border is on wrapper */
        border-radius: 0; /* Inner element doesn't need radius if wrapper has it */
        width: 100%;
        box-sizing: border-box;
        resize: vertical;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        min-height: calc(
            (
                    var(--nlds-textarea-line-height) *
                        var(--nlds-textarea-font-size)
                ) *
                2 + (2 * var(--nlds-textarea-padding-vertical))
        ); /* Default min height for ~2 lines */
    }

    .themed-textarea::placeholder {
        color: var(--nlds-textarea-placeholder-color);
        opacity: 1;
    }

    /* Disabled State */
    .themed-textarea-wrapper--disabled {
        background-color: var(--nlds-textarea-disabled-bg);
        border-color: var(--nlds-textarea-disabled-border-color) !important;
        box-shadow: none !important;
    }
    .themed-textarea-wrapper--disabled .themed-textarea,
    .themed-textarea:disabled {
        /* Catch direct disabled attr too */
        color: var(--nlds-textarea-disabled-text-color);
        cursor: not-allowed;
        resize: none;
        background-color: transparent; /* Ensure it's transparent if wrapper has bg */
    }
    .themed-textarea:disabled::placeholder {
        color: var(--nlds-textarea-disabled-text-color);
    }
    :global(.themed-textarea-wrapper--disabled ~ .themed-textarea__counter), /* Target counter when disabled */
    :global(.themed-textarea-wrapper--disabled ~ .themed-form__helper-text),
    :global(.themed-textarea-wrapper--disabled ~ .themed-form__requirement) {
        color: var(--nlds-textarea-disabled-text-color);
    }

    /* Readonly State */
    .themed-textarea-wrapper--readonly {
        background-color: var(--nlds-textarea-readonly-bg);
        border-color: var(--nlds-textarea-readonly-border-color);
        /* Readonly usually doesn't change text color or cursor like disabled */
    }
    .themed-textarea-wrapper--readonly .themed-textarea,
    .themed-textarea:read-only {
        /* Catch direct readonly attr */
        cursor: default;
        resize: none;
        background-color: transparent;
    }
    /* Focus for readonly is handled by general :focus-within on wrapper */

    /* --- Helper, Invalid Text, Counter --- */
    .themed-form__helper-text,
    .themed-form__requirement,
    .themed-textarea__counter {
        font-family: var(--nlds-textarea-font-family);
        font-size: var(--nlds-supporting-text-font-size);
        line-height: 1.33333;
        margin-top: var(--nlds-supporting-text-margin-top);
        display: block;
    }

    .themed-form__helper-text {
        color: var(--nlds-supporting-text-color);
    }

    .themed-form__requirement {
        color: var(--nlds-invalid-text-color);
    }

    .themed-textarea__counter {
        color: var(
            --nlds-supporting-text-color
        ); /* Same as helper text by default */
        text-align: right;
    }

    /* --- Utility --- */
    .themed-visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
        white-space: nowrap;
    }
</style>
