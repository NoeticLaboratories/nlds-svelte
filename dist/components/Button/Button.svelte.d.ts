import type { Component } from "svelte";
import type { CarbonIconProps } from "carbon-icons-svelte";
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
declare const Button: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    [x: string]: any;
    kind?: "primary" | "secondary" | "tertiary" | "danger" | "ghost" | undefined;
    size?: "sm" | "md" | "lg" | undefined;
    disabled?: boolean | undefined;
    href?: string | undefined | undefined;
    icon?: Component<CarbonIconProps, {}, string> | undefined;
    iconDescription?: string | undefined | undefined;
    hasIconOnly?: boolean | undefined;
    type?: "button" | "submit" | "reset" | undefined;
    target?: string | undefined | undefined;
    rel?: string | undefined | undefined;
    class?: string | undefined;
}, {
    default: {};
}>, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type Button = InstanceType<typeof Button>;
export default Button;
