<script lang="ts">
    // Core Components
    import Card from "$lib/components/Card/Card.svelte"; // Used for structuring demo sections, optional
    import Button from "$lib/components/Button/Button.svelte"; // For "Source code" link
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // TextInput Component (the one being documented)
    import TextInput from "$lib/components/TextInput/TextInput.svelte";

    // StructuredList Components for API Docs
    import StructuredList from "$lib/components/StructuredList/StructuredList.svelte";
    import StructuredListRow from "$lib/components/StructuredList/StructuredListRow.svelte";
    import StructuredListCell from "$lib/components/StructuredList/StructuredListCell.svelte";
    import StructuredListHeader from "$lib/components/StructuredList/StructuredListHeader.svelte";

    // Icons
    import Code from "carbon-icons-svelte/lib/Code.svelte";

    // --- State for Interactive Demos ---
    let basicValue = "Initial Svelte content";
    let attributedValue = "";
    let eventTrackValue = "Test events here";
    let lastEventType = "none";
    let lastEventDetail: string | undefined = "";

    function handleInputDemo(event: CustomEvent<string>) {
        // bind:value already updates eventTrackValue
        lastEventType = "input";
        lastEventDetail = event.detail;
    }

    function handleChangeDemo(event: CustomEvent<string>) {
        lastEventType = "change";
        lastEventDetail = event.detail;
        // Example: alert(`TextInput value committed: ${event.detail}`);
        console.log(`TextInput value committed: ${event.detail}`);
    }

    function handleFocusDemo(event: FocusEvent) {
        console.log("TextInput focused:", event.target);
        lastEventType = "focus";
        lastEventDetail = (event.target as HTMLInputElement).value;
    }

    function handleBlurDemo(event: FocusEvent) {
        console.log("TextInput blurred:", event.target);
        lastEventType = "blur";
        lastEventDetail = (event.target as HTMLInputElement).value;
    }

    // --- Example Code Snippets ---
    const exampleCodeBasic = `<script lang="ts">
  import TextInput from '$lib/components/TextInput/TextInput.svelte';
  let textValue = "Initial Svelte content";
<\/script>

<label for="basic-example-input">Basic Input:</label>
<TextInput id="basic-example-input" bind:value={textValue} />
<p>Current value: {textValue}</p>`;

    const exampleCodeAttributes = `<script lang="ts">
  import TextInput from '$lib/components/TextInput/TextInput.svelte';
  let userValue = "";
<\/script>

<label for="user-attribute-input">Username:</label>
<TextInput
  id="user-attribute-input"
  name="username"
  bind:value={userValue}
  placeholder="e.g., svelte_dev_01"
  aria-describedby="username-hint-doc"
  maxlength={20}
  required
/>
<small id="username-hint-doc" style="display: block; margin-top: 0.25rem;">
  Max 20 characters. Required.
</small>
<p>Value: {userValue}</p>`;

    const exampleCodeDisabled = `<script lang="ts">
  import TextInput from '$lib/components/TextInput/TextInput.svelte';
<\/script>

<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <TextInput value="This content cannot be edited" disabled id="disabled-text-example-1" />
  <TextInput placeholder="Disabled input with placeholder" disabled id="disabled-text-example-2" />
</div>`;

    const exampleCodeEvents = `<script lang="ts">
  import TextInput from '$lib/components/TextInput/TextInput.svelte';

  let liveValue = "Test me";
  let latestEventType = "none";
  let latestEventData: string | undefined = "";

  function onInput(event: CustomEvent<string>) {
    // bind:value handles updating 'liveValue'
    latestEventType = "input";
    latestEventData = event.detail; // TextInput dispatches the value as detail
  }

  function onChange(event: CustomEvent<string>) {
    latestEventType = "change";
    latestEventData = event.detail;
    console.log(\`Change Event: Value committed - \${event.detail}\`);
  }

  function onFocus(event: FocusEvent) {
    latestEventType = "focus";
    latestEventData = (event.target as HTMLInputElement).value;
    console.log("Input focused:", event.target);
  }

  function onBlur(event: FocusEvent) {
    latestEventType = "blur";
    latestEventData = (event.target as HTMLInputElement).value;
    console.log("Input blurred:", event.target);
  }
<\/script>

<label for="event-handling-example">Interactive Input:</label>
<TextInput
  id="event-handling-example"
  bind:value={liveValue}
  on:input={onInput}
  on:change={onChange}
  on:focus={onFocus}
  on:blur={onBlur}
  placeholder="Type and observe events in console"
/>
<p style="margin-top: 0.5rem;">
  Live value: <strong>{liveValue}</strong>
</p>
<p>
  Last event: <code>{latestEventType}</code>,
  Value at event time: <code>{latestEventData}</code>
</p>`;

    // --- API Data for StructuredList ---
    const propsData = [
        {
            name: "value",
            type: "string",
            defaultVal: "''",
            description:
                "The current value of the text input. Supports two-way binding with 'bind:value'.",
        },
        {
            name: "placeholder",
            type: "string",
            defaultVal: "''",
            description: "Placeholder text to display when the input is empty.",
        },
        {
            name: "id",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "Unique identifier for the input element. Essential for associating with a 'label' element for accessibility.",
        },
        {
            name: "name",
            type: "string | undefined",
            defaultVal: "undefined",
            description:
                "The name attribute for the input element, useful for traditional form submission.",
        },
        {
            name: "disabled",
            type: "boolean",
            defaultVal: "false",
            description:
                "If 'true', the input is disabled, preventing user interaction and styling it accordingly.",
        },
        {
            name: "class",
            type: "string",
            defaultVal: "''",
            description:
                "Additional CSS classes to apply to the root 'input' element. The base class 'nlds-text-input' is always applied internally.",
        },
    ];

    const eventsData = [
        {
            name: "input",
            detail: "string",
            description:
                "Fired synchronously whenever the input's 'value' changes. The event's 'detail' property contains the new string value.",
        },
        {
            name: "change",
            detail: "string",
            description:
                "Fired when the value of the input is committed by the user (typically on blur or when Enter is pressed, browser-dependent). The event's 'detail'property contains the committed string value.",
        },
        {
            name: "focus",
            detail: "FocusEvent",
            description:
                "Fired when the input element gains focus. The event object is the native 'FocusEvent'.",
        },
        {
            name: "blur",
            detail: "FocusEvent",
            description:
                "Fired when the input element loses focus. The event object is the native 'FocusEvent'.",
        },
    ];
