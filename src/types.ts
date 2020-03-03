import {ComponentType as OriginalComponentType, JSX, VNode} from 'preact';
import {Arguments, MaybeFunctionReturnType} from '@shopify/useful-types';

export interface SimpleFunctionalComponent<P> {
  (props: P): VNode<any> | null;
}

export type ComponentType<P extends {}> = OriginalComponentType<P>;

export type PropsFor<T extends string | ComponentType<any>> = T extends string
  ? T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : JSX.HTMLAttributes
  : T extends ComponentType<any>
  ? PropsWithoutRef<T>
  : never;

export type PropsWithoutRef<P> = Pick<P, Exclude<keyof P, 'ref'>>;

export type FunctionKeys<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends ((...args: any[]) => any)
    ? K
    : never
}[keyof T];

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
interface DeepPartialReadonlyArray<T> extends ReadonlyArray<DeepPartial<T>> {}
type DeepPartialObject<T extends object> = {[K in keyof T]?: DeepPartial<T[K]>};

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartialArray<U>
  : T extends ReadonlyArray<infer U>
  ? DeepPartialReadonlyArray<U>
  : T extends object
  ? DeepPartialObject<T>
  : T;

export type DeepPartialArguments<T> = {[K in keyof T]?: DeepPartial<T[K]>} &
  any[];

export type Predicate = (node: Node<any>) => boolean;

export interface Node<Props> {
  readonly props: Props;
  readonly type: string | ComponentType<any> | null;
  readonly isDOM: boolean;
  readonly instance: any;
  readonly children: Node<any>[];
  readonly descendants: Node<any>[];
  readonly domNodes: HTMLElement[];
  readonly domNode: HTMLElement | null;

  data(key: string): string | undefined;
  prop<K extends keyof Props>(key: K): Props[K];

  text(): string;
  html(): string;

  is<Type extends ComponentType<any> | string>(
    type: Type,
  ): this is Node<PropsFor<Type>>;

  find<Type extends ComponentType<any> | string>(
    type: Type,
    props?: Partial<PropsFor<Type>>,
  ): Node<PropsFor<Type>> | null;
  findAll<Type extends ComponentType<any> | string>(
    type: Type,
    props?: Partial<PropsFor<Type>>,
  ): Node<PropsFor<Type>>[];
  findWhere(predicate: Predicate): Node<any> | null;
  findAllWhere(predicate: Predicate): Node<any>[];

  trigger<K extends FunctionKeys<Props>>(
    prop: K,
    ...args: DeepPartialArguments<Arguments<Props[K]>>
  ): Promise<MaybeFunctionReturnType<NonNullable<Props[K]>>>;
  triggerKeypath<T = any>(keypath: string, ...args: unknown[]): Promise<T>;

  debug(options?: DebugOptions): string;
  toString(): string;
}

export interface DebugOptions {
  allProps?: boolean;
  depth?: number;
  verbosity?: number;
}

export type NodeTree = (Node<any> | string)[];