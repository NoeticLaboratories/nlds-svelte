import "@catppuccin/highlightjs/css/catppuccin-latte.css";
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const CodeSnippet: $$__sveltets_2_IsomorphicComponent<{
    /** The code content to display */ code?: string;
    /** The highlight.js language alias (e.g., 'javascript', 'css', 'svelte') */ language?: string;
    /** Type of snippet */ type?: "single" | "multi" | "inline";
    /** Text for the "Show more" button */ showMoreText?: string;
    /** Text for the "Show less" button */ showLessText?: string;
    /** Aria-label for the copy button */ copyButtonDescription?: string;
    /** Feedback text after copying */ copyFeedback?: string;
    /** Duration (ms) to show copy feedback */ copyTimeoutDuration?: number;
    /** For multi-line: max lines shown before needing expansion (0 = never collapse) */ maxLinesBeforeExpand?: number;
    /** Wrap long lines in multi-line snippets */ wrapText?: boolean;
    /** Whether to highlight the code */ highlight?: boolean;
    /** Whether to expand the multi-line snippet by default */ expandedByDefault?: boolean;
    /** Add custom classes to the wrapper */ class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type CodeSnippet = InstanceType<typeof CodeSnippet>;
export default CodeSnippet;
