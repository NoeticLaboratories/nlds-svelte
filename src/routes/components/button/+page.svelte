<script lang="ts">
    // Core Components
    import Button from "$lib/components/Button/Button.svelte";
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons (Assuming these exist based on common libraries like carbon-icons-svelte or similar)
    import Code from "carbon-icons-svelte/lib/Code.svelte";
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import Download from "carbon-icons-svelte/lib/Download.svelte";
    import Settings from "carbon-icons-svelte/lib/Settings.svelte";

    // Page specific state (less needed for Button compared to NumberInput)
    let isDisabled = false;

    // Example code snippets
    const exampleCodeKinds = `<script>
  import Button from '$lib/components/Button/Button.svelte';
<\/script>

<Button kind="primary">Primary</Button>
<Button kind="secondary">Secondary</Button>
<Button kind="tertiary">Tertiary</Button>
<Button kind="danger">Danger</Button>
<Button kind="ghost">Ghost</Button>`;

    const exampleCodeSizes = `<script>
  import Button from '$lib/components/Button/Button.svelte';
<\/script>

<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>`;

    const exampleCodeIcons = `<script lang="ts">
  import Button from '$lib/components/Button/Button.svelte';
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import Download from "carbon-icons-svelte/lib/Download.svelte";
<\/script>

<Button icon={Add}>Button with icon</Button>
<Button kind="secondary" icon={Download}>Secondary with icon</Button>`;

    const exampleCodeIconOnly = `<script lang="ts">
  import Button from '$lib/components/Button/Button.svelte';
  import Settings from "carbon-icons-svelte/lib/Settings.svelte";
<\/script>

<Button
  kind="ghost"
  icon={Settings}
  hasIconOnly
  iconDescription="Settings"
/>
<Button
  kind="primary"
  icon={Settings}
  hasIconOnly
  iconDescription="Settings"
  size="lg"
/>`;

    const exampleCodeStates = `<script>
  import Button from '$lib/components/Button/Button.svelte';
  let isDisabled = false;
<\/script>

<Button disabled>Disabled Primary</Button>
<Button kind="secondary" disabled>Disabled Secondary</Button>
<Button kind="danger" disabled>Disabled Danger</Button>
<Button kind="ghost" disabled>Disabled Ghost</Button>

<!-- Interactive Example -->
<Button
  kind="primary"
  bind:disabled={isDisabled}
>
  {isDisabled ? 'Cannot click' : 'Click to disable'}
</Button>
<label style="display: inline-flex; align-items: center; margin-left: 1rem;">
  <input type="checkbox" bind:checked={isDisabled} /> Disable Button
</label>`;

    const exampleCodeLink = `<script>
  import Button from '$lib/components/Button/Button.svelte';
<\/script>

<Button href="https://example.com" target="_blank">Link Button</Button>
<Button href="/internal/path" kind="secondary">Internal Link</Button>`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "kind",
            type: "'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'",
            defaultVal: "'primary'",
            description: "Specifies the visual style of the button.",
        },
        {
            name: "size",
            type: "'sm' | 'md' | 'lg'",
            defaultVal: "'md'",
            description: "Sets the visual size of the button.",
        },
        {
            name: "disabled",
            type: "boolean",
            defaultVal: "false",
            description:
                "Disables the button, making it unclickable and visually muted.",
        },
        {
            name: "href",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "If provided, renders the component as an anchor (`a`) tag instead of a `button`.",
        },
        {
            name: "icon",
            type: "ComponentType<SvelteComponent> | undefined",
            defaultVal: "undefined",
            description:
                "Svelte component to render as an icon inside the button.",
        },
        {
            name: "iconDescription",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Required text description for the icon, used for `aria-label` when `hasIconOnly` is true. Provides accessible name for screen readers.",
        },
        {
            name: "hasIconOnly",
            type: "boolean",
            defaultVal: "false",
            description:
                "If true, the button renders only the icon, styled appropriately. Requires `icon` and `iconDescription`.",
        },
        {
            name: "type",
            type: "'button' | 'submit' | 'reset'",
            defaultVal: "'button'",
            description:
                "Specifies the `type` attribute for the underlying `button` element (ignored if `href` is set).",
        },
        {
            name: "target",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Specifies the `target` attribute for the anchor (`a`) tag (only applies if `href` is set).",
        },
        {
            name: "rel",
            type: "string | undefined",
            defaultVal: "'noopener noreferrer' (if target='_blank')",
            description:
                "Specifies the `rel` attribute for the anchor (`a`) tag (only applies if `href` is set).",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description:
                "Additional CSS classes to apply to the button or anchor element.",
        },
    ];

    const eventsData = [
        {
            name: "click",
            detail: "MouseEvent", // Original MouseEvent is forwarded
            description:
                "Fired when the button or anchor is clicked. Event is prevented if `disabled` is true.",
        },
    ];
