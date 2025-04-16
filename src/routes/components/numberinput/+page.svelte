<script lang="ts">
    // Core Components
    import NumberInput from "$lib/components/NumberInput/NumberInput.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import CodeIcon from "~icons/carbon/code";
    import WarningIcon from "~icons/carbon/warning-alt";
    import ErrorIcon from "~icons/carbon/error";

    // Page specific state
    let demoValue = 0;
    let demoValueHelper = 0;
    let demoValueStep = 5;
    let demoValueEmpty: number | null = null;
    let demoValueInvalid = 25;
    let demoValueWarning = 80;

    // Example code snippets
    const exampleCodeDefault = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value = 0;
<\/script>

<NumberInput label="Clusters" bind:value min={0} max={20} />`;

    const exampleCodeHelper = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value = 0;
<\/script>

<NumberInput
  label="Replicas"
  bind:value
  helperText="Number of replicas for the service"
  min={1}
  max={10}
/>`;

    const exampleCodeSizes = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value1 = 0, value2 = 0, value3 = 0;
<\/script>

<NumberInput size="sm" label="Small size" bind:value={value1} />
<NumberInput size="md" label="Medium size (default)" bind:value={value2} />
<NumberInput size="lg" label="Large size" bind:value={value3} />`;

    const exampleCodeSteps = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value = 5;
<\/script>

<NumberInput
  label="Price"
  bind:value
  step={5}
  min={0}
  max={100}
  helperText="Increments by 5"
/>`;

    const exampleCodeStates = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let invalidValue = 25;
  let warningValue = 80;
<\/script>

<!-- Invalid state example -->
<NumberInput
  label="Processing units"
  bind:value={invalidValue}
  min={0}
  max={20}
  invalid={invalidValue > 20}
  invalidText="Value exceeds maximum of 20"
/>

<!-- Warning state example -->
<NumberInput
  label="Disk usage (%)"
  bind:value={warningValue}
  min={0}
  max={100}
  warn={warningValue > 70}
  warnText="High disk usage detected"
/>`;

    const exampleCodeOptions = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value1 = 0, value2 = 0;
<\/script>

<!-- Read-only example -->
<NumberInput
  label="Fixed allocation"
  value={10}
  readonly
  helperText="Cannot be modified"
/>

<!-- Disabled example -->
<NumberInput
  label="Disabled input"
  value={0}
  disabled
/>

<!-- Hide steppers example -->
<NumberInput
  label="Manual entry only"
  bind:value={value1}
  hideSteppers
/>

<!-- Hide label (still accessible to screen readers) -->
<NumberInput
  label="Hidden label"
  bind:value={value2}
  hideLabel
/>`;

    const exampleCodeEmpty = `<script>
  import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
  let value: number | null = null;
<\/script>

<NumberInput
  label="Optional quantity"
  bind:value
  noValueAllowed
  helperText="Leave empty or enter a number"
/>`;

    // API Data for StructuredList
    const propsData = [
        {
            name: "value",
            type: "number | null",
            defaultVal: "0",
            description:
                "Current numeric value. Can be `null` if `noValueAllowed` is true.",
        },
        {
            name: "label",
            type: "string",
            defaultVal: "''",
            description: "Input label text.",
        },
        {
            name: "helperText",
            type: "string",
            defaultVal: "''",
            description: "Optional text displayed below the input.",
        },
        {
            name: "min",
            type: "number | null",
            defaultVal: "null",
            description: "Minimum allowed value.",
        },
        {
            name: "max",
            type: "number | null",
            defaultVal: "null",
            description: "Maximum allowed value.",
        },
        {
            name: "step",
            type: "number",
            defaultVal: "1",
            description: "Increment/decrement step value.",
        },
        {
            name: "disabled",
            type: "boolean",
            defaultVal: "false",
            description: "Disables the input and steppers.",
        },
        {
            name: "readonly",
            type: "boolean",
            defaultVal: "false",
            description: "Makes the input read-only (steppers are hidden).",
        },
        {
            name: "hideLabel",
            type: "boolean",
            defaultVal: "false",
            description: "Visually hides the label (still accessible).",
        },
        {
            name: "hideSteppers",
            type: "boolean",
            defaultVal: "false",
            description: "Hides the increment/decrement buttons.",
        },
        {
            name: "size",
            type: "'sm' | 'md' | 'lg'",
            defaultVal: "'md'",
            description: "Sets the visual size of the input.",
        },
        {
            name: "light",
            type: "boolean",
            defaultVal: "false",
            description:
                "Applies the light variant for use on dark backgrounds.",
        },
        {
            name: "invalid",
            type: "boolean",
            defaultVal: "false",
            description: "Manually sets the invalid state.",
        },
        {
            name: "invalidText",
            type: "string",
            defaultVal: "''",
            description: "Text displayed below the input when invalid.",
        },
        {
            name: "warn",
            type: "boolean",
            defaultVal: "false",
            description:
                "Manually sets the warning state (ignored if invalid).",
        },
        {
            name: "warnText",
            type: "string",
            defaultVal: "''",
            description: "Text displayed below the input when warning.",
        },
        {
            name: "noValueAllowed",
            type: "boolean",
            defaultVal: "false",
            description: "Allows the input value to be `null` (cleared).",
        },
        {
            name: "id",
            type: "string",
            defaultVal: "'ni-...' (random)",
            description: "Unique ID for the input element.",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description: "Additional CSS classes for the wrapper element.",
        },
    ];

    const eventsData = [
        {
            name: "change",
            detail: "{ value: number | null }",
            description:
                "Fired when the value changes programmatically (via steppers) or loses focus after a change. Note: Native `input` event fires on every keystroke.",
        },
    ];
