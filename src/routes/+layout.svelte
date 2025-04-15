<script>
    import "../app.css";
    import "$lib/styles/core.css";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { theme, applyInitialTheme } from "$lib/stores/themeStore.js";
    import GithubIcon from "~icons/carbon/logo-github";

    // Import components
    import TextInput from "$lib/components/TextInput/TextInput.svelte";
    import Select from "$lib/components/Select/Select.svelte";

    // --- Site Config ---
    const siteName = "Noetic Labs Design System";
    const githubLink =
        "https://github.com/noeticlaboratories/nlds-components-svelte";

    // --- Sidebar Structure (Base Definition) ---
    // This is the source of truth for all sidebar items BEFORE filtering
    const sidebarSectionsBase = [
        {
          title: "Start here",
          items: [
            { name: "Introduction", path: "/" },
            { name: "Getting Started", path: "/getting-started" },
          ],
        },
        {
            title: "Elements",
            items: [
                { name: "Colors", path: "/elements/colors" },
                { name: "Themes", path: "/elements/themes" },
                { name: "Typography", path: "/elements/typography" },
                // Add more element links here
            ],
        },
        {
            title: "Guidelines",
            items: [
                { name: "Accessibility", path: "/guidelines/accessibility" },
                { name: "Voice & Tone", path: "/guidelines/voice-tone" },
                // Add more guideline links here
            ],
        },
        {
            title: "Components",
            items: [
                // Keep the component list directly here or imported
                // { name: 'Accordion', path: '/components/accordion' },
                // { name: 'AspectRatio', path: '/components/aspectratio' },
                // { name: 'Button', path: '/components/button' },
                // { name: 'Card', path: '/components/card' },
                // { name: 'Checkbox', path: '/components/checkbox' },
                // { name: 'Dialog', path: '/components/dialog' },
                // { name: 'Dropdown', path: '/components/dropdown' },
                // { name: 'Input', path: '/components/input' },
                // { name: 'Modal', path: '/components/modal' },
                { name: "NumberInput", path: "/components/numberinput" },
                // { name: 'Popover', path: '/components/popover' },
                // { name: 'Progress', path: '/components/progress' },
                // { name: 'RadioGroup', path: '/components/radiogroup' },
                // { name: 'Select', path: '/components/select' },
                // { name: 'Slider', path: '/components/slider' },
                // { name: 'Switch', path: '/components/switch' },
                // { name: 'Table', path: '/components/table' },
                // { name: 'Tabs', path: '/components/tabs' },
                // { name: 'Textarea', path: '/components/textarea' },
                { name: "TextInput", path: "/components/textinput" },
                // { name: 'Toast', path: '/components/toast' },
                // { name: 'Toggle', path: '/components/toggle' },
                // { name: 'Tooltip', path: '/components/tooltip' },
                // ...
            ],
        },
    ];

    // --- Search Functionality ---
    let searchTerm = "";

    // Reactive declaration: Filter ALL sections based on the search term
    $: sidebarSections = (() => {
        const term = searchTerm.trim().toLowerCase();

        // If no search term, return the original full structure
        if (!term) {
            return sidebarSectionsBase;
        }

        // If there IS a search term, filter items within each section
        return sidebarSectionsBase.map((section) => {
            // Filter the items array of the current section
            const filteredItems = section.items.filter((item) =>
                item.name.toLowerCase().includes(term),
            );
            // Return a new section object with the filtered items
            // Keep the section title regardless of whether items remain
            return { ...section, items: filteredItems };
        });
        // Optional: If you want to HIDE sections entirely when they have no matching items after filtering:
        // .filter(section => section.items.length > 0);
        // For now, we'll keep the section headers visible even if empty after search.
    })(); // IIFE used for cleaner multi-line logic within reactive declaration

    // --- Theme Selector Options ---
    const themeOptions = [
        { value: "white", label: "White" },
        { value: "b10", label: "Black 10" },
        { value: "b80", label: "Black 80" },
        { value: "b90", label: "Black 90" },
        { value: "b100", label: "Black 100" },
    ];

    // --- Apply Theme on Mount ---
    if (browser) {
        applyInitialTheme();
    }
</script>

