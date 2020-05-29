/// <reference types="jest" />
import { ComponentType } from 'preact';
import { Node, PropsFor } from '../types';
export declare function toContainComponent<Type extends string | ComponentType<any>>(this: jest.MatcherUtils, node: Node<unknown>, type: Type, props?: Partial<PropsFor<Type>>): {
    pass: boolean;
    message: () => string;
};
export declare function toContainComponentTimes<Type extends string | ComponentType<any>>(this: jest.MatcherUtils, node: Node<unknown>, type: Type, times: number, props?: Partial<PropsFor<Type>>): {
    pass: boolean;
    message: () => string;
};
//# sourceMappingURL=components.d.ts.map