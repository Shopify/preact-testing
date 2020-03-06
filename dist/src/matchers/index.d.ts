import 'jest';
import { ComponentType, Context as ReactContext } from 'preact';
import { Node, PropsFor } from '../types';
declare type PropsFromNode<T> = T extends Node<infer U> ? U : never;
declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveProps(props: Partial<PropsFromNode<R>>): void;
            toHaveReactDataProps(data: {
                [key: string]: string;
            }): void;
            toContainComponent<Type extends string | ComponentType<any>>(type: Type, props?: Partial<PropsFor<Type>>): void;
            toContainComponentTimes<Type extends string | ComponentType<any>>(type: Type, times: number, props?: Partial<PropsFor<Type>>): void;
            toProvideContext<Type>(context: ReactContext<Type>, value?: Type): void;
            toContainText(text: string): void;
            toContainHtml(text: string): void;
        }
    }
}
export {};
//# sourceMappingURL=index.d.ts.map