<div class="layout-container">
    <!-- Topbar -->
    <header class="topbar">
        <div class="topbar-left">
            <div class="site-name">
                <a href="/">{siteName}</a>
            </div>
        </div>
        <div class="topbar-right">
            <!-- Theme Selector -->
            <div class="theme-selector-wrapper">
                <Select
                    options={themeOptions}
                    bind:value={$theme}
                    aria-label="Select color theme"
                    id="theme-selector"
                />
            </div>
            <div class="topbar-links">
                <a href={githubLink} target="_blank" rel="noopener noreferrer"
                    ><GithubIcon style="font-size: 1.2rem;" /></a
                >
            </div>
        </div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar">
        <!-- Search Bar Component -->
        <TextInput
            bind:value={searchTerm}
            placeholder="Search..."
            style="margin-bottom: 1.2rem;"
        />

        <!-- Navigation Sections -->
        <nav>
            {#if sidebarSections.length > 0}
                {#each sidebarSections as section (section.title)}
                    <div class="sidebar-section">
                        {#if section.title}
                            <h3 class="section-title">{section.title}</h3>
                        {/if}

                        {#if section.items.length > 0}
                            {#each section.items as item (item.path)}
                                <a
                                    href={item.path}
                                    class:active={item.path === "/"
                                        ? $page.url.pathname === "/"
                                        : $page.url.pathname.startsWith(item.path)}
                                >
                                    {item.name}
                                </a>
                            {/each}
                        {:else if searchTerm.trim() !== ""}
                            <!-- Show 'No results' if search term is active AND this section has no items -->
                            <p class="no-results">
                                No results in this section.
                            </p>
                        {/if}
                    </div>
                {/each}
            {:else if searchTerm.trim() !== ""}
                <!-- Optional: Show a global 'no results' if ALL sections are filtered out -->
                <!-- This part is only reached if you uncommented the .filter() in the script -->
                <!-- <p class="no-results">No results found matching "{searchTerm}"</p> -->
            {/if}
        </nav>
    </aside>

    <!-- Main content (remains the same) -->
    <main class="content">
        <slot />
    </main>
</div>

<style>
    /* --- Layout Grid --- */
    .layout-container {
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "topbar topbar"
            "sidebar content";
        height: 100vh;
        overflow: hidden;
    }

    /* --- Topbar Styles --- */
    .topbar {
        grid-area: topbar;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
        z-index: 10;
        transition:
            background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out;
    }

    .topbar-left {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .topbar-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .theme-selector-wrapper {
    }

    .site-name a {
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--text-primary);
        text-decoration: none;
    }

    .topbar-links a {
        color: #555;
        text-decoration: none;
        margin-left: 1rem;
        font-size: 0.9rem;
    }
    .topbar-links a:hover {
        color: #000;
        text-decoration: underline;
    }

    /* --- Sidebar Styles --- */
    .sidebar {
        grid-area: sidebar;
        border-right: 1px solid var(--border-color);
        padding: 1.5rem 1rem;
        background: var(--bg-primary);
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
        transition:
            background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out;
    }
    .sidebar::-webkit-scrollbar {
        width: 6px;
    }
    .sidebar::-webkit-scrollbar-track {
        background: var(--scrollbar-track);
    }
    .sidebar::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
        border-radius: 3px;
        border: 1px solid var(--scrollbar-track);
    }
    .sidebar::-webkit-scrollbar-thumb:hover {
        background-color: #a8a8a8; /* Or a variable */
    }

    nav {
        display: flex;
        flex-direction: column;
    }

    .sidebar-section {
        margin-bottom: 1.5rem;
    }
    .sidebar-section:last-child {
        margin-bottom: 0;
    }

    .section-title {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 0.75rem 0.5rem;
    }

    nav a {
        display: block;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: var(--link-color);
        border-radius: 4px;
        margin-bottom: 2px;
        font-size: 0.9rem;
        transition: background-color 0.15s ease;
    }
    nav a:hover {
        background: var(--accent-bg-hover);
    }
    nav a.active {
        background: var(--link-active-bg);
        font-weight: 500;
        color: var(--text-primary);
    }
    .no-results {
        font-size: 0.9rem;
        color: var(--text-secondary);
        padding: 0.25rem 1rem;
        font-style: italic;
    }

    /* --- Content Styles --- */
    .content {
        grid-area: content;
        padding: 2rem;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
    }
    .content::-webkit-scrollbar {
        width: 6px;
    }
    .content::-webkit-scrollbar-track {
        background: var(--scrollbar-track);
    }
    .content::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
        border-radius: 3px;
        border: 1px solid var(--scrollbar-track);
    }
    .content::-webkit-scrollbar-thumb:hover {
        background-color: #a8a8a8; /* Or a variable */
    }
</style>
