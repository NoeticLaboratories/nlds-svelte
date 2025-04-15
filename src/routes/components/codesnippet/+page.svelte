<script lang="ts">
    // Core Components
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";
    import Button from "$lib/components/Button/Button.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import CodeIcon from "~icons/carbon/code"; // For source code button

    // Page specific state (example code snippets)
    const exampleCodeMulti = `<script lang="ts">
  import { writable } from 'svelte/store';

  export const count = writable(0);

  function increment() {
    count.update(n => n + 1);
  }
<\/script>

<h1>Counter</h1>
<p>Current count: {$count}</p>
<button on:click={increment}>Increment</button>
`;

    const exampleCodeSingle = `npm install @noeticlabs/nlds-svelte`;

    const exampleCodeInline = `bind:value`;

    const exampleCodeCss = `.my-class {
  color: var(--nlds-text-primary);
  background-color: var(--nlds-bg-secondary);
  padding: 1rem;
  border-radius: 0;
}`;

    const longLineCode =
        "This is a very long line of code that might need wrapping depending on the container width and the wrapText prop setting. It keeps going and going to demonstrate how wrapping works or how horizontal scrolling appears when wrapping is disabled.";

    const exampleCodeNoHighlight = `This text will not be highlighted.
It preserves formatting like
  indentation
and line breaks, but without syntax colors.`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "code",
            type: "string",
            defaultVal: "''",
            description: "The code content to display.",
        },
        {
            name: "language",
            type: "string",
            defaultVal: "'plaintext'",
            description:
                "The highlight.js language alias (e.g., 'javascript', 'css', 'svelte'). Falls back to 'plaintext' if the language is not registered or invalid.",
        },
        {
            name: "type",
            type: "'single' | 'multi' | 'inline'",
            defaultVal: "'multi'",
            description: "Determines the rendering style of the snippet.",
        },
        {
            name: "showMoreText",
            type: "string",
            defaultVal: "'Show more'",
            description:
                "Text for the button to expand a collapsed multi-line snippet.",
        },
        {
            name: "showLessText",
            type: "string",
            defaultVal: "'Show less'",
            description:
                "Text for the button to collapse an expanded multi-line snippet.",
        },
        {
            name: "copyButtonDescription",
            type: "string",
            defaultVal: "'Copy code'",
            description:
                "Accessibility label for the copy button (visible on hover/focus via tooltip).",
        },
        {
            name: "copyFeedback",
            type: "string",
            defaultVal: "'Copied!'",
            description: "Text shown in the tooltip after copying.",
        },
        {
            name: "copyTimeoutDuration",
            type: "number",
            defaultVal: "2000",
            description: "Duration (in ms) to show the copy feedback tooltip.",
        },
        {
            name: "maxLinesBeforeExpand",
            type: "number",
            defaultVal: "15",
            description:
                "For `type='multi'`, the maximum number of lines shown before collapsing. Set to `0` to disable collapsing.",
        },
        {
            name: "wrapText",
            type: "boolean",
            defaultVal: "false",
            description:
                "Whether to wrap long lines within the code snippet area (`type='multi'` or `'single'`).",
        },
        {
            name: "highlight",
            type: "boolean",
            defaultVal: "true",
            description:
                "Whether to apply syntax highlighting using highlight.js.",
        },
        {
            name: "expandedByDefault",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, multi-line snippets that exceed `maxLinesBeforeExpand` will be expanded initially.",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description:
                "Additional CSS classes to apply to the root element of the component.",
        },
    ];

    // CodeSnippet doesn't dispatch specific custom events beyond internal DOM events.
    const eventsData: any[] = [];
</script>

<!-- Page Title -->
<h1>CodeSnippet</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <!-- Use semantic time element if appropriate -->
            <time datetime="2025-04-15">Updated on 2025-04-15</time>
        </div>
        <!-- Use themed Button -->
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/CodeSnippet"
            kind="ghost"
            icon={CodeIcon}
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
        The CodeSnippet component is used to display blocks of code with syntax
        highlighting, line wrapping options, copy-to-clipboard functionality,
        and expansion for long snippets. It supports multi-line, single-line,
        and inline formats.
    </p>
</section>

