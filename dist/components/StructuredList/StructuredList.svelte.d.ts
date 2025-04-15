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
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const StructuredList: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    /** Enable row selection */ selectable?: boolean;
    /** Type of selection if `selectable` is true */ selectionType?: "single" | "multi" | "none";
    /** Bindable property holding the value(s) of selected row(s). String for single, string[] for multi. */ value?: string | string[] | null;
    /** Add borders between rows */ border?: boolean;
    /** Use alternating row colors */ zebra?: boolean;
    /** Reduce vertical padding for a denser layout */ condensed?: boolean;
    /** Accessible label for the list */ ariaLabel?: string;
    /** Any additional classes for the wrapper */ class?: string;
}, {
    header: {};
    default: {};
}>, {
    change: CustomEvent<{
        value: string | string[] | null;
    }>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    header: {};
    default: {};
}, {}, string>;
type StructuredList = InstanceType<typeof StructuredList>;
export default StructuredList;
