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
declare const Tooltip: $$__sveltets_2_IsomorphicComponent<{
    /** Text content of the tooltip */ text: string;
    /** Controls visibility */ open?: boolean;
    /** Position relative to the trigger */ position?: "top" | "bottom" | "left" | "right";
    /** Optional transition duration (ms) */ duration?: number;
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Tooltip = InstanceType<typeof Tooltip>;
export default Tooltip;
