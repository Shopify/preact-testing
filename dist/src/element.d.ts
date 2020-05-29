import { Arguments, MaybeFunctionReturnType as ReturnType } from '@shopify/useful-types';
import { Node, Predicate, FunctionKeys, DeepPartialArguments, PropsFor, DebugOptions, NodeTree, ComponentType } from './types';
declare type Root = import('./root').Root<any>;
interface Tree<Props> {
    type: string | ComponentType<any> | null;
    props: Props;
    instance?: any;
}
export declare class Element<Props extends any> implements Node<Props> {
    private readonly tree;
    private readonly allChildren;
    private allDescendants;
    readonly root: Root;
    get props(): Props;
    get displayName(): any;
    get type(): string | import("preact").ComponentClass<any, {}> | import("preact").FunctionComponent<any> | null;
    get isDOM(): boolean;
    get instance(): any;
    get children(): Element<any>[];
    get descendants(): Element<any>[];
    get domNodes(): HTMLElement[];
    get domNode(): HTMLElement | null;
    private readonly elementChildren;
    private readonly elementDescendants;
    constructor(tree: Tree<Props>, allChildren: NodeTree, allDescendants: NodeTree, root: Root);
    data(key: string): string | undefined;
    prop<K extends keyof Props>(key: K): Props[K];
    text(): string;
    html(): string;
    is<Type extends ComponentType<any> | string>(type: Type): this is Element<PropsFor<Type>>;
    find<Type extends ComponentType<any> | string>(type: Type, props?: Partial<PropsFor<Type>>): Element<PropsFor<Type>> | null;
    findAll<Type extends ComponentType<any> | string>(type: Type, props?: Partial<PropsFor<Type>>): Element<PropsFor<Type>>[];
    findWhere(predicate: Predicate): Element<any> | null;
    findAllWhere(predicate: Predicate): Element<any>[];
    trigger<K extends FunctionKeys<Props>>(prop: K, ...args: DeepPartialArguments<Arguments<Props[K]>>): Promise<ReturnType<NonNullable<Props[K]>>>;
    triggerKeypath<T = unknown>(keypath: string, ...args: unknown[]): Promise<T>;
    debug(options?: DebugOptions): string;
    toString(): string;
}
export {};
//# sourceMappingURL=element.d.ts.map