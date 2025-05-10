<!-- +page.svelte (or your specific route file for TextArea documentation) -->
<script lang="ts">
    // Core Components
    import TextArea from "$lib/components/TextArea/TextArea.svelte"; // Adjust path as needed
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";
    import Button from "$lib/components/Button/Button.svelte"; // For "Source code" button

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import Code from "carbon-icons-svelte/lib/Code.svelte";

    // Page specific state for interactive examples
    let basicValue = "This is some text in the textarea.";
    let placeholderValue = "";
    let helperTextValue = "This is some helpful guidance for the user.";
    let invalidTextValue = "This field has an error.";
    let isInvalid = false;
    let isDisabled = false;
    let isReadOnly = false;
    let counterValue = "Count me!";
    let enableCounter = true;
    let currentRows = 4;
    let currentMaxLength = 100;
    let labelTextContent = "Descriptive Label";
    let hideLabelStatus = false;

    // Example code snippets
    const exampleCodeBasic = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';
  let textValue = "Initial content here.";
<\/script>

<TextArea
  labelText="Comments"
  placeholder="Enter your comments..."
  bind:value={textValue}
/>`;

    const exampleCodeHelperInvalid = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';
  let feedback = "";
  let isContentInvalid = false;
  // Logic to set isContentInvalid based on validation...
<\/script>

<TextArea
  labelText="Your Feedback"
  bind:value={feedback}
  helperText="Please provide detailed feedback."
/>

<TextArea
  style="margin-top: 1rem;"
  labelText="Mandatory Feedback"
  bind:value={feedback}
  invalid={isContentInvalid}
  invalidText="This field cannot be empty and must be at least 10 characters."
  required
/>`;

    const exampleCodeStates = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';
<\/script>

<TextArea
  labelText="Disabled Textarea"
  value="You cannot edit this."
  disabled
/>

<TextArea
  style="margin-top: 1rem;"
  labelText="Read-only Textarea"
  value="You can select and copy this, but not edit."
  readonly
/>`;

    const exampleCodeSizingCounter = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';
  let description = "A short description.";
<\/script>

<TextArea
  labelText="Short Description (2 rows, 50 chars max)"
  bind:value={description}
  rows={2}
  maxlength={50}
  enableCounter
/>

<TextArea
  style="margin-top: 1rem;"
  labelText="Detailed Notes (6 rows, no counter)"
  rows={6}
/>`;

    const exampleCodeHideLabel = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';
<\/script>

<p id="visible-label-desc">This text acts as a visible label.</p>
<TextArea
  aria-labelledby="visible-label-desc"
  labelText="Alternative Text for Screen Readers"
  hideLabel
  placeholder="Textarea with programmatically associated label"
/>`;

    const exampleCodeInteractive = `<script lang="ts">
  import TextArea from '$lib/components/TextArea/TextArea.svelte';

  let myValue = "Try editing me!";
  let myLabel = "Interactive Demo";
  let myPlaceholder = "Type here...";
  let myHelper = "Helper text appears here.";
  let myInvalidMsg = "Something went wrong!";
  let myRows = 3;
  let myMaxlength = 75;
  let isMyInvalid = false;
  let isMyDisabled = false;
  let isMyReadonly = false;
  let showMyCounter = true;
  let hideMyLabel = false;
<\/script>

<!-- ... controls for these props ... -->

<TextArea
  bind:value={myValue}
  labelText={myLabel}
  placeholder={myPlaceholder}
  helperText={myHelper}
  invalid={isMyInvalid}
  invalidText={myInvalidMsg}
  disabled={isMyDisabled}
  readonly={isMyReadonly}
  rows={myRows}
  maxlength={myMaxlength}
  enableCounter={showMyCounter}
  hideLabel={hideMyLabel}
