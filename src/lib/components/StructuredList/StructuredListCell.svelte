<script lang="ts">
    /** Prevent text wrapping */
    export let noWrap: boolean = false;

    /** Align cell content to the right */
    export let alignRight: boolean = false;

    let className: string = "";
    export { className as class };
</script>

<div
    class="sl-cell {className}"
    class:sl-cell--no-wrap={noWrap}
    class:sl-cell--align-right={alignRight}
>
    <slot></slot>
</div>

<style>
    .sl-cell {
        flex: 1 1 0%; /* Default: cells share space equally */
        padding: var(--sl-padding-vertical, 1rem)
            var(--sl-padding-horizontal, 1rem);
        display: flex;
        align-items: center; /* Vertically center content */
        box-sizing: border-box;
        overflow: hidden; /* Prevent content overflow issues */
        min-width: 0; /* Prevent flex items from overflowing */
    }

    .sl-cell--no-wrap {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .sl-cell--align-right {
        justify-content: flex-end;
        text-align: right;
    }

    /* Example: Allow specific cells to take more/less space if needed */
    /* Add classes like 'sl-cell--w-auto', 'sl-cell--w-fixed' if required */
    :global(.sl-cell.sl-cell--weight-2) {
        flex-grow: 2;
    } /* Example weight class */
    :global(.sl-cell.sl-cell--weight-3) {
        flex-grow: 3;
    }
</style>