<!-- Default (Multi-line) Example Section -->
<section class="page-section">
    <h2>Multi-line Snippet</h2>
    <p>
        The default <CodeSnippet code="type" type="inline" /> is <CodeSnippet
            code="'multi'"
            type="inline"
        />, suitable for displaying code blocks. It includes syntax highlighting
        (language auto-detection defaults to plaintext if not specified or
        invalid) and a copy button.
    </p>

    <div class="component-demo">
        <CodeSnippet code={exampleCodeMulti} language="svelte" />
    </div>

    <CodeSnippet
        code={`<CodeSnippet code={yourCodeString} language="svelte" />`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Single-line Example Section -->
<section class="page-section">
    <h2>Single-line Snippet</h2>
    <p>
        Set <CodeSnippet code="type='single'" type="inline" /> for displaying single
        lines of code, like commands or brief examples. It renders compactly and
        still includes the copy button. Text overflow is handled with ellipsis.
    </p>

    <div class="component-demo">
        <CodeSnippet code={exampleCodeSingle} language="bash" type="single" />
    </div>

    <CodeSnippet
        code={`<CodeSnippet code={commandString} language="bash" type="single" />`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Inline Example Section -->
<section class="page-section">
    <h2>Inline Snippet</h2>
    <p>
        Use <CodeSnippet code="type='inline'" type="inline" /> to display short code
        fragments within text, such as variable names or prop names like <CodeSnippet
            code="maxLinesBeforeExpand"
            type="inline"
        />. Inline snippets do not include a copy button or expansion features.
    </p>

    <div class="component-demo">
        <p>
            In Svelte, you often use
            <CodeSnippet
                code={exampleCodeInline}
                language="svelte"
                type="inline"
            />
            for two-way data binding. Make sure the
            <CodeSnippet code="language" type="inline" />
            prop is set correctly for highlighting.
        </p>
    </div>

    <CodeSnippet
        code={`Use <CodeSnippet code={'yourCode'} type="inline" /> within text.`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Language Highlighting Example -->
<section class="page-section">
    <h2>Language Highlighting</h2>
    <p>
        Specify the language using the <CodeSnippet
            code="language"
            type="inline"
        />
        prop (e.g., 'javascript', 'css', 'svelte', 'json', 'bash'). It uses highlight.js
        under the hood. If the language is omitted or not supported, it falls back
        to plaintext.
    </p>

    <div class="component-demo">
        <CodeSnippet code={exampleCodeCss} language="css" type="multi" />
    </div>

    <CodeSnippet
        code={`<CodeSnippet code={cssCode} language="css" />`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Expand/Collapse Example -->
<section class="page-section">
    <h2>Expandable Snippets</h2>
    <p>
        Multi-line snippets longer than <CodeSnippet
            code="maxLinesBeforeExpand"
            type="inline"
        />
        (default 15) will be collapsed, showing an expand button. Set <CodeSnippet
            code="maxLinesBeforeExpand={0}"
            type="inline"
        /> to disable collapsing. Use <CodeSnippet
            code="expandedByDefault={true}"
            type="inline"
        /> to make long snippets expanded initially.
    </p>

    <div class="component-demo">
        <CodeSnippet
            code={exampleCodeMulti}
            language="svelte"
            maxLinesBeforeExpand={5}
            showMoreText="View Full Code"
            showLessText="Collapse Code"
        />
    </div>

    <CodeSnippet
        code={`<CodeSnippet
  code={longCodeString}
  language="svelte"
  maxLinesBeforeExpand={5}
  showMoreText="View Full Code"
  showLessText="Collapse Code"
/>`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Text Wrapping Example -->
<section class="page-section">
    <h2>Text Wrapping</h2>
    <p>
        Set <CodeSnippet code="wrapText={true}" type="inline" /> to wrap long lines
        within the code snippet container. By default (<CodeSnippet
            code="wrapText={false}"
            type="inline"
        />), long lines will cause horizontal scrolling.
    </p>

    <div class="component-demo">
        <h3 class="demo-subtitle">Wrapping Enabled</h3>
        <CodeSnippet code={longLineCode} language="plaintext" wrapText={true} />

        <h3 class="demo-subtitle" style="margin-top: 1.5rem;">
            Wrapping Disabled (Default)
        </h3>
        <CodeSnippet
            code={longLineCode}
            language="plaintext"
            wrapText={false}
        />
    </div>

    <CodeSnippet
        code={`<CodeSnippet code={longLine} wrapText={true} />`}
        language="svelte"
        type="multi"
    />
</section>

<!-- Highlighting Disabled Example -->
<section class="page-section">
    <h2>Highlighting Disabled</h2>
    <p>
        Set <CodeSnippet code="highlight={false}" type="inline" /> to disable syntax
        highlighting. The code will be displayed as plain text but still retain its
        formatting and benefit from other features like copy and expand/collapse.
    </p>

    <div class="component-demo">
        <CodeSnippet code={exampleCodeNoHighlight} highlight={false} />
    </div>

    <CodeSnippet
        code={`<CodeSnippet code={plainCode} highlight={false} />`}
        language="svelte"
        type="multi"
    />
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

        {#if eventsData.length === 0}
            <StructuredListRow value="no-events">
                <StructuredListCell colspan={3}
                    ><i>No custom events documented.</i></StructuredListCell
                >
            </StructuredListRow>
        {:else}
            <!-- Loop through events if any were defined -->
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
        {/if}
    </StructuredList>
</section>

<!-- Accessibility Section -->
<section class="page-section">
    <h2>Accessibility</h2>
    <p>The CodeSnippet component aims for accessibility:</p>
    <ul>
        <li>
            The copy button includes an <CodeSnippet
                code="aria-label"
                type="inline"
            />
            (customizable via <CodeSnippet
                code="copyButtonDescription"
                type="inline"
            />) and provides feedback via a tooltip which is associated using
            `aria-describedby` when visible.
        </li>
        <li>
            The expand/collapse button's text changes to reflect its state (<CodeSnippet
                code="showMoreText"
                type="inline"
            /> / <CodeSnippet code="showLessText" type="inline" />).
        </li>
        <li>
            Code content is within <code>&lt;pre&gt;</code> and
            <code>&lt;code&gt;</code>
            tags for semantic correctness.
        </li>
        <li>Focus management is handled for interactive elements (buttons).</li>
        <li>
            Uses standard HTML elements ensuring basic screen reader
            compatibility.
        </li>
    </ul>
</section>

<style>
    /* General Page Styles (Copied from NumberInput example, uses NLDS vars) */
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
        border-radius: 0;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: var(--nlds-bg-secondary, #f4f4f4);
    }

    .demo-subtitle {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--nlds-text-secondary);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    /* API Docs Specific Styles (using StructuredList) */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
        min-width: 100px; /* Prevent extreme shrinking */
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
        min-width: 150px;
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
        min-width: 250px;
    }

    /* Ensure inline code snippets fit well */
    :global(.sl-cell .themed-cs--inline), /* Target specific component */
    :global(.sl-header-cell .themed-cs--inline) {
        vertical-align: middle;
        /* Prevent inline snippets from causing excessive line height */
        line-height: normal;
    }
</style>