/>
`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "id",
            type: "string",
            defaultVal: "`themed-textarea-${random}`",
            description:
                "A unique ID for the textarea. Auto-generated if not provided. Used for `label` association.",
        },
        {
            name: "name",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "The `name` attribute for the textarea, used in form submissions.",
        },
        {
            name: "value",
            type: "string",
            defaultVal: `""`,
            description:
                "The current value of the textarea. Supports two-way binding (`bind:value`).",
        },
        {
            name: "placeholder",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Placeholder text to display when the textarea is empty.",
        },
        {
            name: "disabled",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, the textarea is disabled and cannot be interacted with.",
        },
        {
            name: "readonly",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, the textarea value cannot be changed, but can be selected and copied.",
        },
        {
            name: "rows",
            type: "number",
            defaultVal: "4",
            description:
                "Specifies the initial number of visible text lines for the textarea.",
        },
        {
            name: "maxlength",
            type: "number | undefined",
            defaultVal: "undefined",
            description:
                "The maximum number of characters allowed in the textarea.",
        },
        {
            name: "required",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, the textarea is marked as required for form submission (visual indicator and native validation).",
        },
        {
            name: "invalid",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, styles the textarea to indicate an invalid state. Requires `invalidText` for accessibility.",
        },
        {
            name: "invalidText",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Error message displayed below the textarea when `invalid` is `true`.",
        },
        {
            name: "helperText",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Optional helper text displayed below the textarea for guidance.",
        },
        {
            name: "labelText",
            type: "string",
            defaultVal: `""`,
            description:
                "The text content for the textarea's `<label>`. Essential for accessibility. Required unless `hideLabel` is true and an alternative labelling method (e.g. `aria-label`, `aria-labelledby`) is provided.",
        },
        {
            name: "hideLabel",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true`, the label is visually hidden but remains accessible to screen readers. `labelText` is still required.",
        },
        {
            name: "enableCounter",
            type: "boolean",
            defaultVal: "false",
            description:
                "If `true` and `maxlength` is set, displays a character counter (e.g., `current/max`).",
        },
        {
            name: "class",
            type: "string",
            defaultVal: `""`,
            description:
                "Additional CSS classes to apply to the root `div` wrapper of the component.",
        },
        {
            name: "textareaElement",
            type: "HTMLTextAreaElement | undefined",
            defaultVal: "undefined",
            description:
                "A Svelte binding that provides a direct reference to the underlying `HTMLTextAreaElement` (e.g., `bind:textareaElement`).",
        },
    ];

    const eventsData = [
        {
            name: "input",
            detail: "{ value: string; event: Event }",
            description:
                "Fired synchronously when the `value` of the textarea changes. `event.target.value` contains the new value.",
        },
        {
            name: "change",
            detail: "{ value: string; event: Event }",
            description:
                "Fired when the `value` changes and the element loses focus.",
        },
        {
            name: "focus",
            detail: "FocusEvent",
            description: "Fired when the textarea gains focus.",
        },
        {
            name: "blur",
            detail: "FocusEvent",
            description: "Fired when the textarea loses focus.",
        },
        {
            name: "keydown",
            detail: "KeyboardEvent",
            description: "Fired when a key is pressed down.",
        },
        {
            name: "keyup",
            detail: "KeyboardEvent",
            description: "Fired when a key is released.",
        },
        {
            name: "keypress",
            detail: "KeyboardEvent",
            description:
                "Fired when a key that produces a character value is pressed down (deprecated in favor of `beforeinput` or `keydown`).",
        },
    ];
</script>

<!-- Page Title -->
<h1>TextArea</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <time datetime="2024-03-10">Updated on 2024-03-10</time>
            <!-- UPDATE DATE -->
        </div>
        <Button
            href="https://github.com/YourOrg/YourRepo/tree/main/src/lib/components/TextArea/TextArea.svelte"
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
        The TextArea component provides a multi-line plain-text editing control.
        It's designed for collecting user-provided text, such as comments,
        descriptions, or longer messages. It includes features like labels,
        helper text, error states, character counters, and disabled/readonly
        modes, all built with accessibility in mind.
    </p>
