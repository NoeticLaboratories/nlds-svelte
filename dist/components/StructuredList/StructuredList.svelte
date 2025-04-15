<script lang="ts">
    import { setContext, createEventDispatcher } from "svelte";
    import type { Writable } from "svelte/store";

    /** Enable row selection */
    export let selectable: boolean = false;

    /** Type of selection if `selectable` is true */
    export let selectionType: "single" | "multi" | "none" = "none";
    if (selectable && selectionType === "none") {
        selectionType = "single"; // Default to single if selectable is true but type isn't set
    } else if (!selectable) {
        selectionType = "none"; // Ensure none if not selectable
    }

    /** Bindable property holding the value(s) of selected row(s). String for single, string[] for multi. */
    export let value: string | string[] | null =
        selectionType === "multi" ? [] : null;

    /** Add borders between rows */
    export let border: boolean = false;

    /** Use alternating row colors */
    export let zebra: boolean = false;

    /** Reduce vertical padding for a denser layout */
    export let condensed: boolean = false;

    /** Accessible label for the list */
    export let ariaLabel: string = "Structured list";

    /** Any additional classes for the wrapper */
    let className: string = "";
    export { className as class };

    const dispatch = createEventDispatcher<{
        change: { value: typeof value };
    }>();

    // --- Selection Logic ---
    // Unique ID for this list instance (for radio button grouping)
    const listId = `sl-${Math.random().toString(36).substring(2, 9)}`;

    function handleSelect(rowValue: string) {
        if (!selectable || selectionType === "none") return;

        let changed = false;
        if (selectionType === "single") {
            if (value !== rowValue) {
                value = rowValue;
                changed = true;
            }
            // Optional: Allow deselecting single select by clicking again
            // else {
            //  value = null;
            //  changed = true;
            // }
        } else {
            // Multi-select
            let currentSelection = Array.isArray(value) ? [...value] : [];
            const index = currentSelection.indexOf(rowValue);
            if (index > -1) {
                currentSelection.splice(index, 1); // Deselect
            } else {
                currentSelection.push(rowValue); // Select
            }
            // Avoid unnecessary updates if the array content is the same
            if (JSON.stringify(value) !== JSON.stringify(currentSelection)) {
                value = currentSelection;
                changed = true;
            }
        }

        if (changed) {
            // console.log('New selection:', value);
            dispatch("change", { value });
        }
    }

    // Provide context to child rows
    setContext("structured-list", {
        listId,
        selectable,
        selectionType,
        selectedValue: () => value, // Pass as function to ensure reactivity
        handleSelect,
    });
</script>

<div
    class="sl-wrapper {className}"
    class:sl--border={border}
    class:sl--condensed={condensed}
    class:sl--zebra={zebra}
    class:sl--selectable={selectable}
>
    {#if $$slots.header}
        <div class="sl-header" role="row">
            <!-- Optional: Add invisible checkbox/radio cell if selectable for alignment -->
            {#if selectable && selectionType !== "none"}
                <div
                    class="sl-header-cell sl-header-cell--input"
                    aria-hidden="true"
                ></div>
            {/if}
            <slot name="header"></slot>
        </div>
    {/if}

    <div
        class="sl-body"
        role={selectable ? "listbox" : "list"}
        aria-label={ariaLabel}
        aria-multiselectable={selectable && selectionType === "multi"
            ? true
            : undefined}
    >
        <slot></slot>
        <!-- StructuredListRow components go here -->
    </div>
</div>

<style>
    /* --- Variable Defaults (Uses core.css) --- */
    .sl-wrapper {
        --sl-background: var(--bg-primary, #fff);
        --sl-background-zebra: var(--layer-01, #f4f4f4);
        --sl-background-selected: var(--accent-bg, #e5e5e5);
        --sl-background-selected-hover: var(--accent-bg-hover, #d1d1d1);
        --sl-border-color: var(--border-color, #e0e0e0);
        --sl-text-primary: var(--text-primary, #161616);
        --sl-text-secondary: var(--text-secondary, #525252);
        --sl-text-header: var(
            --text-secondary,
            #525252
        ); /* Headers often less prominent */
        --sl-text-disabled: var(--disabled-text, #a8a8a8);
        --sl-focus-outline: var(
            --accent-primary,
            #ff9351
        ); /* Use theme focus */
        --sl-padding-vertical: 1rem; /* 16px */
        --sl-padding-horizontal: 1rem; /* 16px */
        --sl-padding-vertical-condensed: 0.5rem; /* 8px */
        --sl-input-size: 1.5rem; /* Size of the radio/checkbox area */
        --sl-border-width: 1px;
    }

    .sl-wrapper {
        display: flex;
        flex-direction: column;
        background-color: var(--sl-background);
        color: var(--sl-text-primary);
        font-family: var(--font-sans, sans-serif);
        font-size: 0.875rem; /* 14px */
        line-height: 1.4;
        border: var(--sl-border-width) solid transparent; /* Base border for layout consistency */
        border-radius: 0; /* Or theme variable */
    }

    .sl-wrapper.sl--border {
        border-color: var(--sl-border-color);
    }

    .sl-header,
    :global(.sl-row) {
        /* Target rows globally as they are in slots */
        display: flex;
        align-items: stretch; /* Stretch cells vertically */
        border-bottom: var(--sl-border-width) solid transparent;
        width: 100%;
    }

    .sl-wrapper.sl--border .sl-header,
    .sl-wrapper.sl--border :global(.sl-row:not(:last-child)) {
        border-bottom-color: var(--sl-border-color);
    }

    .sl-header {
        color: var(--sl-text-header);
        font-weight: 600; /* Bold headers */
    }

    /* Zebra striping */
    .sl-wrapper.sl--zebra :global(.sl-row:nth-child(odd)) {
        /* Note: nth-child might be complex with headers/conditional rows.
           Consider JS-based striping if structure is very dynamic.
           Assuming direct children for simplicity here. */
        background-color: var(--sl-background-zebra);
    }
    /* Ensure selected rows stand out */
    .sl-wrapper.sl--zebra :global(.sl-row.sl-row--selected) {
        background-color: var(--sl-background-selected);
    }

    /* Condensed Padding */
    .sl-wrapper.sl--condensed :global(.sl-header-cell),
    .sl-wrapper.sl--condensed :global(.sl-cell),
    .sl-wrapper.sl--condensed :global(.sl-row__input-cell),
    .sl-wrapper.sl--condensed :global(.sl-row__content-cell) {
        padding-top: var(--sl-padding-vertical-condensed);
        padding-bottom: var(--sl-padding-vertical-condensed);
    }

    /* Selection Styling */
    :global(.sl-row.sl-row--selected) {
        background-color: var(--sl-background-selected);
    }
    .sl-wrapper.sl--selectable
        :global(.sl-row--selectable:not(.sl-row--disabled):hover) {
        background-color: var(--sl-background-selected-hover);
        cursor: pointer;
    }

    /* Focus Indicator for selectable rows */
    :global(.sl-row--selectable:focus-visible) {
        outline: 2px solid var(--sl-focus-outline);
        outline-offset: -2px;
        position: relative; /* Ensure outline is drawn correctly */
        z-index: 1;
    }

    /* Header Input cell alignment placeholder */
    .sl-header-cell--input {
        /* Fixed width to align with row inputs */
        flex: 0 0 calc(var(--sl-input-size) + var(--sl-padding-horizontal));
        padding-left: var(--sl-padding-horizontal);
        padding-right: 0;
    }
</style>
