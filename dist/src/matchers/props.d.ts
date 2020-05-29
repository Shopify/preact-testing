/// <reference types="jest" />
import { Node } from '../types';
export declare function toHaveProps<Props>(this: jest.MatcherUtils, node: Node<Props>, props: Partial<Props>): {
    pass: boolean;
    message: () => string;
};
export declare function toHaveDataProps(this: jest.MatcherUtils, node: Node<unknown>, data: {
    [key: string]: string;
}): any;
//# sourceMappingURL=props.d.ts.map