</section>

<!-- Basic Usage Example Section -->
<section class="page-section">
    <h2>Basic Usage</h2>
    <p>
        A basic TextArea requires a <CodeSnippet
            code="labelText"
            type="inline"
        /> for accessibility. You can provide a <CodeSnippet
            code="placeholder"
            type="inline"
        /> and bind its content to a variable using <CodeSnippet
            code="bind:value"
            type="inline"
        />.
    </p>

    <div class="component-demo demo-column">
        <TextArea
            labelText="Your Comments"
            placeholder="Enter your comments here..."
            bind:value={basicValue}
        />
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">
            Current value: <em>{basicValue || "(empty)"}</em>
        </p>
    </div>

    <CodeSnippet code={exampleCodeBasic} language="svelte" type="multi" />
</section>

<!-- Helper and Invalid States Example Section -->
<section class="page-section">
    <h2>Helper and Invalid States</h2>
    <p>
        Provide <CodeSnippet code="helperText" type="inline" /> for guidance. Use
        the
        <CodeSnippet code="invalid" type="inline" /> boolean prop along with
        <CodeSnippet code="invalidText" type="inline" /> to indicate and describe
        input errors. The <CodeSnippet code="required" type="inline" /> prop adds
        a visual indicator to the label.
    </p>

    <div class="component-demo demo-column">
        <TextArea
            labelText="Share Your Thoughts"
            bind:value={placeholderValue}
            helperText={helperTextValue}
        />
        <div style="margin-top: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem;">
                <input type="checkbox" bind:checked={isInvalid} /> Toggle Invalid
                State
            </label>
            <TextArea
                labelText="Critical Information"
                bind:value={placeholderValue}
                invalid={isInvalid}
                invalidText={invalidTextValue}
                required
                placeholder="This field is important"
            />
        </div>
    </div>
    <CodeSnippet
        code={exampleCodeHelperInvalid}
        language="svelte"
        type="multi"
    />
</section>

<!-- Behavioral States (Disabled, Readonly) Example Section -->
<section class="page-section">
    <h2>Behavioral States</h2>
    <p>
        Set <CodeSnippet code="disabled" type="inline" /> to prevent interaction
        or
        <CodeSnippet code="readonly" type="inline" /> to make the content non-editable
        but still selectable and readable.
    </p>

    <div class="component-demo demo-column">
        <TextArea
            labelText="Disabled Field"
            value="Content here is not editable and non-interactive."
            disabled
        />
        <TextArea
            style="margin-top: 1rem;"
            labelText="Read-only Field"
            value="Content here can be read and copied, but not changed."
            readonly
        />
    </div>
    <CodeSnippet code={exampleCodeStates} language="svelte" type="multi" />
</section>

<!-- Sizing & Limits Example Section -->
<section class="page-section">
    <h2>Sizing & Limits</h2>
    <p>
        Control the initial visible height with the <CodeSnippet
            code="rows"
            type="inline"
        /> prop. Set a <CodeSnippet code="maxlength" type="inline" /> and optionally
        enable a character counter with <CodeSnippet
            code="enableCounter"
            type="inline"
        />. Textareas are typically resizable vertically by default.
    </p>

    <div class="component-demo demo-column">
        <TextArea
            labelText="Brief Summary (Max 50 chars)"
            bind:value={counterValue}
            rows={2}
            maxlength={50}
            enableCounter
        />
        <TextArea
            style="margin-top: 1rem;"
            labelText="Extensive Notes (6 rows)"
            placeholder="Enter detailed notes..."
            rows={6}
        />
    </div>
    <CodeSnippet
        code={exampleCodeSizingCounter}
        language="svelte"
        type="multi"
    />
</section>

