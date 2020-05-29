import { ComponentType } from 'preact';
import { Node } from '../types';
export declare function assertIsNode(node: unknown, { expectation, isNot }: {
    expectation: string;
    isNot: boolean;
}): void;
export declare function assertIsType(type: unknown, { expectation, isNot }: {
    expectation: string;
    isNot: boolean;
}): void;
export declare function diffs(element: Node<any>[], props: object, expand?: boolean): string;
export declare function printType(type: string | ComponentType<any>): string;
export declare function diffPropsForNode(node: Node<any>, props: object, { expand }: {
    expand?: boolean | undefined;
}): string | null;
export declare function pluralize(word: string, count: number): string;
//# sourceMappingURL=utilities.d.ts.map