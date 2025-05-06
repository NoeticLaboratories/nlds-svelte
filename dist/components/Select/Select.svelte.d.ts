export default Select;
type Select = SvelteComponent<{
    [x: string]: any;
    id?: string | undefined;
    name?: string | undefined;
    disabled?: boolean | undefined;
    value?: string | number | undefined;
    options?: {
        value: string | number;
        label: string;
    }[] | undefined;
    placeholder?: string | undefined;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string | undefined;
};
declare const Select: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    id?: string | undefined;
    name?: string | undefined;
    disabled?: boolean | undefined;
    value?: string | number | undefined;
    options?: {
        value: string | number;
        label: string;
    }[] | undefined;
    placeholder?: string | undefined;
}, {
    change: CustomEvent<any>;
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
