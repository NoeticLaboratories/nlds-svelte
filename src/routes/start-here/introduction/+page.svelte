<script lang="ts">
    // Optional: Import components if needed for specific intro elements,
    // but likely not necessary for a pure introductory text page.
    // import CodeSnippet from '$lib/components/CodeSnippet/CodeSnippet.svelte';
    // import Button from '$lib/components/Button/Button.svelte';
    // import Link from '$lib/components/Link/Link.svelte'; // Assuming a Link component exists
</script>

<!-- Page Title -->
<h1>Introduction</h1>

<!-- Header Section -->
<section class="page-section">
    <p class="component-description large-intro-text">
        Welcome to the gallery for the <strong
            >Noetic Labs Design System (NLDS) Svelte</strong
        > component library. This is a collection of reusable UI components developed
        by Noetic Labs, built with Svelte 5 for use within our SvelteKit applications.
    </p>
</section>

<!-- Core Purpose Section -->
<section class="page-section">
    <h2>Purpose</h2>
    <p>
        NLDS Svelte provides a foundational set of accessible, well-documented,
        and consistent components to accelerate UI development at Noetic
        Laboratories. By establishing a shared visual and interactive language,
        we aim to create cohesive and high-quality user experiences across our
        projects.
    </p>
    <p>
        <strong>Important Note:</strong> This library currently utilizes SvelteKit-specific
        features and conventions. As such, it is intended for use within SvelteKit
        projects and may not function correctly in standalone Svelte applications
        at this time.
    </p>
</section>

<!-- Inspiration Section -->
<section class="page-section">
    <h2>Inspiration</h2>
    <p>
        Our design system is heavily inspired by the excellent work done by the
        team behind IBM's <a
            href="https://carbondesignsystem.com/"
            target="_blank"
            rel="noopener noreferrer">Carbon Design System</a
        >. While NLDS is tailored specifically to our needs and context at
        Noetic Laboratories and is not a direct clone, we strive to embody
        Carbon's core principles:
    </p>
    <ul>
        <li>
            <strong>Consistency:</strong> Providing predictable and uniform UI elements.
        </li>
        <li>
            <strong>Modularity:</strong> Building with independent, reusable blocks.
        </li>
        <li>
            <strong>Clarity:</strong> Ensuring interfaces are intuitive and easy
            to understand.
        </li>
        <li>
            <strong>Accessibility:</strong> Adhering to accessibility standards to
            support all users.
        </li>
    </ul>
</section>

<!-- Key Features Section -->
<section class="page-section">
    <h2>Key Features</h2>
    <ul>
        <li>
            <strong>Modern Foundation:</strong> Built entirely with Svelte 5.
        </li>
        <li>
            <strong>Type Safety:</strong> Includes TypeScript definitions for enhanced
            developer experience and robustness.
        </li>
        <li>
            <strong>Modular Design:</strong> Components are designed to be imported
            and used independently.
        </li>
        <li>
            <strong>Core Styling Included:</strong> A base stylesheet (`core.css`)
            provides foundational styles and CSS custom properties for theming[4].
        </li>
    </ul>
</section>

<!-- Using This Gallery Section -->
<section class="page-section">
    <h2>Using This Gallery</h2>
    <p>
        This interactive gallery serves as the central documentation hub for
        NLDS Svelte. Here you can:
    </p>
    <ul>
        <li>Explore available components and see them in action.</li>
        <li>
            Understand design guidelines for foundations like Colors and
            Typography.
        </li>
        <li>View usage examples and API documentation for each component.</li>
        <li>
            Copy code snippets to integrate components into your projects
            quickly.
        </li>
    </ul>
    <p>
        Use the navigation menu to browse through the different sections. We
        encourage developers at Noetic Laboratories to familiarize themselves
        with the system and utilize these resources to build consistent and
        efficient UIs.
    </p>
</section>

<!-- Optional: Link to Repo or Further Info -->
<!-- <section class="page-section">
	<h2>Further Information</h2>
	<p>
		For installation instructions, contribution guidelines, and the full source code, please refer to the project's repository.
	</p>
	<Button href="https://github.com/NoeticLaboratories/nlds-svelte" target="_blank" rel="noopener noreferrer" kind="primary">
		View on GitHub
	</Button>
</section> -->

<style>
    /* General Page Styles - Adapt from previous examples [3] */
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
        /* Included for consistency, though not used here */
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
    a {
        /* Basic link styling */
        color: var(--nlds-link-color);
        text-decoration: none;
    }
    a:hover {
        color: var(--nlds-link-hover-color);
        text-decoration: underline;
    }

    .page-section {
        margin-bottom: 3rem;
    }

    /* Larger text for the main intro paragraph */
    .large-intro-text {
        font-size: 1.125rem; /* ~18px */
        line-height: 1.7;
        color: var(--nlds-text-primary);
    }

    .component-description {
        /* Use this class for lead paragraphs if needed */
        font-size: 1rem;
        margin-bottom: 2rem;
        color: var(--nlds-text-secondary);
    }

    /* Ensure list items have enough space */
    li {
        margin-bottom: 0.75rem;
    }

    /* Styling for external links if a Link component isn't used */
    a[target="_blank"]::after {
        content: "↗"; /* Simple indicator for external links */
        display: inline-block;
        margin-left: 0.25em;
        font-size: 0.8em;
        opacity: 0.7;
    }
</style>
