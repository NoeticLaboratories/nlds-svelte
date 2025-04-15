<script lang="ts">
    // Core Components
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";
    // import Alert from '$lib/components/Alert/Alert.svelte'; // Optional: If an Alert component exists
</script>

<!-- Page Title -->
<h1>Getting Started</h1>

<!-- Header Section -->
<section class="page-section">
    <p class="component-description">
        This guide will walk you through installing the Noetic Labs Design
        System (NLDS) Svelte library and integrating it into your SvelteKit
        project.
    </p>
    <!-- Optional: Use an Alert component if available -->
    <!-- <Alert kind="info" title="SvelteKit Required">
		Please note that <strong>@noeticlabs/nlds-svelte</strong> currently relies on SvelteKit-specific features. It is designed for use within SvelteKit applications and may not work correctly in standalone Svelte projects at this time.
	</Alert> -->
    <div class="alert-placeholder info">
        <strong>SvelteKit Required:</strong> Please note that
        <strong>@noeticlabs/nlds-svelte</strong> currently relies on SvelteKit-specific
        features. It is designed for use within SvelteKit applications and may not
        work correctly in standalone Svelte projects at this time.
    </div>
</section>

<!-- Installation Section -->
<section class="page-section">
    <h2>1. Installation</h2>
    <p>
        Install the library directly from the Noetic Laboratories GitHub
        repository using your preferred package manager.
    </p>

    <CodeSnippet
        language="bash"
        type="multi"
        code={`
# Using npm
npm install github:NoeticLaboratories/nlds-svelte

# Using yarn
yarn add github:NoeticLaboratories/nlds-svelte

# Using pnpm
pnpm add github:NoeticLaboratories/nlds-svelte
	`}
    />

    <p style="margin-top: 1rem;">
        You can also install from a specific branch, tag, or commit hash if
        needed:
    </p>
    <CodeSnippet
        language="bash"
        type="multi"
        code={`
# Example installing a specific branch
npm install github:NoeticLaboratories/nlds-svelte#your-branch-name

# Example installing a specific commit
npm install github:NoeticLaboratories/nlds-svelte#commit-hash
	`}
    />

    <div class="alert-placeholder warning" style="margin-top: 1.5rem;">
        <strong>Build Process:</strong> Installation directly from Git requires the
        package manager to execute the library's `prepare` script (which runs `npm
        run build`) after cloning to generate the necessary distribution files (`dist/`).
        Alternatively, ensure the target branch/tag/commit you are installing has
        the `dist` directory pre-built and committed for maximum reliability.
    </div>
</section>

<!-- Setup Section -->
<section class="page-section">
    <h2>2. Import Core Styles</h2>
    <p>
        The library includes a core stylesheet (`core.css`) containing base
        styles, CSS custom properties (variables) for theming (like colors and
        typography), and potentially resets. You must import this file once in
        your application.
    </p>
    <p>
        The recommended place to import global styles in a SvelteKit project is
        within your root layout file, typically <CodeSnippet
            code="src/routes/+layout.svelte"
            type="inline"
        />.
    </p>
    <CodeSnippet
        language="svelte"
        type="multi"
        code={`
<!-- src/routes/+layout.svelte -->
<script>
  import '@noeticlabs/nlds-svelte/styles/core.css';
  // Import other global scripts or components if needed
</script>

<slot />

<style>
  /* Optional: Add global styles specific to your app layout here */
</style>
	`}
    />
    <p style="margin-top: 1rem;">
        Alternatively, if your project setup involves a main JavaScript or
        TypeScript entry point that handles global imports, you could import it
        there, but the layout file approach is generally preferred for
        SvelteKit.
    </p>
    <CodeSnippet
        language="javascript"
        type="multi"
        code={`
// Example: src/app.js (less common for global CSS in SvelteKit)
import '@noeticlabs/nlds-svelte/styles/core.css';

// ... other application setup
    `}
    />
</section>

<!-- Usage Section -->
<section class="page-section">
    <h2>3. Use Components</h2>
    <p>
        You can now import and use NLDS components directly in your Svelte
        files. Components are exported from the main package entry point.
    </p>
    <p>
        Here's a basic example using the <CodeSnippet
            code="Button"
            type="inline"
        /> component:
    </p>
    <CodeSnippet
        language="svelte"
        type="multi"
        code={`
<script lang="ts">
  import { Button } from '@noeticlabs/nlds-svelte';

  let count = 0;
  const handleButtonClick = () => count++;
</script>

<div class="example-container">
  <h2>Example Component Usage</h2>
  <Button kind="primary" on:click={handleButtonClick}>
    Clicks: {count}
  </Button>

  <Button kind="secondary" style="margin-left: 0.5rem;">
    Another Button
  </Button>
</div>

<style>
  .example-container {
    padding: 1.5rem;
    border: 1px solid var(--nlds-border-color);
    background-color: var(--nlds-bg-secondary);
    border-radius: 4px; /* Example border radius */
  }
  h2 {
	margin-top: 0;
	margin-bottom: 1rem;
	/* Assumes h2 styles are globally defined via core.css */
  }
</style>
	`}
    />
</section>

<!-- Next Steps Section -->
<section class="page-section">
    <h2>Next Steps</h2>
    <p>
        You're all set up! Now you can explore the rest of this gallery to
        discover:
    </p>
    <ul>
        <li>The full range of available <strong>Components</strong>.</li>
        <li>
            Guidelines for foundational elements like <strong>Colors</strong>
            and <strong>Typography</strong>.
        </li>
        <li>
            Detailed API documentation and usage examples for each component.
        </li>
    </ul>
    <p>
        Refer to the specific component pages for detailed props, events, and
        usage patterns.
    </p>
</section>

<style>
    /* General Page Styles - Adapt from previous examples */
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
        font-size: 1rem; /* Slightly larger for intro */
        margin-bottom: 2rem;
        color: var(--nlds-text-secondary);
    }

    /* Placeholder styling for Alert component if not available */
    .alert-placeholder {
        padding: 1rem 1.5rem;
        border: 1px solid transparent;
        border-radius: 0; /* Or match NLDS style */
        margin-bottom: 1rem;
        border-left-width: 4px;
    }
    .alert-placeholder.info {
        background-color: #e0f2fe; /* Example info blue */
        border-color: #7dd3fc;
        border-left-color: #0ea5e9;
        color: #0c4a6e;
    }
    .alert-placeholder.warning {
        background-color: #fffbeb; /* Example warning yellow */
        border-color: #fde68a;
        border-left-color: #facc15;
        color: #78350f;
    }
    .alert-placeholder strong {
        font-weight: 600;
    }

    /* Ensure code snippets have appropriate margins */
    :global(.ndsl-codesnippet) {
        /* Target CodeSnippet component globally if needed */
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
</style>
