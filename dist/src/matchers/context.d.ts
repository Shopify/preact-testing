/// <reference types="jest" />
import { Context } from 'preact';
import { Node } from '../types';
export declare function toProvideContext<Type>(this: jest.MatcherUtils, node: Node<unknown>, Context: Context<Type>, value?: Type): {
    pass: boolean;
    message: () => string;
};
//# sourceMappingURL=context.d.ts.map