<!-- Label Visibility Example Section -->
<section class="page-section">
    <h2>Label Visibility</h2>
    <p>
        While a visible <CodeSnippet code="labelText" type="inline" /> is strongly
        recommended for most cases, you can visually hide it using <CodeSnippet
            code="hideLabel={true}"
            type="inline"
        />. When doing so, <CodeSnippet code="labelText" type="inline" /> is still
        <em>required</em>
        to provide an accessible name for screen readers. Alternatively, ensure an
        accessible name is provided via
        <CodeSnippet code="aria-label" type="inline" /> or <CodeSnippet
            code="aria-labelledby"
            type="inline"
        /> passed through
        <CodeSnippet code="...$$restProps" type="inline" />.
    </p>
    <div class="component-demo demo-column">
        <p
            id="programmatic-label-for-textarea"
            style="font-weight: bold; margin-bottom: 0.25rem;"
        >
            A descriptive title for this textarea:
        </p>
        <TextArea
            labelText="Instructions (Hidden)"
            hideLabel
            placeholder="This textarea's label is visually hidden but accessible."
            aria-labelledby="programmatic-label-for-textarea"
        />
    </div>
    <CodeSnippet code={exampleCodeHideLabel} language="svelte" type="multi" />
</section>

<!-- Interactive Demo Section (Optional but good) -->
<section class="page-section">
    <h2>Interactive Playground</h2>
    <p>Experiment with various props to see their combined effect.</p>
    <div class="component-demo demo-interactive-grid">
        <div class="controls">
            <label
                >Label Text: <input
                    type="text"
                    bind:value={labelTextContent}
                /></label
            >
            <label
                >Placeholder: <input
                    type="text"
                    bind:value={placeholderValue}
                /></label
            >
            <label
                >Helper Text: <input
                    type="text"
                    bind:value={helperTextValue}
                /></label
            >
            <label
                >Invalid Text: <input
                    type="text"
                    bind:value={invalidTextValue}
                /></label
            >
            <label
                >Rows: <input
                    type="number"
                    bind:value={currentRows}
                    min="1"
                    max="10"
                /></label
            >
            <label
                >Max Length: <input
                    type="number"
                    bind:value={currentMaxLength}
                    min="0"
                /></label
            >
            <label
                ><input type="checkbox" bind:checked={isInvalid} /> Invalid</label
            >
            <label
                ><input type="checkbox" bind:checked={isDisabled} /> Disabled</label
            >
            <label
                ><input type="checkbox" bind:checked={isReadOnly} /> ReadOnly</label
            >
            <label
                ><input type="checkbox" bind:checked={enableCounter} /> Enable Counter</label
            >
            <label
                ><input type="checkbox" bind:checked={hideLabelStatus} /> Hide Label</label
            >
        </div>
        <div class="output">
            <TextArea
                labelText={labelTextContent}
                placeholder={placeholderValue}
                helperText={helperTextValue}
                invalid={isInvalid}
                invalidText={invalidTextValue}
                disabled={isDisabled}
                readonly={isReadOnly}
                rows={currentRows}
                maxlength={currentMaxLength || undefined}
                {enableCounter}
                hideLabel={hideLabelStatus}
                bind:value={basicValue}
            />
        </div>
    </div>
    <CodeSnippet code={exampleCodeInteractive} language="svelte" type="multi" />
</section>

<!-- API Documentation Section -->
<section class="page-section">
    <h2>Component API</h2>

    <h3>Props</h3>
    <StructuredList ariaLabel="TextArea Component Props" border condensed>
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
    <StructuredList ariaLabel="TextArea Component Events" border condensed>
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
    </StructuredList>
</section>