</script>

<!-- Page Title -->
<h1>NumberInput</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <!-- Use semantic time element if appropriate -->
            <time datetime="2025-04-15">Updated on 2025-04-15</time>
        </div>
        <!-- Use themed Button -->
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/NumberInput"
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
        The NumberInput component provides a controlled input field specifically
        designed for numerical values. It includes increment/decrement buttons
        (steppers), validation states, and supports various configurations to
        meet different UI requirements.
    </p>
</section>

<!-- Default Example Section -->
<section class="page-section">
    <h2>Default</h2>
    <p>
        This component requires a numerical value passed to the <CodeSnippet
            code="value"
            type="inline"
        /> prop. By default, the internal state manages the number based on user
        input and stepper interaction. Use <CodeSnippet
            code="bind:value"
            type="inline"
        /> for two-way binding in Svelte applications.
    </p>

    <div class="component-demo">
        <NumberInput label="Clusters" bind:value={demoValue} min={0} max={20} />
        <p class="demo-value">Bound value: {demoValue}</p>
    </div>

    <CodeSnippet code={exampleCodeDefault} language="javascript" type="multi" />
</section>

<!-- Helper Text Example Section -->
<section class="page-section">
    <h2>With helper text</h2>
    <p>
        Use the <CodeSnippet code="helperText" type="inline" /> prop to provide additional
        context below the input. This text guides users and explains the input's
        purpose.
    </p>
    <p>
        Note: Helper text is replaced by <CodeSnippet
            code="invalidText"
            type="inline"
        /> or <CodeSnippet code="warnText" type="inline" /> when those states are
        active.
    </p>

    <div class="component-demo">
        <NumberInput
            label="Replicas"
            bind:value={demoValueHelper}
            helperText="Number of replicas for the service"
            min={1}
            max={10}
        />
    </div>

    <CodeSnippet code={exampleCodeHelper} language="javascript" type="multi" />
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

    <div class="component-demo">
        <div class="demo-row">
            <NumberInput size="sm" label="Small size" value={0} />
        </div>
        <div class="demo-row">
            <NumberInput size="md" label="Medium size (default)" value={0} />
        </div>
        <div class="demo-row">
            <NumberInput size="lg" label="Large size" value={0} />
        </div>
    </div>

    <CodeSnippet code={exampleCodeSizes} language="javascript" type="multi" />
</section>

<!-- Step Example Section -->
<section class="page-section">
    <h2>Custom step</h2>
    <p>
        Use the <CodeSnippet code="step" type="inline" /> prop to define how much
        the value changes when using the increment/decrement steppers. The default
        step value is <CodeSnippet code={1} type="inline" />.
    </p>

    <div class="component-demo">
        <NumberInput
            label="Price"
            bind:value={demoValueStep}
            step={5}
            min={0}
            max={100}
            helperText="Increments by 5"
        />
        <p class="demo-value">Value: {demoValueStep}</p>
    </div>

    <CodeSnippet code={exampleCodeSteps} language="javascript" type="multi" />
</section>

