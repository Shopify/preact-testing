import { ComponentType, VNode } from 'preact';
import { Arguments, MaybeFunctionReturnType as ReturnType } from '@shopify/useful-types';
import { Element } from './element';
import { Node, Predicate, FunctionKeys, DeepPartialArguments, PropsFor, DebugOptions } from './types';
declare type Render = (element: VNode<unknown>) => VNode<unknown>;
declare type ResolveRoot = (element: Element<any>) => Element<any> | null;
export interface Options {
    render?: Render;
    resolveRoot?: ResolveRoot;
}
export declare const connected: Set<Root<any>>;
export declare class Root<Props extends Record<string, any>> implements Node<Props> {
    private vdom;
    get props(): Props;
    get isDOM(): boolean;
    get type(): string | import("preact").ComponentClass<any, {}> | import("preact").FunctionComponent<any> | null;
    get instance(): any;
    get children(): Element<any>[];
    get descendants(): Element<any>[];
    get domNodes(): HTMLElement[];
    get domNode(): HTMLElement | null;
    private wrapper;
    private wrappedVDom;
    private element;
    private root;
    private resolveRoot;
    private render;
    private _rerender;
    private get mounted();
    constructor(vdom: VNode<Props>, { render, resolveRoot }?: Options);
    html(): string;
    text(): string;
    is<Type extends ComponentType<any> | string>(type: Type): this is Root<PropsFor<Type>>;
    prop<K extends keyof Props>(key: K): Props[K];
    data(key: string): string | undefined;
    find<Type extends ComponentType<any> | string>(type: Type, props?: Partial<PropsFor<Type>>): Element<PropsFor<Type>> | null;
    findAll<Type extends ComponentType<any> | string>(type: Type, props?: Partial<PropsFor<Type>>): Element<PropsFor<Type>>[];
    findWhere(predicate: Predicate): Element<any> | null;
    findAllWhere(predicate: Predicate): Element<any>[];
    trigger<K extends FunctionKeys<Props>>(prop: K, ...args: DeepPartialArguments<Arguments<Props[K]>>): Promise<ReturnType<NonNullable<Props[K]>>>;
    triggerKeypath<T = unknown>(keypath: string, ...args: unknown[]): Promise<T>;
    act<T>(action: () => T, { update }?: {
        update?: boolean | undefined;
    }): T;
    mount(): void;
    rerender(): void;
    unmount(): void;
    destroy(): void;
    setProps(props: Partial<Props>): void;
    forceUpdate(): void;
    debug(options?: DebugOptions): string;
    toString(): string;
    private buildElementsFromVDOM;
    private ensureRoot;
    private withRoot;
}
export {};
//# sourceMappingURL=root.d.ts.map