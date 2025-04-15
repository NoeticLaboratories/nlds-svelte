<script>
    import ChevronDownIcon from "~icons/carbon/chevron-down";

    /**
     * The currently selected value. Bindable.
     * @type {string | number | undefined}
     */
    export let value = undefined;

    /**
     * An array of options to display.
     * Each option should be an object with 'value' and 'label' properties.
     * @type {Array<{value: string | number, label: string}>}
     */
    export let options = [];

    /**
     * Optional placeholder text (becomes the first, disabled option if provided).
     * @type {string | undefined}
     */
    export let placeholder = undefined;

    /**
     * Optional ID for the select element, useful for label association.
     * @type {string | undefined}
     */
    export let id = undefined;

    /**
     * Optional name attribute for the select element.
     * @type {string | undefined}
     */
    export let name = undefined;

    /**
     * Whether the select is disabled.
     * @type {boolean}
     */
    export let disabled = false;

    /**
     * Exposes any other attributes passed to the component (e.g., required, aria-label).
     */
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Forward the change event
    function handleChange(event) {
        // Note: bind:value handles the update automatically.
        // We dispatch the raw event or just the value if needed by consumers.
        dispatch("change", event.target.value);
    }

    // Determine if the placeholder should be initially selected
    $: initialValue = value === undefined || value === null || value === "";
</script>

<div class="minimal-select-wrapper">
    <select
        class="minimal-select"
        {id}
        {name}
        {disabled}
        bind:value
        on:change={handleChange}
        {...$$restProps}
        class:has-placeholder={placeholder && initialValue}
    >
        {#if placeholder}
            <option
                value=""
                disabled
                selected={initialValue}
                hidden={!initialValue && value !== ""}
            >
                {placeholder}
            </option>
        {/if}

        {#each options as option (option.value)}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
    <div class="minimal-select-arrow" aria-hidden="true">
        <ChevronDownIcon />
    </div>
</div>

<style>
    .minimal-select-wrapper {
        position: relative;
        display: inline-block; /* Adjust as needed, 'block' for full width */
        width: auto; /* Or set a specific width */
    }

    .minimal-select {
        display: block;
        width: 100%;
        padding: 0.5rem 2rem 0.5rem 0.75rem; /* Space for text and arrow */
        font-size: 0.9rem; /* Slightly smaller for topbar */
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        color: var(--input-text);
        background-color: var(--input-bg);
        background-clip: padding-box;
        /* border: 1px solid var(--input-border); */
        border: none;
        appearance: none; /* Remove default system appearance */
        box-sizing: border-box;
        cursor: pointer;
    }

    /* Style placeholder state */
    .minimal-select.has-placeholder {
        color: var(--text-secondary);
    }
    /* Ensure selected value isn't greyed out if it matches placeholder value after selection */
    .minimal-select:not(.has-placeholder) {
        color: var(--input-text);
    }

    .minimal-select:focus {
        border-color: var(--input-focus-border);
        outline: 2px solid var(--input-focus-border);
        outline-offset: -2px;
        /* box-shadow: 0 0 0 0.2rem var(--input-focus-shadow); */
    }

    .minimal-select:disabled {
        background-color: var(--disabled-bg);
        opacity: 1;
        cursor: not-allowed;
    }

    /* Custom Arrow */
    .minimal-select-arrow {
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        pointer-events: none; /* Allow clicks to pass through to the select */
        color: var(--text-secondary); /* Icon color */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.15s ease-in-out;
    }

    /* You may need to adjust size based on the actual icon size */
    .minimal-select-arrow :global(svg) {
        width: 16px;
        height: 16px;
    }

    .minimal-select:disabled ~ .minimal-select-arrow {
        opacity: 0.6;
    }
</style>
