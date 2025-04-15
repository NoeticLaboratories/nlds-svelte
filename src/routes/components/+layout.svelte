<script>
    import { page } from "$app/stores";

    // Get the current component name from the URL path
    $: componentName = $page.url.pathname.split("/").pop();
</script>

<div class="component-documentation">
    <div class="component-content">
        <slot />
    </div>

    <footer class="component-page-footer">
        <div class="edit-links">
            <a
                href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/routes/components/{componentName}"
                target="_blank"
                rel="noopener"
            >
                Edit this component on GitHub
            </a>
        </div>
    </footer>
</div>

<style>
    .component-documentation {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .component-content {
        margin: 0;
    }

    .component-page-footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid var(--nlds-border-color);
        font-size: 0.9rem;
    }

    .edit-links a {
        color: var(--nlds-text-secondary);
        text-decoration: none;
    }

    .edit-links a:hover {
        text-decoration: underline;
    }
</style>
