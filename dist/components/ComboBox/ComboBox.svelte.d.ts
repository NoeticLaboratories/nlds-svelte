export default ComboBox;
type ComboBox = SvelteComponent<{
    disabled?: boolean | undefined;
    id?: string | undefined;
    open?: boolean | undefined;
    invalid?: boolean | undefined;
    items?: any[] | undefined;
    selectedId?: string | undefined;
    placeholder?: string | undefined;
    titleText?: string | undefined;
    helperText?: string | undefined;
    invalidText?: string | undefined;
    light?: boolean | undefined;
}, {
    input: CustomEvent<any>;
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string | undefined;
};
declare const ComboBox: $$__sveltets_2_IsomorphicComponent<{
    disabled?: boolean | undefined;
    id?: string | undefined;
    open?: boolean | undefined;
    invalid?: boolean | undefined;
    items?: any[] | undefined;
    selectedId?: string | undefined;
    placeholder?: string | undefined;
    titleText?: string | undefined;
    helperText?: string | undefined;
    invalidText?: string | undefined;
    light?: boolean | undefined;
}, {
    input: CustomEvent<any>;
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
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
