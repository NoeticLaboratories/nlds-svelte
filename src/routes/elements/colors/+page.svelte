<script lang="ts">
	// Core Components (Assuming these exist based on the NumberInput example)
	import CodeSnippet from '$lib/components/CodeSnippet/CodeSnippet.svelte';
	// Icons (Optional, could be used for theme indicators, etc.)
	// import InfoIcon from '~icons/carbon/information';

	// Page specific data for colors extracted from the provided CSS
	const accentColors = [
		{ name: '--nlds-accent-primary', value: '#ff9351', description: 'Primary interactive color' },
		{ name: '--nlds-accent-primary-hover', value: '#ff7f2e', description: 'Hover state for primary accent' },
		{ name: '--nlds-accent-primary-active', value: '#f07733', description: 'Active state for primary accent' }
	];

	const themes = [
		{
			name: 'White (Default)',
			attribute: 'data-theme="white" (or none)', // Assuming default doesn't need attribute
			colors: [
				{ name: '--nlds-bg-primary', value: '#ffffff', description: 'Primary page background' },
				{ name: '--nlds-bg-secondary', value: '#f4f4f4', description: 'Secondary background (e.g., cards)' },
				{ name: '--nlds-text-primary', value: '#161616', description: 'Primary text color' },
				{ name: '--nlds-text-secondary', value: '#525252', description: 'Secondary text color' },
				{ name: '--nlds-border-color', value: '#e0e0e0', description: 'Default border color' },
				{ name: '--nlds-link-color', value: '#0f62fe', description: 'Default link color' }
			],
			scheme: 'light'
		},
		{
			name: 'b10 (Very Light Gray)',
			attribute: 'data-theme="b10"',
			colors: [
				{ name: '--nlds-bg-primary', value: '#f4f4f4', description: 'Primary page background' },
				{ name: '--nlds-bg-secondary', value: '#e0e0e0', description: 'Secondary background' },
				{ name: '--nlds-text-primary', value: '#161616', description: 'Primary text color' },
				{ name: '--nlds-text-secondary', value: '#525252', description: 'Secondary text color' },
				{ name: '--nlds-border-color', value: '#c6c6c6', description: 'Default border color' },
				{ name: '--nlds-link-color', value: '#0f62fe', description: 'Default link color' }
			],
			scheme: 'light'
		},
		{
			name: 'b80 (Dark Gray)',
			attribute: 'data-theme="b80"',
			colors: [
				{ name: '--nlds-bg-primary', value: '#393939', description: 'Primary page background' },
				{ name: '--nlds-bg-secondary', value: '#4c4c4c', description: 'Secondary background' },
				{ name: '--nlds-text-primary', value: '#f4f4f4', description: 'Primary text color' },
				{ name: '--nlds-text-secondary', value: '#c6c6c6', description: 'Secondary text color' },
				{ name: '--nlds-border-color', value: '#606060', description: 'Default border color' },
				{ name: '--nlds-link-color', value: '#78a9ff', description: 'Default link color' }
			],
			scheme: 'dark'
		},
		{
			name: 'b90 (Very Dark Gray)',
			attribute: 'data-theme="b90"',
			colors: [
				{ name: '--nlds-bg-primary', value: '#262626', description: 'Primary page background' },
				{ name: '--nlds-bg-secondary', value: '#393939', description: 'Secondary background' },
				{ name: '--nlds-text-primary', value: '#f4f4f4', description: 'Primary text color' },
				{ name: '--nlds-text-secondary', value: '#c6c6c6', description: 'Secondary text color' },
				{ name: '--nlds-border-color', value: '#525252', description: 'Default border color' },
				{ name: '--nlds-link-color', value: '#78a9ff', description: 'Default link color' }
			],
			scheme: 'dark'
		},
		{
			name: 'b100 (Black)',
			attribute: 'data-theme="b100"',
			colors: [
				{ name: '--nlds-bg-primary', value: '#161616', description: 'Primary page background' },
				{ name: '--nlds-bg-secondary', value: '#262626', description: 'Secondary background' },
				{ name: '--nlds-text-primary', value: '#f4f4f4', description: 'Primary text color' },
				{ name: '--nlds-text-secondary', value: '#c6c6c6', description: 'Secondary text color' },
				{ name: '--nlds-border-color', value: '#393939', description: 'Default border color' },
				{ name: '--nlds-link-color', value: '#78a9ff', description: 'Default link color' }
			],
			scheme: 'dark'
		}
	];

	const utilityClasses = [
		{ name: '.nlds-accent-bg', description: 'Applies accent background color and contrast text.' },
		{ name: '.nlds-accent-text', description: 'Applies accent text color.' },
		{ name: '.nlds-accent-border', description: 'Applies accent border color.' }
	];