</script>

<!-- Page Title -->
<h1>Button</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <!-- Use semantic time element if appropriate -->
            <time datetime="2025-04-15">Updated on 2025-04-15</time>
        </div>
        <!-- Use themed Button -->
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/Button"
            kind="ghost"
            icon={Code}
            target="_blank"
            rel="noopener noreferrer"
        >
            Source code
        </Button>
    </div>
</section>

<!-- Overview Section -->
<section class="page-section">
    <p class="component-description">
        The Button component provides a flexible element for user actions. It
        supports different visual styles (kinds), sizes, disabled states, and
        can render as either a standard HTML <CodeSnippet
            code="<button>"
            type="inline"
            language="html"
        />
        or an anchor <CodeSnippet code="<a>" type="inline" language="html" /> tag
        if an
        <CodeSnippet code="href" type="inline" language="html" /> is provided. Icons
        can be included alongside text or as the sole content of the button.
    </p>
</section>

<!-- Kinds Example Section -->
<section class="page-section">
    <h2>Kinds</h2>
    <p>
        Use the <CodeSnippet code="kind" type="inline" /> prop to specify the button's
        visual style. The available kinds are <CodeSnippet
            code="'primary'"
            type="inline"
        /> (default), <CodeSnippet code="'secondary'" type="inline" />, <CodeSnippet
            code="'tertiary'"
            type="inline"
        /> (outline), <CodeSnippet code="'danger'" type="inline" />, and <CodeSnippet
            code="'ghost'"
            type="inline"
        /> (minimal).
    </p>

    <div class="component-demo demo-button-group">
        <Button kind="primary">Primary</Button>
        <Button kind="secondary">Secondary</Button>
        <Button kind="tertiary">Tertiary</Button>
        <Button kind="danger">Danger</Button>
        <Button kind="ghost">Ghost</Button>
    </div>

    <CodeSnippet code={exampleCodeKinds} language="svelte" type="multi" />
</section>

<!-- Sizes Example Section -->
<section class="page-section">
    <h2>Sizes</h2>
    <p>
        Use the <CodeSnippet code="size" type="inline" /> prop to change the component's
        visual size. Available options are <CodeSnippet
            code="'sm'"
            type="inline"
        />, <CodeSnippet code="'md'" type="inline" /> (default), and <CodeSnippet
            code="'lg'"
            type="inline"
        />.
    </p>

    <div class="component-demo demo-button-group">
        <Button size="sm">Small</Button>
        <Button size="md">Medium (default)</Button>
        <Button size="lg">Large</Button>
    </div>

    <CodeSnippet code={exampleCodeSizes} language="svelte" type="multi" />
</section>

<!-- Icons Example Section -->
<section class="page-section">
    <h2>With icon</h2>
    <p>
        Provide a Svelte component to the <CodeSnippet
            code="icon"
            type="inline"
        /> prop to render an icon within the button, typically placed after the text
        content. Ensure the icon component is imported.
    </p>

    <div class="component-demo demo-button-group">
        <Button icon={Add}>Button with icon</Button>
        <Button kind="secondary" icon={Download}>Secondary with icon</Button>
    </div>

    <CodeSnippet code={exampleCodeIcons} language="svelte" type="multi" />
</section>

