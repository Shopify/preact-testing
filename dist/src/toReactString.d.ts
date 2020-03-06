import { DebugOptions, Node } from './types';
export declare function toReactString<Props>(node: Node<Props>, options?: DebugOptions, level?: number): any;
export declare function toPropString(key: string, value: unknown, verbosity?: number): string;
export declare function nodeName<Props>({ type }: Node<Props>): string;
//# sourceMappingURL=toReactString.d.ts.map