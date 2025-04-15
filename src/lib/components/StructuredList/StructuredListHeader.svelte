<script lang="ts">
    /** Prevent text wrapping */
    export let noWrap: boolean = false;

    /** Align header content to the right */
    export let alignRight: boolean = false;

    let className: string = "";
    export { className as class };
</script>

<div
    class="sl-header-cell {className}"
    class:sl-header-cell--no-wrap={noWrap}
    class:sl-header-cell--align-right={alignRight}
    role="columnheader"
>
    <slot></slot>
</div>

<style>
    .sl-header-cell {
        flex: 1 1 0%; /* Match cell default */
        padding: var(--sl-padding-vertical, 1rem)
            var(--sl-padding-horizontal, 1rem);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        min-width: 0;
        color: inherit; /* Inherit color from .sl-header */
        font-weight: inherit; /* Inherit weight from .sl-header */
    }

    .sl-header-cell--no-wrap {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .sl-header-cell--align-right {
        justify-content: flex-end;
        text-align: right;
    }

    /* Match cell weight classes if used */
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex-grow: 2;
    }
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex-grow: 3;
    }
</style>