<!-- Icon Only Example Section -->
<section class="page-section">
    <h2>Icon only</h2>
    <p>
        Set <CodeSnippet code="hasIconOnly" type="inline" /> to <CodeSnippet
            code="true"
            type="inline"
        /> to create a button that contains only an icon. You must also provide an
        icon component via the <CodeSnippet code="icon" type="inline" /> prop and
        a textual description for accessibility using the <CodeSnippet
            code="iconDescription"
            type="inline"
        /> prop.
    </p>

    <div class="component-demo demo-button-group">
        <Button
            kind="ghost"
            icon={Settings}
            hasIconOnly
            iconDescription="Settings"
        />
        <Button
            kind="primary"
            icon={Settings}
            hasIconOnly
            iconDescription="Settings"
        />
        <Button
            kind="secondary"
            icon={Settings}
            hasIconOnly
            iconDescription="Settings"
            size="lg"
        />
        <Button
            kind="tertiary"
            icon={Settings}
            hasIconOnly
            iconDescription="Settings"
            size="sm"
        />
    </div>

    <CodeSnippet code={exampleCodeIconOnly} language="svelte" type="multi" />
</section>

<!-- States Example Section -->
<section class="page-section">
    <h2>States</h2>
    <p>
        Use the <CodeSnippet code="disabled" type="inline" /> boolean prop to disable
        the button. Disabled buttons are not interactive and have a distinct visual
        style.
    </p>

    <div class="component-demo">
        <div class="demo-button-group">
            <Button disabled>Disabled Primary</Button>
            <Button kind="secondary" disabled>Disabled Secondary</Button>
            <Button kind="danger" disabled>Disabled Danger</Button>
            <Button kind="ghost" disabled>Disabled Ghost</Button>
        </div>
        <div style="margin-top: 1.5rem;">
            <Button kind="primary" bind:disabled={isDisabled}>
                {isDisabled ? "Cannot click" : "Click to disable"}
            </Button>
            <label
                style="display: inline-flex; align-items: center; margin-left: 1rem; vertical-align: middle; cursor: pointer;"
            >
                <input
                    type="checkbox"
                    bind:checked={isDisabled}
                    style="margin-right: 0.5rem;"
                /> Disable Button
            </label>
        </div>
    </div>

    <CodeSnippet code={exampleCodeStates} language="svelte" type="multi" />
</section>

<!-- Link Example Section -->
<section class="page-section">
    <h2>As link</h2>
    <p>
        Provide a URL string to the <CodeSnippet code="href" type="inline" /> prop
        to render the button as an anchor (`<a
            >`) tag. Standard anchor attributes like <CodeSnippet
                code="target"
                type="inline"
            /> and <CodeSnippet code="rel" type="inline" /> can also be used.
        </a>
    </p>

    <div class="component-demo demo-button-group">
        <Button href="https://example.com" target="_blank">Link Button</Button>
        <Button href="/internal/path" kind="secondary">Internal Link</Button>
        <Button href="#" kind="tertiary" icon={Download}>Link with Icon</Button>
    </div>

    <CodeSnippet code={exampleCodeLink} language="svelte" type="multi" />
</section>

