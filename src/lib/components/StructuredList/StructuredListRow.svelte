<script lang="ts">
    import { getContext, onDestroy } from "svelte";
    import type { Writable } from "svelte/store";

    /** Unique value identifying this row (used for selection state) */
    export let value: string;

    /** Disable selection and interaction for this row */
    export let disabled: boolean = false;

    /** Additional classes for the row element */
    let className: string = "";
    export { className as class };

    // Consume context from StructuredList
    type ListContext = {
        listId: string;
        selectable: boolean;
        selectionType: "single" | "multi" | "none";
        selectedValue: () => string | string[] | null; // Use function for reactivity
        handleSelect: (rowValue: string) => void;
    };
    const context = getContext<ListContext>("structured-list");
    if (!context) {
        throw new Error(
            "StructuredListRow must be used within a StructuredList",
        );
    }
    const { listId, selectable, selectionType, selectedValue, handleSelect } =
        context;

    // Determine if this row is currently selected
    $: isSelected =
        selectable &&
        !disabled &&
        (selectionType === "single"
            ? selectedValue() === value
            : selectionType === "multi"
              ? Array.isArray(selectedValue()) &&
                selectedValue().includes(value)
              : false);

    function onClick() {
        if (selectable && !disabled) {
            handleSelect(value);
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (
            selectable &&
            !disabled &&
            (event.key === "Enter" || event.key === " ")
        ) {
            event.preventDefault(); // Prevent page scroll on Space
            handleSelect(value);
        }
    }

    // Generate unique ID for the input element for label association
    const inputId = `sl-input-${listId}-${value}`;
</script>

<!-- Using div for flexibility, role added by parent -->
<div
    class="sl-row {className}"
    class:sl-row--selectable={selectable && !disabled}
    class:sl-row--selected={isSelected}
    class:sl-row--disabled={disabled}
    role="option"
    aria-selected={selectable ? isSelected : undefined}
    aria-disabled={disabled ? true : undefined}
    tabindex={selectable && !disabled ? 0 : undefined}
    on:click={onClick}
    on:keydown={handleKeydown}
>
    {#if selectable && selectionType !== "none"}
        <div class="sl-row__input-cell">
            <input
                type={selectionType === "single" ? "radio" : "checkbox"}
                id={inputId}
                name="sl-group-{listId}"
                {value}
                checked={isSelected}
                {disabled}
                tabindex="-1"
            />
            <!-- Label is visually hidden but essential for screen readers -->
            <label for={inputId} class="themed-visually-hidden"
                >Select row {value}</label
            >
        </div>
    {/if}
    <div class="sl-row__content-cell">
        <slot></slot>
        <!-- StructuredListCell components go here -->
    </div>
</div>

<style>
    .sl-row {
        /* Inherits display: flex from parent :global() rule */
        background-color: inherit; /* Allow zebra/selected background to show */
        transition: background-color 70ms ease-in-out;
    }

    .sl-row--disabled {
        cursor: not-allowed;
        color: var(--sl-text-disabled, #a8a8a8);
    }
    .sl-row--disabled :global(.sl-cell) {
        /* Ensure cells inherit disabled color */
        color: inherit;
    }

    .sl-row__input-cell {
        flex: 0 0 auto; /* Don't grow or shrink */
        display: flex;
        align-items: center; /* Vertically center input */
        justify-content: center;
        padding-left: var(--sl-padding-horizontal, 1rem);
        /* Control the width of the input area */
        width: var(--sl-input-size, 1.5rem);
    }

    .sl-row__input-cell input {
        cursor: pointer;
        margin: 0; /* Reset browser defaults */
        width: 1rem; /* Adjust size as needed */
        height: 1rem;
    }
    .sl-row__input-cell input[disabled] {
        cursor: not-allowed;
    }

    .sl-row__content-cell {
        flex: 1 1 auto; /* Grow to take remaining space */
        display: flex; /* Use flex for cells inside */
        align-items: stretch;
    }

    /* Visually Hidden Utility (copy from Button or place globally) */
    .themed-visually-hidden {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }
</style>