<!-- Validation States Section -->
<section class="page-section">
    <h2>Validation states</h2>
    <p>
        Use <CodeSnippet code="invalid" type="inline" /> and <CodeSnippet
            code="invalidText"
            type="inline"
        />
        props to indicate error states. For less critical issues, use <CodeSnippet
            code="warn"
            type="inline"
        />
        and <CodeSnippet code="warnText" type="inline" /> props. Note that the invalid
        state takes precedence over the warning state.
    </p>

    <div class="component-demo">
        <div class="demo-row">
            <NumberInput
                label="Processing units"
                bind:value={demoValueInvalid}
                min={0}
                max={20}
                invalid={demoValueInvalid > 20}
                invalidText="Value exceeds maximum of 20"
            />
            <div class="status-indicator">
                {#if demoValueInvalid > 20}
                    <ErrorIcon class="icon-error" />
                    <span>Invalid: Value exceeds maximum</span>
                {/if}
            </div>
        </div>

        <div class="demo-row">
            <NumberInput
                label="Disk usage (%)"
                bind:value={demoValueWarning}
                min={0}
                max={100}
                warn={demoValueWarning > 70}
                warnText="High disk usage detected"
            />
            <div class="status-indicator">
                {#if demoValueWarning > 70}
                    <WarningIcon class="icon-warning" />
                    <span>Warning: High usage</span>
                {/if}
            </div>
        </div>
    </div>

    <CodeSnippet code={exampleCodeStates} language="javascript" type="multi" />
</section>

<!-- States and Options Section -->
<section class="page-section">
    <h2>States and options</h2>
    <p>
        The NumberInput component supports several interactive states and
        display options:
    </p>

    <div class="component-demo">
        <div class="demo-grid">
            <div>
                <NumberInput
                    label="Fixed allocation"
                    value={10}
                    readonly
                    helperText="Cannot be modified"
                />
                <p class="option-label">readonly</p>
            </div>

            <div>
                <NumberInput label="Disabled input" value={0} disabled />
                <p class="option-label">disabled</p>
            </div>

            <div>
                <NumberInput label="Manual entry only" value={0} hideSteppers />
                <p class="option-label">hideSteppers</p>
            </div>

            <div>
                <NumberInput label="Hidden label" value={0} hideLabel />
                <p class="option-label">hideLabel</p>
            </div>
        </div>
    </div>

    <CodeSnippet code={exampleCodeOptions} language="svelte" type="multi" />
</section>

<!-- Empty Value Section -->
<section class="page-section">
    <h2>Allowing empty values</h2>
    <p>
        Use <CodeSnippet code="noValueAllowed" type="inline" /> prop to allow the
        input to be empty (have a <CodeSnippet code="null" type="inline" /> value).
        This is useful for optional inputs where a number might not be required.
    </p>

    <div class="component-demo">
        <NumberInput
            label="Optional quantity"
            bind:value={demoValueEmpty}
            noValueAllowed
            helperText="Leave empty or enter a number"
        />
        <p class="demo-value">
            Value: {demoValueEmpty === null ? "null (empty)" : demoValueEmpty}
        </p>
    </div>

    <CodeSnippet code={exampleCodeEmpty} language="svelte" type="multi" />
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
    <p>The NumberInput component is designed with accessibility in mind:</p>
    <ul>
        <li>
            Uses native <code>input[type="number"]</code> for browser accessibility
            support
        </li>
        <li>
            All inputs are properly labeled (even when <code>hideLabel</code> is
            true)
        </li>
        <li>Error and warning messages are announced to screen readers</li>
        <li>Steppers are fully keyboard navigable</li>
        <li>Min/max constraints prevent invalid input</li>
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
        color: var(--nlds-text-secondary);
        font-family: var(--nlds-font-mono);
    }

    .demo-row {
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .demo-row:last-child {
        margin-bottom: 0;
    }

    .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    .option-label {
        font-size: 0.75rem;
        color: var(--nlds-text-secondary, #525252);
        margin-top: 0.5rem;
        font-family: var(--nlds-font-mono);
    }

    .status-indicator {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: var(--nlds-text-secondary);
    }

    .status-indicator :global(svg) {
        margin-right: 0.5rem;
    }

    .status-indicator :global(.icon-error) {
        color: var(--nlds-support-error, #da1e28);
    }

    .status-indicator :global(.icon-warning) {
        color: var(--nlds-support-warning, #f1c21b);
    }

    /* API Docs Specific Styles (using StructuredList) */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 0%;
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 0%;
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 0%;
    }

    /* Ensure inline code snippets fit well */
    :global(.sl-cell .ndsl-codesnippet--inline),
    :global(.sl-header-cell .ndsl-codesnippet--inline) {
        vertical-align: middle;
    }
</style>