<!-- Accessibility Section -->
<section class="page-section">
    <h2>Accessibility</h2>
    <p>The TextArea component adheres to accessibility best practices:</p>
    <ul>
        <li>
            <strong>Labeling:</strong> The <CodeSnippet
                code="labelText"
                type="inline"
            /> prop is crucial for associating a descriptive label with the textarea,
            announced by screen readers. If the label is visually hidden via <CodeSnippet
                code="hideLabel"
                type="inline"
            />, the `labelText` still provides this accessible name.
            Alternatively, `aria-label` or `aria-labelledby` can be passed.
        </li>
        <li>
            <strong>States:</strong> Uses <CodeSnippet
                code="aria-invalid"
                type="inline"
            /> when the <CodeSnippet code="invalid" type="inline" /> prop is true.
            The <CodeSnippet code="disabled" type="inline" /> and <CodeSnippet
                code="readonly"
                type="inline"
            /> attributes are applied natively.
        </li>
        <li>
            <strong>Error & Helper Text:</strong>
            <CodeSnippet code="invalidText" type="inline" /> and <CodeSnippet
                code="helperText"
                type="inline"
            /> are linked to the textarea via <CodeSnippet
                code="aria-describedby"
                type="inline"
            /> for screen readers to announce.
        </li>
        <li>
            <strong>Keyboard Navigation:</strong> Fully navigable and operable using
            a keyboard.
        </li>
        <li>
            <strong>Focus Indication:</strong> Clear focus styles are applied to
            the textarea when it receives focus.
        </li>
        <li>
            <strong>Required Fields:</strong> The <CodeSnippet
                code="required"
                type="inline"
            /> prop correctly sets the native HTML attribute and adds a visual indicator
            (asterisk) if the label is visible.
        </li>
    </ul>
    <p>
        Ensure that <CodeSnippet code="invalidText" type="inline" /> provides a clear
        and actionable message when <CodeSnippet code="invalid" type="inline" />
        is true. Always provide meaningful <CodeSnippet
            code="labelText"
            type="inline"
        />.
    </p>
</section>

<style>
    /* --- Reusing styles from Button/NumberInput example page --- */
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

    .page-section {
        margin-bottom: 3rem;
    }
    .component-description {
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    .component-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
        gap: 1rem;
    }
    .component-header .info {
        font-family: var(--nlds-font-sans, sans-serif);
        color: var(--nlds-text-secondary, #525252);
    }
    .component-header :global(a.themed-btn) {
        flex-shrink: 0;
    }

    .component-demo {
        padding: 2rem;
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        border-radius: 0;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: var(--nlds-bg-secondary, #f4f4f4);
    }

    /* --- TextArea Specific Demo Styles --- */
    .demo-column :global(.themed-form-item) + :global(.themed-form-item), /* Target direct TextArea components */
    .demo-column :global(.themed-form-item + div) {
        /* Target wrapper around a TextArea */
        margin-top: 1.5rem;
    }
    .demo-column div + :global(.themed-form-item) {
        /* Target TextArea after a div (like the checkbox wrapper) */
        margin-top: 1.5rem;
    }

    .demo-interactive-grid {
        display: grid;
        grid-template-columns: 1fr; /* Stack on small screens */
        gap: 2rem;
    }
    @media (min-width: 768px) {
        /* md breakpoint or similar */
        .demo-interactive-grid {
            grid-template-columns: auto 1fr; /* Controls take auto width, output takes rest */
        }
    }
    .demo-interactive-grid .controls {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .demo-interactive-grid .controls label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }
    .demo-interactive-grid .controls input[type="text"],
    .demo-interactive-grid .controls input[type="number"] {
        padding: 0.375rem 0.5rem;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 0.875rem;
        flex-grow: 1; /* Allow text inputs to grow */
    }

    /* API Docs Specific Styles (using StructuredList) */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
        min-width: 100px;
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
        min-width: 180px;
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
        min-width: 220px;
    }

    :global(.sl-cell .ndsl-codesnippet--inline),
    :global(.sl-header-cell .ndsl-codesnippet--inline) {
        vertical-align: middle;
        word-break: break-word;
        white-space: normal;
    }
    :global(.sl-cell) {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
</style>