<!-- API Documentation Section -->
<section class="page-section">
    <h2>Component API</h2>

    <!-- Props Table using StructuredList -->
    <h3>Props</h3>
    <StructuredList ariaLabel="Component Props" border condensed>
        <svelte:fragment slot="header">
            <StructuredListHeader class="sl-cell--weight-1"
                >Name</StructuredListHeader
            >
            <StructuredListHeader class="sl-cell--weight-2"
                >Type</StructuredListHeader
            >
            <StructuredListHeader class="sl-cell--weight-1"
                >Default</StructuredListHeader
            >
            <StructuredListHeader class="sl-cell--weight-3"
                >Description</StructuredListHeader
            >
        </svelte:fragment>

        {#each propsData as prop (prop.name)}
            <StructuredListRow value={prop.name}>
                <StructuredListCell class="sl-cell--weight-1">
                    <CodeSnippet code={prop.name} type="inline" />
                </StructuredListCell>
                <StructuredListCell class="sl-cell--weight-2">
                    <CodeSnippet
                        code={prop.type}
                        type="inline"
                        language="typescript"
                    />
                </StructuredListCell>
                <StructuredListCell class="sl-cell--weight-1">
                    <CodeSnippet
                        code={prop.defaultVal}
                        type="inline"
                        language="javascript"
                    />
                </StructuredListCell>
                <StructuredListCell class="sl-cell--weight-3">
                    {@html prop.description}
                </StructuredListCell>
            </StructuredListRow>
        {/each}
    </StructuredList>

    <!-- Events Table using StructuredList -->
    <h3 style="margin-top: 2rem;">Events</h3>
    <StructuredList ariaLabel="Component Events" border condensed>
        <svelte:fragment slot="header">
            <StructuredListHeader class="sl-cell--weight-1"
                >Name</StructuredListHeader
            >
            <StructuredListHeader class="sl-cell--weight-2"
                >Detail</StructuredListHeader
            >
            <StructuredListHeader class="sl-cell--weight-3"
                >Description</StructuredListHeader
            >
        </svelte:fragment>

        {#each eventsData as event (event.name)}
            <StructuredListRow value={event.name}>
                <StructuredListCell class="sl-cell--weight-1">
                    <CodeSnippet code={event.name} type="inline" />
                </StructuredListCell>
                <StructuredListCell class="sl-cell--weight-2">
                    <CodeSnippet
                        code={event.detail}
                        type="inline"
                        language="typescript"
                    />
                </StructuredListCell>
                <StructuredListCell class="sl-cell--weight-3">
                    {@html event.description}
                </StructuredListCell>
            </StructuredListRow>
        {/each}
        {#if eventsData.length === 0}
            <StructuredListRow value="no-events">
                <StructuredListCell
                    ><i>No custom events documented.</i></StructuredListCell
                >
                <StructuredListCell></StructuredListCell>
                <StructuredListCell></StructuredListCell>
            </StructuredListRow>
        {/if}
    </StructuredList>
</section>

<!-- Accessibility Section -->
<section class="page-section">
    <h2>Accessibility</h2>
    <p>The Button component includes several accessibility features:</p>
    <ul>
        <li>
            Renders as semantic <code>&lt;button&gt;</code> or
            <code>&lt;a&gt;</code> elements.
        </li>
        <li>
            Uses <code>aria-disabled</code> attribute when the button is disabled.
        </li>
        <li>
            Requires <code>iconDescription</code> prop for icon-only buttons to
            provide an accessible name via <code>aria-label</code>.
        </li>
        <li>
            Maintains focus visibility using standard browser outlines,
            customized with theme variables.
        </li>
        <li>Fully keyboard navigable (Tab and Enter/Space).</li>
    </ul>
</section>

<style>
    /* --- Reusing styles from NumberInput example page --- */

    /* General Page Styles */
    h1 {
        margin-bottom: 1rem;
    }

    h2 {
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
        padding-bottom: 0.5rem;
    }

    h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
    }

    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    ul {
        margin-left: 1.5rem;
        margin-bottom: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }

    /* Section spacing */
    .page-section {
        margin-bottom: 3rem;
    }

    /* Component Description */
    .component-description {
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    /* Component Header Specific Styles */
    .component-header {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping on small screens */
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        font-size: 0.875rem; /* 14px */
        border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
        gap: 1rem; /* Add gap for wrapping */
    }

    .component-header .info {
        font-family: var(--nlds-font-sans, sans-serif);
        color: var(--nlds-text-secondary, #525252);
    }
    /* Ensure button doesn't shrink too much */
    .component-header :global(a.themed-btn) {
        /* Target the Button component */
        flex-shrink: 0;
    }

    /* Demo Area Styles */
    .component-demo {
        padding: 2rem;
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        border-radius: 0; /* Consistent with NumberInput example */
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: var(--nlds-bg-secondary, #f4f4f4);
    }

    /* --- Button Specific Demo Styles --- */
    /* Add spacing between buttons in demos */
    .demo-button-group {
        display: flex;
        flex-wrap: wrap; /* Allow buttons to wrap */
        gap: 0.75rem; /* Spacing between buttons */
        align-items: center; /* Align items vertically if they wrap */
    }

    /* API Docs Specific Styles (using StructuredList) - Copied from NumberInput */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
        min-width: 80px; /* Ensure minimum width for name/default */
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
        min-width: 150px; /* Ensure minimum width for type */
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
        min-width: 200px; /* Ensure minimum width for description */
    }

    /* Ensure inline code snippets fit well */
    :global(.sl-cell .ndsl-codesnippet--inline),
    :global(.sl-header-cell .ndsl-codesnippet--inline) {
        vertical-align: middle;
        /* Handle potential wrapping better */
        word-break: break-word;
        white-space: normal;
    }

    /* Adjustments for readability */
    :global(.sl-cell) {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
</style>
