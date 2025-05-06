<script lang="ts">
    // Core Components
    import Select from "$lib/components/Select/Select.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import Code from "carbon-icons-svelte/lib/Code.svelte";

    // Page specific state
    let demoValueBasic: string | undefined = undefined;
    let demoValuePlaceholder: string | undefined = undefined;
    let demoValuePreselected: string | undefined = "option-2";
    let lastChangeEventValue: string | undefined | null = null;

    const demoOptions = [
        { value: "option-1", label: "Option 1" },
        { value: "option-2", label: "Option 2" },
        { value: "option-3", label: "Option 3 with longer text" },
        { value: "option-4", label: "Option 4" },
    ];

    const demoOptionsNumeric = [
        { value: 10, label: "Value 10" },
        { value: 20, label: "Value 20" },
        { value: 30, label: "Value 30" },
    ];
    let demoValueNumeric: number | undefined = 20;

    function handleDemoChange(event: CustomEvent<string | number>) {
        lastChangeEventValue = event.detail;
    }

    // Example code snippets
    const exampleCodeDefault = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  let value;
  const options = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ];
<\/script>

<label for="select-default">Choose an option:</label>
<Select id="select-default" {options} bind:value />`;

    const exampleCodePlaceholder = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  let value;
  const options = [
    { value: 'option-1', label: 'Option 1' },
    // ... other options
  ];
<\/script>

<label for="select-placeholder">Select with Placeholder:</label>
<Select
  id="select-placeholder"
  placeholder="-- Select an item --"
  {options}
  bind:value
/>`;

    const exampleCodePreselected = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  let value = 'option-2'; // Pre-select 'option-2'
  const options = [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    // ... other options
  ];
<\/script>

<label for="select-preselected">Pre-selected Value:</label>
<Select id="select-preselected" {options} bind:value />`;

    const exampleCodeDisabled = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  const options = [
    { value: 'option-1', label: 'Option 1' },
    // ... other options
  ];
<\/script>

<label for="select-disabled">Disabled Select:</label>
<Select
  id="select-disabled"
  value="option-1"
  {options}
  disabled
/>`;

    const exampleCodeNumeric = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  let numericValue = 20;
  const numericOptions = [
    { value: 10, label: 'Value 10' },
    { value: 20, label: 'Value 20' },
    { value: 30, label: 'Value 30' },
  ];
<\/script>

<label for="select-numeric">Numeric Values:</label>
<Select id="select-numeric" options={numericOptions} bind:value={numericValue} />
`;

    const exampleCodeEvent = `<script>
  import Select from '$lib/components/Select/Select.svelte';
  let value;
  let lastValue;
  const options = [ /* ... */ ];

  function handleChange(event) {
    // event.detail contains the selected value
    lastValue = event.detail;
  }
<\/script>

