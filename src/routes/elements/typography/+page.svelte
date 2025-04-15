<script lang="ts">
    // Core Components
    import CodeSnippet from "$lib/components/CodeSnippet/CodeSnippet.svelte";

    // Page specific data
    const fontFamilies = [
        {
            name: "Sans Serif (Primary)",
            variable: "--nlds-font-sans",
            value: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif",
            description:
                "Used for primary UI elements, body text, and headings for optimal readability.",
        },
        {
            name: "Serif",
            variable: "--nlds-font-serif",
            // Updated font family value
            value: "Alegreya, Georgia, serif",
            description:
                "Can be used selectively for editorial content or specific display headings where a more traditional feel is desired.",
        },
        {
            name: "Monospace",
            variable: "--nlds-font-mono",
            value: "IBM Plex Mono, monospace",
            description:
                "Used exclusively for displaying code snippets or tabular data requiring fixed-width characters.",
        },
    ];

    // Placeholder Type Scale - Needs definition by the NLDS team
    // Inspired by IBM Carbon, using rem units (base 16px)
    const typeScale = [
        {
            token: "nlds-heading-01",
            tag: "h1",
            fontSize: "2rem", // 32px
            fontWeight: 600,
            lineHeight: 1.4,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Heading 1",
        },
        {
            token: "nlds-heading-02",
            tag: "h2",
            fontSize: "1.75rem", // 28px
            fontWeight: 600,
            lineHeight: 1.4,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Heading 2",
        },
        {
            token: "nlds-heading-03",
            tag: "h3",
            fontSize: "1.5rem", // 24px
            fontWeight: 600,
            lineHeight: 1.4,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Heading 3",
        },
        {
            token: "nlds-heading-04",
            tag: "h4",
            fontSize: "1.25rem", // 20px
            fontWeight: 600,
            lineHeight: 1.5,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Heading 4",
        },
        {
            token: "nlds-body-01",
            tag: "p",
            fontSize: "1rem", // 16px
            fontWeight: 400,
            lineHeight: 1.6,
            fontFamilyVar: "--nlds-font-sans",
            exampleText:
                "Body 01: This is the standard paragraph text used for most content blocks.",
        },
        {
            token: "nlds-body-02",
            tag: "p", // Use p for demo, apply class
            fontSize: "0.875rem", // 14px
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamilyVar: "--nlds-font-sans",
            exampleText:
                "Body 02: Slightly smaller text for secondary information or dense layouts.",
        },
        {
            token: "nlds-label-01",
            tag: "label", // Use label for demo, apply class
            fontSize: "0.75rem", // 12px
            fontWeight: 600,
            lineHeight: 1.4,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Label 01",
        },
        {
            token: "nlds-code-01",
            tag: "code", // Use code for demo, apply class
            fontSize: "0.875rem", // 14px
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamilyVar: "--nlds-font-mono",
            exampleText: 'const greet = "hello";',
        },
        {
            token: "nlds-caption-01",
            tag: "span", // Use span for demo, apply class
            fontSize: "0.75rem", // 12px
            fontWeight: 400,
            lineHeight: 1.4,
            fontFamilyVar: "--nlds-font-sans",
            exampleText: "Caption 01: Used for image captions or helper text.",
        },
        // Example Serif Usage (Add if NLDS defines specific serif styles)
        // {
        // 	token: 'nlds-editorial-heading',
        // 	tag: 'h2', // Or other tag
        // 	fontSize: '1.75rem',
        // 	fontWeight: 400, // Alegreya might look better at normal weight for headings
        // 	lineHeight: 1.4,
        // 	fontFamilyVar: '--nlds-font-serif',
        // 	exampleText: 'Editorial Heading (Serif)'
        // },
    ];

    // Helper function to get font family value from variable name
    const getFontFamilyValue = (varName: string) => {
        const family = fontFamilies.find((f) => f.variable === varName);
        return family
            ? family.value.split(",")[0].replace(/"/g, "")
            : "System Default"; // Return clean primary font name
    };
</script>

<!-- Page Title -->
<h1>Typography</h1>

<!-- Header Section -->
<section class="page-section">
    <p class="component-description">
        Consistent and legible typography is crucial for a good user experience.
        The Noetic Labs Design System (NLDS) utilizes specific font families:
        IBM Plex Sans (primary sans-serif), Alegreya (serif), and IBM Plex Mono
        (monospace), accessible via CSS custom properties. This ensures
        typographic consistency across all applications built with NLDS.
    </p>
</section>

<!-- Font Families Section -->
<section class="page-section">
    <h2>Font Families</h2>
    <p>
        NLDS defines three core font families accessible via CSS variables. The
        primary font for most UI text is IBM Plex Sans.
    </p>
    <div class="font-family-list">
        {#each fontFamilies as family}
            <div class="font-family-item">
                <h3>{family.name}</h3>
                <p
                    class="font-family-example"
                    style="font-family: var({family.variable});"
                >
                    Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt
                    Uu Vv Ww Xx Yy Zz
                    <br />
                    0 1 2 3 4 5 6 7 8 9
                </p>
                <div class="font-family-details">
                    <CodeSnippet code={family.variable} type="inline" />
                    <p class="font-stack-value">{family.value}</p>
                    <p class="font-description">{family.description}</p>
                </div>
            </div>
        {/each}
    </div>
</section>

<!-- Type Scale Section -->
<section class="page-section">
    <h2>Type Scale</h2>
    <p>
        A type scale provides predefined typographic styles for headings,
        paragraphs, labels, and other text elements. This ensures visual
        hierarchy and consistency. <strong>Note:</strong> The specific tokens and
        styles below are WIP (Work In Progress), and will most likely change in the
        future.
    </p>
    <div class="type-scale-table">
        <div class="type-scale-header">
            <div class="type-scale-cell header-token">Token / Tag / Class</div>
            <div class="type-scale-cell header-details">
                Specs (Size / Weight / Line Height / Family)
            </div>
            <div class="type-scale-cell header-example">Example</div>
        </div>
        {#each typeScale as style}
            <div class="type-scale-row">
                <div class="type-scale-cell cell-token">
                    <!-- Display as tag if tag matches type, otherwise as class -->
                    <CodeSnippet
                        code={style.tag === style.token.split("-")[1] ||
                        (style.tag === "p" && style.token.includes("body")) ||
                        (style.tag === "label" &&
                            style.token.includes("label")) ||
                        (style.tag === "code" &&
                            style.token.includes("code")) ||
                        (style.tag === "span" &&
                            style.token.includes("caption"))
                            ? `<${style.tag}>`
                            : `.${style.token}`}
                        type="inline"
                    />
                </div>
                <div class="type-scale-cell cell-details">
                    {style.fontSize} / {style.fontWeight} / {style.lineHeight} /
                    {getFontFamilyValue(style.fontFamilyVar)}
                </div>
                <div class="type-scale-cell cell-example">
                    <svelte:element
                        this={style.tag}
                        class={style.token.startsWith("nlds-")
                            ? style.token
                            : ""}
                        style="font-size: {style.fontSize}; font-weight: {style.fontWeight}; line-height: {style.lineHeight}; font-family: var({style.fontFamilyVar}); margin: 0;"
                    >
                        {style.exampleText}
                    </svelte:element>
                </div>
            </div>
        {/each}
    </div>
</section>

<!-- Usage Section -->
<section class="page-section">
    <h2>Usage</h2>
    <p>
        Apply typography primarily by using semantic HTML elements (like <CodeSnippet
            code="<h1>"
            type="inline"
        />-<CodeSnippet code="<h6>" type="inline" />, <CodeSnippet
            code="<p>"
            type="inline"
        />, <CodeSnippet code="<code>" type="inline" />) which should inherit
        base styles defined in your global CSS. For more specific control or
        overrides, use the defined type scale utility classes (e.g., <CodeSnippet
            code=".nlds-body-02"
            type="inline"
        />) or directly reference the font family CSS variables in your
        stylesheets.
    </p>

    <CodeSnippet
        language="css"
        type="multi"
        code={`
/* Base body styling (typically set globally) */
:root {
    /* Define font variables */
    --nlds-font-sans: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    --nlds-font-serif: "Alegreya", Georgia, serif;
    --nlds-font-mono: "IBM Plex Mono", monospace;

    /* Define example type scale variables (NLDS should formalize these) */
    --nlds-heading-01-fs: 2rem;
    --nlds-heading-01-fw: 600;
    --nlds-heading-01-lh: 1.4;
    /* ... other type scale vars */
    --nlds-body-01-fs: 1rem;
    --nlds-body-01-fw: 400;
    --nlds-body-01-lh: 1.6;
    /* ... etc. */
}

body {
    font-family: var(--nlds-font-sans);
    font-size: var(--nlds-body-01-fs); /* Base size */
    line-height: var(--nlds-body-01-lh); /* Base line height */
    font-weight: var(--nlds-body-01-fw); /* Base weight */
    color: var(--nlds-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Apply styles to semantic elements */
h1 {
    font-size: var(--nlds-heading-01-fs);
    font-weight: var(--nlds-heading-01-fw);
    line-height: var(--nlds-heading-01-lh);
    /* font-family is inherited from body unless overridden */
}
/* ... styles for h2, h3, h4, h5, h6, p, code, etc. */

code, pre {
    font-family: var(--nlds-font-mono);
    /* Define code font size, etc. using variables */
}

/* Define utility classes if needed */
.nlds-body-02 {
    font-size: 0.875rem; /* Or use a variable */
    line-height: 1.5;   /* Or use a variable */
    /* font-family is usually inherited */
}

/* Example using serif font explicitly */
.editorial-title {
    font-family: var(--nlds-font-serif);
    /* Define size, weight, line-height as needed */
}
    `}
    />

    <p style="margin-top: 1.5rem;">
        Remember to load the required font families in your application,
        typically via a link in your HTML head or by importing them into your
        main CSS file. Ensure you include Alegreya along with IBM Plex Sans and
        Mono.
    </p>
    <CodeSnippet
        language="html"
        type="multi"
        code={`
<!-- Example: Linking fonts in HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400&family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:wght@400;600&display=swap" rel="stylesheet">

<!-- Make sure to include weights needed for your type scale, e.g., Alegreya 700 if used for bold serif text -->
    `}
    />
</section>

<style>
    /* General Page Styles - Inherit or adapt from previous examples */
    h1 {
        margin-bottom: 1rem;
        font-weight: 600; /* Should ideally come from type scale */
    }
    h2 {
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
        padding-bottom: 0.5rem;
        font-weight: 600; /* Should ideally come from type scale */
    }
    h3 {
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-weight: 600; /* Should ideally come from type scale */
    }
    p {
        margin-bottom: 1rem;
        line-height: 1.6; /* Should ideally come from type scale */
        max-width: 75ch; /* Improve readability */
    }

    .page-section {
        margin-bottom: 3rem;
    }
    .component-description {
        font-size: 1rem; /* Should ideally come from type scale */
        margin-bottom: 2rem;
        color: var(--nlds-text-secondary);
    }

    /* Font Families Styles */
    .font-family-list {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    }
    .font-family-item {
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        padding: 1.5rem;
        background-color: var(--nlds-bg-secondary, #f4f4f4);
    }
    .font-family-item h3 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    .font-family-example {
        font-size: 1rem; /* Base size for example */
        line-height: 1.5;
        margin-bottom: 1.5rem;
        word-break: break-word;
        background-color: var(--nlds-bg-primary, #ffffff);
        padding: 1rem;
        border: 1px dashed var(--nlds-border-color, #e0e0e0);
        min-height: 80px; /* Ensure space even if font fails */
    }
    .font-family-details {
        font-size: 0.875rem;
    }
    .font-family-details :global(.ndsl-codesnippet--inline) {
        display: block;
        margin-bottom: 0.5rem;
    }
    .font-stack-value {
        font-family: var(--nlds-font-mono);
        color: var(--nlds-text-secondary);
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
        word-break: break-all;
    }
    .font-description {
        font-size: 0.875rem;
        color: var(--nlds-text-secondary);
        margin-bottom: 0;
    }

    /* Type Scale Styles */
    .type-scale-table {
        border: 1px solid var(--nlds-border-color, #e0e0e0);
        font-size: 0.875rem;
        background-color: var(--nlds-bg-primary, #ffffff);
        overflow-x: auto; /* Allow horizontal scroll if needed */
    }
    .type-scale-header,
    .type-scale-row {
        display: flex;
        border-bottom: 1px solid var(--nlds-border-color, #e0e0e0);
    }
    .type-scale-table .type-scale-row:last-child {
        border-bottom: none;
    }
    .type-scale-header {
        font-weight: 600;
        background-color: var(--nlds-bg-secondary, #f4f4f4);
        color: var(--nlds-text-primary);
        position: sticky; /* Keep header visible on scroll */
        top: 0;
        z-index: 1;
    }
    .type-scale-cell {
        padding: 0.75rem 1rem;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }
    /* Adjust column widths */
    .header-token,
    .cell-token {
        flex-basis: 25%;
        min-width: 180px;
    }
    .header-details,
    .cell-details {
        flex-basis: 35%;
        min-width: 250px;
        color: var(--nlds-text-secondary);
    }
    .header-example,
    .cell-example {
        flex-basis: 40%;
        flex-grow: 1;
        min-width: 200px;
    }

    /* Style adjustments for cell content */
    .cell-token :global(.ndsl-codesnippet--inline) {
        font-size: 0.85em; /* Slightly smaller code snippet */
    }
    .cell-details {
        font-family: var(--nlds-font-mono);
        font-size: 0.8rem;
    }
    .cell-example > * {
        /* Target the actual example element */
        width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }

    /* Define placeholder type scale classes for the demo table (NLDS should define these globally) */
    .nlds-heading-01 {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.4;
        font-family: var(--nlds-font-sans);
    }
    .nlds-heading-02 {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1.4;
        font-family: var(--nlds-font-sans);
    }
    .nlds-heading-03 {
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.4;
        font-family: var(--nlds-font-sans);
    }
    .nlds-heading-04 {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.5;
        font-family: var(--nlds-font-sans);
    }
    .nlds-body-01 {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.6;
        font-family: var(--nlds-font-sans);
    }
    .nlds-body-02 {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        font-family: var(--nlds-font-sans);
    }
    .nlds-label-01 {
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.4;
        font-family: var(--nlds-font-sans);
    }
    .nlds-code-01 {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        font-family: var(--nlds-font-mono);
    }
    .nlds-caption-01 {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1.4;
        font-family: var(--nlds-font-sans);
    }
</style>
