import { VNode } from 'preact';
import { IfAllOptionalKeys } from '@shopify/useful-types';
import { Root, Options as RootOptions } from './root';
import { Element } from './element';
export { Root, Element };
export declare function mount<Props>(element: VNode<Props>): Root<Props>;
declare type AfterMountOption<MountOptions extends object, Context extends object, Async extends boolean> = Async extends true ? {
    afterMount(wrapper: CustomRoot<unknown, Context>, options: MountOptions): PromiseLike<void>;
} : {
    afterMount?(wrapper: CustomRoot<unknown, Context>, options: MountOptions): void;
};
declare type ContextOption<MountOptions extends object, Context extends object> = IfAllOptionalKeys<Context, {
    context?(options: MountOptions): Context;
}, {
    context(options: MountOptions): Context;
}>;
export declare type CustomMountOptions<MountOptions extends object = {}, CreateContext extends object = {}, Context extends object = CreateContext, Async extends boolean = false> = {
    render(element: VNode<any>, context: Context, options: MountOptions): VNode<any>;
} & ContextOption<MountOptions, CreateContext> & AfterMountOption<MountOptions, Context, Async>;
export interface CustomMount<MountOptions extends object, Context extends object, Async extends boolean> {
    <Props>(...args: IfAllOptionalKeys<MountOptions, [VNode<any>, MountOptions?], [VNode<any>, MountOptions]>): CustomMountResult<Props, Context, Async>;
    extend<AdditionalMountOptions extends object = {}, AdditionalContext extends object = {}, AdditionalAsync extends boolean = false>(options: CustomMountOptions<MountOptions & AdditionalMountOptions, AdditionalContext, Context & AdditionalContext, AdditionalAsync>): CustomMount<MountOptions & AdditionalMountOptions, Context & AdditionalContext, AdditionalAsync extends true ? AdditionalAsync : Async>;
}
declare type CustomMountResult<Props, Context extends object, Async extends boolean> = Async extends true ? Promise<CustomRoot<Props, Context>> : CustomRoot<Props, Context>;
export declare class CustomRoot<Props, Context extends object> extends Root<Props> {
    readonly context: Context;
    constructor(tree: VNode<Props>, context: Context, options?: RootOptions);
}
export declare function createMount<MountOptions extends object = {}, Context extends object = {}, Async extends boolean = false>({ render, context: createContext, afterMount, }: CustomMountOptions<MountOptions, Context, Context, Async>): CustomMount<MountOptions, Context, Async>;
//# sourceMappingURL=mount.d.ts.map