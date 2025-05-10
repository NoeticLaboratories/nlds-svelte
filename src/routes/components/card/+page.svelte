<script lang="ts">
    // Core Components
    import Card from "$lib/components/Card/Card.svelte";
    import Button from "$lib/components/Button/Button.svelte"; // For "Source code" link
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import Code from "carbon-icons-svelte/lib/Code.svelte";
    import Information from "carbon-icons-svelte/lib/Information.svelte"; // For an example
    import Launch from "carbon-icons-svelte/lib/Launch.svelte"; // For external link example

    // Example code snippets
    const exampleCodeBasic = `<script>
  import Card from '$lib/components/Card/Card.svelte';
<\/script>

<Card>
  <h4>Basic Card Title</h4>
  <p>This is some content within a basic card. It serves as a simple container for information, typically with a heading and some descriptive text.</p>
</Card>`;

    const exampleCodeClickable = `<script lang="ts">
  import Card from '$lib/components/Card/Card.svelte';
  import Information from "carbon-icons-svelte/lib/Information.svelte";

  function handleCardClick() {
    alert('Clickable card was activated!');
  }
<\/script>

<Card
  clickable
  on:click={handleCardClick}
  ariaLabel="View project statistics"
>
  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
    <Information size={24} />
    <h4 style="margin:0;">Project Statistics</h4>
  </div>
  <p>This card is interactive. Clicking it or pressing Enter/Space when focused will trigger an action. It uses an aria-label for better accessibility.</p>
</Card>`;

    const exampleCodeLink = `<script>
  import Card from '$lib/components/Card/Card.svelte';
  import Launch from "carbon-icons-svelte/lib/Launch.svelte";
<\/script>

<div class="demo-card-container">
  <Card href="/company/about-us" ariaLabel="Learn more about our company">
    <h4>About Us</h4>
    <p>Discover our mission, values, and the team behind our success. This entire card acts as an internal link.</p>
  </Card>

  <Card
    href="https://svelte.dev"
    target="_blank"
    ariaLabel="Visit Svelte.dev (opens in new tab)"
  >
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <h4>Svelte Framework
        <Launch size={16} style="margin-left: 0.25rem; vertical-align: middle;" />
      </h4>
    </div>
    <p>Explore the official Svelte website. This card links to an external site and opens in a new tab.</p>
  </Card>
</div>`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "href",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "If provided, renders the card as an anchor (`a`) tag. The card becomes fully interactive as a link.",
        },
        {
            name: "target",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Specifies the `target` attribute for the anchor (`a`) tag (only applies if `href` is set). Common values include `_blank`, `_self`, `_parent`, `_top`.",
        },
        {
            name: "rel",
            type: "string | undefined",
            defaultVal:
                "'noopener noreferrer' (if target='_blank' and `rel` is not provided)",
            description:
                "Specifies the `rel` attribute for the anchor (`a`) tag (only applies if `href` is set). Automatically defaults to `noopener noreferrer` if `target='_blank'` to enhance security.",
        },
        {
            name: "clickable",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true` and `href` is not set, the card (rendered as a `div`) becomes interactive: it's focusable, and emits a `click` event on mouse click or when the Enter/Space key is pressed while focused.",
        },
        {
            name: "ariaLabel",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Provides an accessible label for the card. This is crucial for interactive cards (link or clickable variants) where the visual content alone might not fully describe the card's purpose or the action it performs. The label is applied via `aria-label`.",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description:
                "Additional CSS classes to apply to the card's root element (`a` or `div`).",
        },
    ];

    const eventsData = [
        {
            name: "click",
            detail: "MouseEvent | KeyboardEvent",
            description:
                "Fired when an interactive card is activated. This applies if the card has an `href` (rendered as `a`) and is clicked, or if `clickable` is `true` (rendered as `div`) and it's clicked with a mouse or activated via keyboard (Enter or Space key).",
        },
    ];
</script>

<!-- Page Title -->
<h1>Card</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <time datetime="2025-05-10">Updated on 2025-05-10</time>
        </div>
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/Card"
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
        The Card component offers a versatile way to display content in a
        structured and visually appealing manner. Cards can group related
        information and actions, serving as static content containers,
        interactive clickable regions, or navigational links. They are
        fundamental for organizing UI elements into digestible blocks.
    </p>
</section>

<!-- Basic Usage Example Section -->
<section class="page-section">
    <h2>Basic Usage</h2>
    <p>
        By default, a Card is a non-interactive container. You can place any
        HTML content or Svelte components within it. It primarily uses CSS
        variables for styling, allowing easy theming.
    </p>
    <div class="component-demo">
        <Card>
            <h4>Basic Card Title</h4>
            <p>
                This is some content within a basic card. It serves as a simple
                container for information, typically with a heading and some
                descriptive text.
            </p>
        </Card>
    </div>
    <CodeSnippet code={exampleCodeBasic} language="svelte" type="multi" />
</section>

<!-- Clickable Card Example Section -->
<section class="page-section">
    <h2>Clickable Card</h2>
    <p>
        Set the <CodeSnippet code="clickable" type="inline" /> prop to <CodeSnippet
            code="true"
            type="inline"
        />
        to make the card interactive without being a link. Such cards become focusable,
        respond to keyboard events (Enter/Space), and dispatch a <CodeSnippet
            code="click"
            type="inline"
        /> event. It's highly recommended to provide an <CodeSnippet
            code="ariaLabel"
            type="inline"
        /> for accessibility.
    </p>
    <div class="component-demo">
        <Card
            clickable
            on:click={() => alert("Clickable card was activated!")}
            ariaLabel="View project statistics"
        >
            <div
                style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;"
            >
                <Information size={24} />
                <h4 style="margin:0;">Project Statistics</h4>
            </div>
            <p>
                This card is interactive. Clicking it or pressing Enter/Space
                when focused will trigger an action. It uses an aria-label for
                better accessibility.
            </p>
        </Card>
    </div>
    <CodeSnippet code={exampleCodeClickable} language="svelte" type="multi" />
</section>

<!-- Link Card Example Section -->
<section class="page-section">
    <h2>As Link</h2>
    <p>
        Provide a URL string to the <CodeSnippet code="href" type="inline" /> prop
        to render the card as an anchor (<CodeSnippet
            code="<a>"
            type="inline"
            language="html"
        />) tag. Standard anchor attributes like
        <CodeSnippet code="target" type="inline" /> and <CodeSnippet
            code="rel"
            type="inline"
        /> are also supported. An <CodeSnippet code="ariaLabel" type="inline" />
        is recommended for clarity.
    </p>
    <div class="component-demo demo-card-container">
        <Card href="/company/about-us" ariaLabel="Learn more about our company">
            <h4>About Us</h4>
            <p>
                Discover our mission, values, and the team behind our success.
                This entire card acts as an internal link.
            </p>
        </Card>

        <Card
            href="https://svelte.dev"
            target="_blank"
            ariaLabel="Visit Svelte.dev (opens in new tab)"
        >
            <div
                style="display: flex; justify-content: space-between; align-items: flex-start;"
            >
                <h4 style="margin-bottom: 0.5rem;">Svelte Framework</h4>
                <Launch
                    size={20}
                    style="margin-left: 0.5rem; color: var(--nlds-interactive-01, blue);"
                />
            </div>
            <p>
                Explore the official Svelte website. This card links to an
                external site and opens in a new tab.
            </p>
        </Card>
    </div>
    <CodeSnippet code={exampleCodeLink} language="svelte" type="multi" />
</section>

<!-- API Documentation Section -->
<section class="page-section">
    <h2>Component API</h2>

    <h3>Props</h3>
    <StructuredList ariaLabel="Card Component Props" border condensed>
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

    <h3 style="margin-top: 2rem;">Events</h3>
    <StructuredList ariaLabel="Card Component Events" border condensed>
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
                <StructuredListCell colspan="3">
                    <i>No custom events documented.</i>
                </StructuredListCell>
            </StructuredListRow>
        {/if}
    </StructuredList>
</section>

<!-- Accessibility Section -->
<section class="page-section">
    <h2>Accessibility</h2>
    <p>The Card component is designed with accessibility in mind:</p>
    <ul>
        <li>
            Renders as a semantic <CodeSnippet
                code="<div>"
                type="inline"
                language="html"
            />
            or an <CodeSnippet code="<a>" type="inline" language="html" /> element
            when an <CodeSnippet code="href" type="inline" /> is provided.
        </li>
        <li>
            Supports the <CodeSnippet code="ariaLabel" type="inline" /> prop to provide
            a descriptive label for interactive cards, enhancing understanding for
            screen reader users.
        </li>
        <li>
            Interactive cards (<CodeSnippet
                code="clickable={true}"
                type="inline"
            /> or with <CodeSnippet code="href" type="inline" />) are focusable
            and navigable using a keyboard. Clickable divs respond to Enter and
            Space keys.
        </li>
        <li>
            Maintains clear focus visibility using browser default outlines,
            styled via CSS variables (e.g., <CodeSnippet
                code="--nlds-card-focus-outline-color"
                type="inline"
            />).
        </li>
    </ul>
    <p>
        Always provide meaningful content or an <CodeSnippet
            code="ariaLabel"
            type="inline"
        /> for cards that perform an action or link to another resource to ensure
        they are understandable by all users.
    </p>
</section>

<style>
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

    /* Component Header */
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
    .component-header :global(a.themed-btn) {
        flex-shrink: 0;
    }

    /* Demo Area Styles */
    .component-demo {
        padding: 2rem;
        border: 1px solid var(--nlds-ui-border, #dfdfe3); /* Using a common border var */
        border-radius: var(
            --nlds-border-radius,
            0px
        ); /* Consistent with Card's default radius */
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: var(
            --nlds-layer-accent-01,
            #f4f4f4
        ); /* Using layers */
    }

    /* --- Card Specific Demo Styles --- */
    .demo-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
        gap: 1.5rem; /* Spacing between cards */
    }
    .demo-card-container > :global(.themed-card) {
        /* Styles for cards within the demo grid if needed, e.g., ensuring they don't get too wide if only one */
    }
    .demo-card-container h4,
    .component-demo {
        padding: 2rem;
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        border-radius: 0;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: var(--nlds-bg-tertirary, #f4f4f4);
    }

    /* API Docs Specific Styles (using StructuredList) - Copied from Button example */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
        min-width: 100px; /* Adjusted min-width */
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
        min-width: 180px; /* Adjusted min-width */
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
        min-width: 250px; /* Adjusted min-width */
    }
    :global(.sl-cell) :global(.ndsl-codesnippet--inline), /* Assuming ndsl- prefix from your snippet */
    :global(.sl-header-cell) :global(.ndsl-codesnippet--inline) {
        vertical-align: middle;
        word-break: break-word;
        white-space: normal;
    }
    :global(.sl-cell) {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
</style>