</script>

<!-- Page Title -->
<h1>Colors</h1>

<!-- Header Section -->
<section class="page-section">
	<p class="component-description">
		The Noetic Labs Design System (NLDS) utilizes a flexible color system based on CSS custom
		properties (variables). This allows for consistent theming across applications. The system
		includes a primary accent color and multiple background themes inspired by IBM's <a href="https://carbondesignsystem.com/" target="_blank" rel="noopener noreferrer">Carbon Design System</a> palette structure.
	</p>
</section>

<!-- Accent Colors Section -->
<section class="page-section">
	<h2>Accent Colors</h2>
	<p>
		Accent colors are used for primary interactive elements like buttons and focused inputs.
	</p>
	<div class="color-grid">
		{#each accentColors as color}
			<div class="color-card">
				<div class="color-swatch" style="background-color: {color.value};"></div>
				<div class="color-info">
					<CodeSnippet code={color.name} type="inline" />
					<span class="hex-value">{color.value}</span>
					<p class="color-description">{color.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Theme Colors Section -->
<section class="page-section">
	<h2>Themes</h2>
	<p>
		NLDS provides multiple themes that control background, text, border, and other UI element colors.
		Themes are applied by setting the <CodeSnippet code="data-theme" type="inline" /> attribute on a
		container element (often <CodeSnippet code="<body>" type="inline" /> or <CodeSnippet code="<html>" type="inline" />). The default theme is White.
	</p>

	{#each themes as theme}
		<div class="theme-section">
			<h3>{theme.name}</h3>
			<p>
				Apply with: <CodeSnippet code={theme.attribute} type="inline" />.
				Color scheme: <CodeSnippet code={theme.scheme} type="inline" />.
			</p>
			<div class="color-grid">
				{#each theme.colors as color}
					<div class="color-card">
						<div class="color-swatch" style="background-color: {color.value}; border: 1px solid var(--nlds-border-color, #ccc);">
                            {#if color.name.includes('text')}
                                <span class="swatch-text" style="color: {color.value}; background-color: {theme.colors.find(c => c.name.includes('bg-primary'))?.value || '#888'}; padding: 2px 4px;">Aa</span>
                            {/if}
                        </div>
						<div class="color-info">
							<CodeSnippet code={color.name} type="inline" />
							<span class="hex-value">{color.value}</span>
							<!-- <p class="color-description">{color.description}</p> -->
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>

<!-- Utility Classes Section -->
<section class="page-section">
	<h2>Utility Classes</h2>
	<p>
		For convenience, a few utility classes are provided to directly apply accent colors.
	</p>
	<ul>
		{#each utilityClasses as utility}
			<li>
				<CodeSnippet code={utility.name} type="inline" />: {utility.description}
			</li>
		{/each}
	</ul>
	<!-- Example Usage -->
	<div class="component-demo utility-demo">
		<div class="nlds-accent-bg demo-box">Accent Background (.nlds-accent-bg)</div>
		<p class="nlds-accent-text">Accent Text (.nlds-accent-text)</p>
		<div class="demo-box nlds-accent-border" style="border-width: 2px; border-style: solid;">
			Accent Border (.nlds-accent-border)
		</div>
	</div>
</section>

<!-- Usage Section -->
<section class="page-section">
    <h2>Usage</h2>
    <p>
        Colors should primarily be consumed via their CSS custom properties within your stylesheets or
        components. This ensures that elements adapt correctly when the theme changes.
    </p>
    <CodeSnippet language="css" type="multi" code={`
/* Example: Styling a custom component */
.my-custom-card {
    background-color: var(--nlds-bg-secondary);
    color: var(--nlds-text-primary);
    border: 1px solid var(--nlds-border-color);
    padding: 1rem;
}

.my-custom-card__title {
    color: var(--nlds-text-secondary);
    margin-bottom: 0.5rem;
}

.my-custom-card__link {
    color: var(--nlds-link-color);
    text-decoration: none;
}

.my-custom-card__link:hover {
    color: var(--nlds-link-hover-color);
    text-decoration: underline;
}

.my-custom-card__button--primary {
	background-color: var(--nlds-accent-primary);
	color: var(--nlds-inverse-01); /* Assuming white text on accent */
	/* ... other button styles */
}

.my-custom-card__button--primary:hover {
	background-color: var(--nlds-accent-primary-hover);
}
    `} />
</section>

<style>
	/* General Page Styles - Adapt from NumberInput example [3] */
	h1 {
		margin-bottom: 1rem;
        font-weight: 600;
	}
	h2 {
		margin-top: 2.5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
		padding-bottom: 0.5rem;
        font-weight: 600;
	}
	h3 {
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-weight: 600;
	}
	p {
		margin-bottom: 1rem;
		line-height: 1.6;
        max-width: 75ch; /* Improve readability */
	}
    ul {
		margin-left: 1.5rem;
		margin-bottom: 1.5rem;
        list-style: disc;
	}
    li {
        margin-bottom: 0.5rem;
		line-height: 1.6;
    }

	.page-section {
		margin-bottom: 3rem;
	}
	.component-description {
		font-size: 1rem;
		margin-bottom: 2rem;
		color: var(--nlds-text-secondary);
	}
	.component-demo {
		padding: 1.5rem;
		border: 1px solid var(--nlds-border-color, #e0e0e0);
		border-radius: 0;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		background-color: var(--nlds-bg-secondary, #f4f4f4);
	}

	/* Color Display Styles */
    .theme-section {
        margin-bottom: 2.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px dashed var(--nlds-border-color, #e0e0e0);
    }
    .theme-section:last-of-type {
        border-bottom: none;
    }

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
        margin-top: 1rem;
	}

	.color-card {
		display: flex;
		flex-direction: column;
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        background-color: var(--nlds-bg-primary); /* Use theme bg for card */
        overflow: hidden; /* Ensure swatch corners are clipped if rounded later */
	}

	.color-swatch {
		height: 80px;
		width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
	}
    .swatch-text {
        font-weight: bold;
    }

	.color-info {
		padding: 1rem;
        font-size: 0.875rem;
        flex-grow: 1; /* Ensure cards in a row have same height */
	}

	.color-info :global(.ndsl-codesnippet--inline) { /* Target CodeSnippet inside */
		display: block; /* Make it block for better layout */
        margin-bottom: 0.3rem;
        white-space: normal; /* Allow wrapping */
        word-break: break-all; /* Break long variable names */
	}

    .hex-value {
        font-family: var(--nlds-font-mono);
        color: var(--nlds-text-secondary);
        font-size: 0.8rem;
        display: block;
        margin-bottom: 0.5rem;
    }

    .color-description {
        font-size: 0.8rem;
        color: var(--nlds-text-secondary);
        line-height: 1.4;
        margin-bottom: 0; /* Reset paragraph margin */
    }

	/* Utility Demo Styles */
    .utility-demo {
        background-color: var(--nlds-bg-primary); /* Use primary bg for contrast */
    }
	.utility-demo .demo-box {
		padding: 1rem;
		margin-bottom: 1rem;
		border: 1px solid transparent; /* Base border */
        text-align: center;
	}
    /* Specific utility class styles from source for demo */
    .utility-demo .nlds-accent-bg {
        background-color: var(--nlds-accent-primary);
        color: var(--nlds-inverse-01, white); /* Use inverse for text on accent */
    }
    .utility-demo .nlds-accent-text {
        color: var(--nlds-accent-primary);
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .utility-demo .nlds-accent-border {
        border-color: var(--nlds-accent-primary);
    }

</style>
