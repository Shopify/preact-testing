/// <reference types="jest" />
import { Node } from '../types';
export declare function toContainText<Props>(this: jest.MatcherUtils, node: Node<Props>, text: string): {
    pass: boolean;
    message: () => string;
};
export declare function toContainHtml<Props>(this: jest.MatcherUtils, node: Node<Props>, text: string): {
    pass: boolean;
    message: () => string;
};
//# sourceMappingURL=strings.d.ts.map