<label for="select-event">Listen to Change:</label>
<Select id="select-event" {options} bind:value on:change={handleChange} />
<p>Last value from change event: {lastValue ?? 'N/A'}</p>
`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "value",
            type: "string | number | undefined",
            defaultVal: "undefined",
            description:
                "The currently selected value. Use `bind:value` for two-way binding.",
        },
        {
            name: "options",
            type: "Array<{value: string | number, label: string}>",
            defaultVal: "[]",
            description:
                "An array of objects, each with `value` and `label` properties, to populate the dropdown.",
        },
        {
            name: "placeholder",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Optional text shown as the first, disabled option when no value is selected.",
        },
        {
            name: "id",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Optional ID for the `select` element, useful for associating with a `label`.",
        },
        {
            name: "name",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Optional `name` attribute for the `select` element, useful for form submissions.",
        },
        {
            name: "disabled",
            type: "boolean",
            defaultVal: "false",
            description:
                "If true, the select dropdown is disabled and cannot be interacted with.",
        },
        {
            name: "$$restProps",
            type: "HTMLSelectAttributes",
            defaultVal: "{}",
            description:
                "Allows forwarding any additional standard HTML attributes (e.g., `required`, `aria-label`) to the underlying `select` element.",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description:
                "Additional CSS classes to apply to the wrapper `div` element.",
        },
    ];

    const eventsData = [
        {
            name: "change",
            detail: "string | number | undefined", // The value of the selected option
            description:
                "Fired when the selected option changes. The `event.detail` contains the new `value`.",
        },
    ];
</script>

<!-- Page Title -->
<h1>Select</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <!-- Use semantic time element if appropriate -->
            <time datetime="2025-04-15">Updated on 2025-04-15</time>
        </div>
        <!-- Use themed Button -->
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/Select"
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
        The Select component provides a styled dropdown list, allowing users to
        choose one option from a predefined set. It wraps the native HTML <code
            >&lt;select&gt;</code
        > element, providing customization options like placeholders and easy data
        binding.
    </p>
</section>

<!-- Default Example Section -->
<section class="page-section">
    <h2>Default</h2>
    <p>
        Provide an array of objects to the <CodeSnippet
            code="options"
            type="inline"
        /> prop. Each object needs a unique <CodeSnippet
            code="value"
            type="inline"
        /> and a display <CodeSnippet code="label" type="inline" />. Use <CodeSnippet
            code="bind:value"
            type="inline"
        /> to track the selected value.
    </p>
    <div class="component-demo">
        <label for="select-basic" style="display: block; margin-bottom: 0.5rem;"
            >Choose an option:</label
        >
        <Select
            id="select-basic"
            options={demoOptions}
            bind:value={demoValueBasic}
        />
        <p class="demo-value">Bound value: {demoValueBasic ?? "undefined"}</p>
    </div>

    <CodeSnippet code={exampleCodeDefault} language="svelte" type="multi" />
</section>

<!-- Placeholder Example Section -->
<section class="page-section">
    <h2>With Placeholder</h2>
    <p>
        Use the <CodeSnippet code="placeholder" type="inline" /> prop to display
        instructional text when no option is initially selected. This placeholder
        acts as a disabled, hidden option once a real value is chosen.
    </p>

    <div class="component-demo">
        <label
            for="select-placeholder-demo"
            style="display: block; margin-bottom: 0.5rem;"
            >Select with Placeholder:</label
        >
        <Select
            id="select-placeholder-demo"
            placeholder="-- Select an item --"
            options={demoOptions}
            bind:value={demoValuePlaceholder}
        />
        <p class="demo-value">
            Bound value: {demoValuePlaceholder ?? "undefined"}
        </p>
    </div>

    <CodeSnippet code={exampleCodePlaceholder} language="svelte" type="multi" />
</section>

<!-- Pre-selected Value Example Section -->
<section class="page-section">
    <h2>Pre-selected Value</h2>
    <p>
        Initialize the bound <CodeSnippet code="value" type="inline" /> prop with
        one of the values from your <CodeSnippet code="options" type="inline" />
        array to have that option selected by default.
    </p>

    <div class="component-demo">
        <label
            for="select-preselected-demo"
            style="display: block; margin-bottom: 0.5rem;"
            >Pre-selected Value:</label
        >
        <Select
            id="select-preselected-demo"
            options={demoOptions}
            bind:value={demoValuePreselected}
        />
        <p class="demo-value">Bound value: {demoValuePreselected}</p>
    </div>

    <CodeSnippet code={exampleCodePreselected} language="svelte" type="multi" />
</section>

<!-- Numeric Values Example Section -->
<section class="page-section">
    <h2>Numeric Values</h2>
    <p>
        The <CodeSnippet code="value" type="inline" /> prop and option values can
        also be numbers. Ensure the bound variable's type matches.
    </p>

    <div class="component-demo">
        <label
            for="select-numeric-demo"
            style="display: block; margin-bottom: 0.5rem;"
            >Numeric Values:</label
        >
        <Select
            id="select-numeric-demo"
            options={demoOptionsNumeric}
            bind:value={demoValueNumeric}
        />
        <p class="demo-value">
            Bound value: {demoValueNumeric} (Type: {typeof demoValueNumeric})
        </p>
    </div>

    <CodeSnippet code={exampleCodeNumeric} language="svelte" type="multi" />
</section>

<!-- Disabled State Example Section -->
<section class="page-section">
    <h2>Disabled State</h2>
    <p>
        Set the <CodeSnippet code="disabled" type="inline" /> prop to <CodeSnippet
            code="true"
            type="inline"
        /> to prevent user interaction with the select component.
    </p>

    <div class="component-demo">
        <label
            for="select-disabled-demo"
            style="display: block; margin-bottom: 0.5rem;"
            >Disabled Select:</label
        >
        <Select
            id="select-disabled-demo"
            value="option-1"
            options={demoOptions}
            disabled
        />
    </div>

    <CodeSnippet code={exampleCodeDisabled} language="svelte" type="multi" />
</section>

<!-- Event Handling Example Section -->
<section class="page-section">
    <h2>Event Handling</h2>
    <p>
        Listen for the <CodeSnippet code="change" type="inline" /> event to react
        when the user selects a different option. The selected value is available
        in <CodeSnippet code="event.detail" type="inline" />.
    </p>

    <div class="component-demo">
        <label
            for="select-event-demo"
            style="display: block; margin-bottom: 0.5rem;"
            >Listen to Change:</label
        >
        <Select
            id="select-event-demo"
            options={demoOptions}
            placeholder="Select to trigger event"
            on:change={handleDemoChange}
        />
        <p class="demo-value">
            Last value from change event: {lastChangeEventValue ?? "N/A"}
        </p>
    </div>

    <CodeSnippet code={exampleCodeEvent} language="svelte" type="multi" />
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
                >Detail Type</StructuredListHeader
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
    <p>The Select component aims for accessibility:</p>
    <ul>
        <li>
            Uses a native <code>&lt;select&gt;</code> element, inheriting its accessibility
            features.
        </li>
        <li>
            Supports standard label association using the <CodeSnippet
                code="id"
                type="inline"
            /> prop and an external <code>&lt;label for="..."&gt;</code>.
        </li>
        <li>
            The custom dropdown arrow is decorative and hidden from screen
            readers using <CodeSnippet
                code="aria-hidden='true'"
                type="inline"
            />.
        </li>
        <li>
            Supports the <CodeSnippet code="disabled" type="inline" /> state.
        </li>
        <li>
            Additional accessibility attributes like <CodeSnippet
                code="aria-label"
                type="inline"
            /> or <CodeSnippet code="aria-labelledby" type="inline" /> can be passed
            via <CodeSnippet code="$$restProps" type="inline" />.
        </li>
    </ul>
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
        /* padding-bottom: 1rem; */
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

    .demo-value {
        margin-top: 1rem;
        font-size: 0.875rem;
        color: var(--nlds-text-secondary, #525252);
        font-family: var(--nlds-font-mono, monospace);
    }

    /* API Docs Specific Styles (using StructuredList) */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
        min-width: 80px; /* Prevent excessive shrinking */
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
        min-width: 150px;
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
        min-width: 200px;
    }

    /* Ensure inline code snippets fit well */
    :global(.sl-cell .ndsl-codesnippet--inline),
    :global(.sl-header-cell .ndsl-codesnippet--inline) {
        vertical-align: middle;
    }

    /* Add label styles if needed, adjust component width */
    .component-demo label {
        font-weight: 600;
        font-size: 0.875rem;
    }
    /* Ensure select doesn't take full width unless intended */
    .component-demo :global(.nlds-select-wrapper) {
        max-width: 300px; /* Example max width */
        width: 100%; /* Or set auto if you want it to shrink */
    }
</style>
