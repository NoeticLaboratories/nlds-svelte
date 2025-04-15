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
declare const NumberInput: $$__sveltets_2_IsomorphicComponent<{
    /** Input Label */ label?: string;
    /** Current numeric value (can be null if noValueAllowed) */ value?: number | null;
    /** Optional helper text */ helperText?: string;
    /** Minimum allowed value */ min?: number | null;
    /** Maximum allowed value */ max?: number | null;
    /** Increment/decrement step */ step?: number;
    /** Disable the input */ disabled?: boolean;
    /** Make the input read-only */ readonly?: boolean;
    /** Hide the label visually */ hideLabel?: boolean;
    /** Hide the increment/decrement steppers */ hideSteppers?: boolean;
    /** Input size */ size?: "sm" | "md" | "lg";
    /** Use light variant (for dark backgrounds) */ light?: boolean;
    /** Manually set invalid state */ invalid?: boolean;
    /** Text to display when invalid */ invalidText?: string;
    /** Manually set warning state */ warn?: boolean;
    /** Text to display when warning */ warnText?: string;
    /** Allow the input value to be null (empty) */ noValueAllowed?: boolean;
    /** Unique ID for the input */ id?: string;
    /** Additional classes for the wrapper */ class?: string;
}, {
    change: CustomEvent<{
        value: number | null;
    }>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type NumberInput = InstanceType<typeof NumberInput>;
export default NumberInput;
