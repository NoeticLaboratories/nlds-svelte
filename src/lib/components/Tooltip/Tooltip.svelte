<script lang="ts">
	import { fade } from 'svelte/transition';

	/** Text content of the tooltip */
	export let text: string;
	/** Controls visibility */
	export let open = false;
	/** Position relative to the trigger */
	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	/** Optional transition duration (ms) */
	export let duration = 100; // Carbon default fast transition

	let className = '';
	export { className as class };

	// Reactive classes based on position
	$: positionClass = `tooltip--${position}`;
</script>

{#if open}
	<div
		class="tooltip {positionClass} {className}"
		role="tooltip"
		transition:fade={{ duration }}
	>
		<span class="tooltip-text">{text}</span>
		<span class="tooltip-caret"></span>
	</div>
{/if}

<style>
	.tooltip {
		/* Base styles */
		position: absolute;
		background-color: var(--inverse-01, #161616);
		color: var(--text-primary, #f4f4f4);
		padding: 0.375rem 0.5rem; /* 6px 8px */
		border-radius: var(--border-radius, 0); /* Use theme radius or 0 */
		font-size: 0.875rem; /* 14px */
		line-height: 1.2;
		font-family: var(--font-sans, 'IBM Plex Sans', sans-serif);
		z-index: 9999; /* Ensure it's on top */
		white-space: nowrap;
		pointer-events: none; /* Don't interfere with mouse */
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)); /* Subtle shadow */

		/* Caret base */
		--caret-size: 6px;
		--caret-offset: -3px; /* Half of caret size */
	}

	.tooltip-text {
		display: block;
	}

	.tooltip-caret {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
		border-width: var(--caret-size);
	}

	/* --- Positioning --- */

	/* Top */
	.tooltip--top {
		bottom: calc(100% + var(--caret-size) + 2px); /* Position above + gap */
		left: 50%;
		transform: translateX(-50%);
	}
	.tooltip--top .tooltip-caret {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-color: var(--inverse-01, #161616) transparent transparent transparent;
	}

	/* Bottom (Adjust if needed) */
	.tooltip--bottom {
		top: calc(100% + var(--caret-size) + 2px);
		left: 50%;
		transform: translateX(-50%);
	}
	.tooltip--bottom .tooltip-caret {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-color: transparent transparent var(--inverse-01, #161616) transparent;
	}

	/* Left (Adjust if needed) */
	.tooltip--left {
		right: calc(100% + var(--caret-size) + 2px);
		top: 50%;
		transform: translateY(-50%);
	}
	.tooltip--left .tooltip-caret {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-color: transparent transparent transparent var(--inverse-01, #161616);
	}

	/* Right (Adjust if needed) */
	.tooltip--right {
		left: calc(100% + var(--caret-size) + 2px);
		top: 50%;
		transform: translateY(-50%);
	}
	.tooltip--right .tooltip-caret {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-color: transparent var(--inverse-01, #161616) transparent transparent;
	}
</style>
