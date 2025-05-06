<script>
    import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";

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

<div class="nlds-select-wrapper">
    <select
        class="nlds-select"
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
    <div class="nlds-select-arrow" aria-hidden="true">
        <ChevronDown />
    </div>
</div>

<style>
    .nlds-select-wrapper {
        position: relative;
        display: inline-block; /* Adjust as needed, 'block' for full width */
        width: auto; /* Or set a specific width */
    }

    .nlds-select {
        display: block;
        width: 100%;
        padding: 0.5rem 2rem 0.5rem 0.75rem; /* Space for text and arrow */
        font-size: 0.9rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        color: var(--nlds-input-text);
        background-color: var(--nlds-input-bg);
        background-clip: padding-box;
        /* border: 1px solid var(--nlds-input-border); */
        border: none;
        appearance: none; /* Remove default system appearance */
        box-sizing: border-box;
        cursor: pointer;
    }

    /* Style placeholder state */
    .nlds-select.has-placeholder {
        color: var(--nlds-text-secondary);
    }
    /* Ensure selected value isn't greyed out if it matches placeholder value after selection */
    .nlds-select:not(.has-placeholder) {
        color: var(--nlds-input-text);
    }

    .nlds-select:focus {
        /* border-color: var(--nlds-input-focus-border); */
        outline: 2px solid var(--nlds-input-focus-border);
        outline-offset: -2px;
        /* box-shadow: 0 0 0 0.2rem var(--nlds-input-focus-shadow); */
    }

    .nlds-select:disabled {
        background-color: var(--nlds-disabled-bg);
        color: var(--nlds-disabled-text); /* Added based on NLDS vars */
        opacity: 1; /* Usually managed by color/bg, but kept */
        cursor: not-allowed;
    }

    /* Custom Arrow */
    .nlds-select-arrow {
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        pointer-events: none; /* Allow clicks to pass through to the select */
        color: var(--nlds-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.15s ease-in-out;
    }

    /* You may need to adjust size based on the actual icon size */
    .nlds-select-arrow :global(svg) {
        width: 16px;
        height: 16px;
    }

    .nlds-select:disabled ~ .nlds-select-arrow {
        opacity: 0.6; /* We shall maybe use var(--nlds-disabled-text) or similar */
    }
</style>
