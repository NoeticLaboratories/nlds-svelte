export default Checkbox;
type Checkbox = SvelteComponent<{
    [x: string]: any;
    disabled?: boolean | undefined;
    id?: string | undefined;
    checked?: boolean | undefined;
    indeterminate?: boolean | undefined;
    readonly?: boolean | undefined;
    hideLabel?: boolean | undefined;
    labelText?: string | undefined;
    name?: string | undefined;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string | undefined;
};
declare const Checkbox: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    disabled?: boolean | undefined;
    id?: string | undefined;
    checked?: boolean | undefined;
    indeterminate?: boolean | undefined;
    readonly?: boolean | undefined;
    hideLabel?: boolean | undefined;
    labelText?: string | undefined;
    name?: string | undefined;
}, {
    click: MouseEvent;
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