</script>

<!-- Page Title -->
<h1>Text Input</h1>

<!-- Header Section -->
<section class="page-section">
    <div class="component-header">
        <div class="info">
            <time datetime="2025-05-10">Updated on 2025-05-10</time>
        </div>
        <Button
            href="https://github.com/NoeticLaboratories/nlds-svelte/tree/main/src/lib/components/TextInput"
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
        The TextInput component provides a standard single-line input field for
        users to enter and edit text. It's a fundamental form control built upon
        the native HTML <CodeSnippet
            code="<input type='text' />"
            type="inline"
            language="html"
        /> element, offering support for placeholders, disabled states, common input
        events, and easy data binding.
    </p>
    <p>
        Its appearance is styled using CSS custom properties (e.g., <CodeSnippet
            code="--nlds-input-text"
            type="inline"
        />, <CodeSnippet code="--nlds-input-bg" type="inline" />, allowing for
        straightforward theming and integration into various design systems.
    </p>
</section>

<!-- Basic Usage Example Section -->
<section class="page-section">
    <h2>Basic Usage</h2>
    <p>
        A simple text input can be created by binding a variable to its <code
            >value</code
        >
        prop using Svelte's <code>bind:value</code> directive. Always associate
        a <CodeSnippet code="<label />" type="inline" language="html" /> with your
        input using the <code>id</code>
        prop for accessibility.
    </p>
    <div class="component-demo">
        <label
            for="basic-demo-input"
            style="display: block; margin-bottom: 0.25rem;">Your Name:</label
        >
        <TextInput id="basic-demo-input" bind:value={basicValue} />
        <p style="margin-top: 0.5rem;">
            Bound value: <code>{basicValue}</code>
        </p>
    </div>
    <CodeSnippet code={exampleCodeBasic} language="svelte" type="multi" />
</section>

<!-- Attributes and Placeholder Example Section -->
<section class="page-section">
    <h2>Attributes and Placeholder</h2>
    <p>
        Utilize props like <CodeSnippet code="placeholder" type="inline" /> for hint
        text,
        <CodeSnippet code="id" type="inline" />
        for label association, and <CodeSnippet code="name" type="inline" /> for
        form submissions. Other standard HTML input attributes (e.g.,
        <CodeSnippet code="'maxlength'" type="inline" />,
        <CodeSnippet code="'required'" type="inline" />, <CodeSnippet
            code="'pattern'"
            type="inline"
        />,
        <CodeSnippet code="'aria-describedby'" type="inline" />) can be passed
        directly and will be applied to the underlying <CodeSnippet
            code="<input />"
            type="inline"
            language="html"
        /> element.
    </p>
    <div class="component-demo">
        <label
            for="attr-demo-input"
            style="display: block; margin-bottom: 0.25rem;">Username:</label
        >
        <TextInput
            id="attr-demo-input"
            name="username"
            bind:value={attributedValue}
            placeholder="e.g., svelte_user_123"
            aria-describedby="username-hint-demo"
            maxlength={20}
            required
        />
        <small
            id="username-hint-demo"
            style="display: block; margin-top: 0.25rem; color: var(--nlds-text-secondary, #525252);"
        >
            Max 20 characters. This field is required.
        </small>
        <p style="margin-top: 0.5rem;">
            Current value: <code>{attributedValue}</code>
        </p>
    </div>
    <CodeSnippet code={exampleCodeAttributes} language="svelte" type="multi" />
</section>

<!-- Disabled State Example Section -->
<section class="page-section">
    <h2>Disabled State</h2>
    <p>
        Set the <code>disabled</code> prop to <code>true</code> to prevent user interaction.
        The input will be visually styled as disabled and will not be focusable or
        editable.
    </p>
    <div class="component-demo">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <label
                    for="disabled-demo-1"
                    style="display: block; margin-bottom: 0.25rem;"
                    >Disabled with value:</label
                >
                <TextInput
                    value="You can't change this"
                    disabled
                    id="disabled-demo-1"
                />
            </div>
            <div>
                <label
                    for="disabled-demo-2"
                    style="display: block; margin-bottom: 0.25rem;"
                    >Disabled with placeholder:</label
                >
                <TextInput
                    placeholder="Also disabled"
                    disabled
                    id="disabled-demo-2"
                />
            </div>
        </div>
    </div>
    <CodeSnippet code={exampleCodeDisabled} language="svelte" type="multi" />
</section>

<!-- Event Handling Example Section -->
<section class="page-section">
    <h2>Event Handling</h2>
    <p>
        The TextInput component forwards common input events: <CodeSnippet
            code="input"
            type="inline"
        />, <CodeSnippet code="change" type="inline" />, <CodeSnippet
            code="focus"
            type="inline"
        />, and
        <CodeSnippet code="blur" type="inline" />. The
        <CodeSnippet code="input" type="inline" />
        and <CodeSnippet code="change" type="inline" /> events are dispatched as
        Svelte custom events, with the current input value available in <CodeSnippet
            code="event.detail"
            type="inline"
        />. The
        <CodeSnippet code="focus" type="inline" />
        and <CodeSnippet code="blur" type="inline" /> events are the native DOM events.
    </p>
    <div class="component-demo">
        <label
            for="event-demo-input"
            style="display: block; margin-bottom: 0.25rem;"
            >Interactive Input:</label
        >
        <TextInput
            id="event-demo-input"
            bind:value={eventTrackValue}
            on:input={handleInputDemo}
            on:change={handleChangeDemo}
            on:focus={handleFocusDemo}
            on:blur={handleBlurDemo}
            placeholder="Type and observe events (check console too)"
        />
        <p style="margin-top: 0.5rem;">
            Live value: <strong>{eventTrackValue}</strong>
        </p>
        <p>
            Last event: <code>{lastEventType}</code>, Value at event time:
            <code>{lastEventDetail ?? "N/A"}</code>
        </p>
    </div>
    <CodeSnippet code={exampleCodeEvents} language="svelte" type="multi" />
</section>

<!-- API Documentation Section -->
<section class="page-section">
    <h2>Component API</h2>
    <p>
        The TextInput component primarily uses the native <CodeSnippet
            code="<input type='text' />"
            type="inline"
            language="html"
        />
        element. Any additional attributes not listed below (e.g.,
        <CodeSnippet code="'maxlength'" type="inline" />, <CodeSnippet
            code="'required'"
            type="inline"
        />,
        <CodeSnippet code="'pattern'" type="inline" />, <CodeSnippet
            code="'aria-label'"
            type="inline"
        />,
        <CodeSnippet code="'aria-describedby'" type="inline" />, etc.) are
        passed directly to the underlying <CodeSnippet
            code="<input />"
            type="inline"
            language="hml"
        /> element via Svelte's
        <CodeSnippet code="'$$restProps'" type="inline" />.
    </p>

    <h3>Props</h3>
    <StructuredList ariaLabel="Text Input Component Props" border condensed>
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
    <StructuredList ariaLabel="Text Input Component Events" border condensed>
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
    </StructuredList>
</section>

<!-- Accessibility Section -->
<section class="page-section">
    <h2>Accessibility</h2>
    <p>The TextInput component adheres to accessibility best practices:</p>
    <ul>
        <li>
            Renders as a semantic <CodeSnippet
                code="<input type='text'>"
                type="inline"
                language="html"
            /> element.
        </li>
        <li>
            It is crucial to provide a visible <CodeSnippet
                code="<label>"
                type="inline"
                language="html"
            /> associated with the input using the <code>id</code> prop and the
            label's <code>for</code> attribute. Example: <CodeSnippet
                code="<label for='my-input'>My Label</label><TextInput id='my-input' />"
                type="inline"
                language="html"
            />.
        </li>
        <li>
            If a visible label is not feasible, use an <CodeSnippet
                code="aria-label"
                type="inline"
            /> attribute passed directly to the component to provide an accessible
            name.
        </li>
        <li>
            Additional ARIA attributes like <CodeSnippet
                code="aria-describedby"
                type="inline"
            />, <CodeSnippet code="aria-invalid" type="inline" />, or <CodeSnippet
                code="aria-required"
                type="inline"
            /> can be passed as props to further enhance accessibility and convey
            state or input requirements to assistive technologies.
        </li>
        <li>
            The <code>disabled</code> prop correctly sets the native
            <code>disabled</code> attribute on the input, making it inaccessible
            to users and assistive technologies as expected.
        </li>
        <li>
            Maintains clear focus visibility using browser default outlines,
            styled via the <code>.nlds-text-input:focus</code> CSS rule and
            associated CSS custom properties (e.g., <CodeSnippet
                code="--nlds-input-focus-border"
                type="inline"
            />).
        </li>
    </ul>
    <p>
        Always ensure that text inputs have proper labels and, if necessary,
        descriptive helper text (linked via <CodeSnippet
            code="aria-describedby"
            type="inline"
        />) to provide context for all users.
    </p>
</section>

<style>
    /* --- General Page Styles (mostly reused from Card/Button examples) --- */
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
        /* Assuming Button has .themed-btn */
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

    /* API Docs Specific Styles (StructuredList) - Copied & potentially adjusted from Button/Card example */
    :global(.sl-cell.sl-cell--weight-1),
    :global(.sl-header-cell.sl-cell--weight-1) {
        flex: 1 1 120px; /* Name, Default */
        min-width: 120px;
    }
    :global(.sl-cell.sl-cell--weight-2),
    :global(.sl-header-cell.sl-cell--weight-2) {
        flex: 2 1 180px; /* Type, Detail Type */
        min-width: 180px;
    }
    :global(.sl-cell.sl-cell--weight-3),
    :global(.sl-header-cell.sl-cell--weight-3) {
        flex: 3 1 300px; /* Description */
        min-width: 300px;
    }
    :global(.sl-cell) :global(.ndsl-codesnippet--inline), /* Assuming CodeSnippet applies .ndsl-codesnippet--inline */
    :global(.sl-header-cell) :global(.ndsl-codesnippet--inline) {
        vertical-align: middle;
        word-break: break-word;
        white-space: normal; /* Allow wrapping for long types */
    }
    :global(.sl-cell) {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    :global(.sl-cell) code {
        /* For <code> tags within descriptions */
        font-family: var(--nlds-font-mono, monospace);
        background-color: var(
            --nlds-code-snippet-bg-inline,
            #e8e8e8
        ); /* Slightly different for inline */
        padding: 0.125rem 0.3rem;
        border-radius: 3px;
        font-size: 0.875em;
    }
</style>
