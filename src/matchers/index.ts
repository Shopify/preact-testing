import 'jest';
import {ComponentType, Context as ReactContext} from 'preact';
import {Node, PropsFor} from '../types';

import {toHavePreactProps, toHaveReactDataProps} from './props';
import {
  toContainPreactComponent,
  toContainPreactComponentTimes,
} from './components';
import {toProvidePreactContext} from './context';
import {toContainReactText, toContainPreactHtml} from './strings';

type PropsFromNode<T> = T extends Node<infer U> ? U : never;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHavePreactProps(props: Partial<PropsFromNode<R>>): void;
      toHaveReactDataProps(data: {[key: string]: string}): void;
      toContainPreactComponent<Type extends string | ComponentType<any>>(
        type: Type,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainPreactComponentTimes<Type extends string | ComponentType<any>>(
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toProvidePreactContext<Type>(
        context: ReactContext<Type>,
        value?: Type,
      ): void;
      toContainReactText(text: string): void;
      toContainPreactHtml(text: string): void;
    }
  }
}

expect.extend({
  toHavePreactProps,
  toHaveReactDataProps,
  toContainPreactComponent,
  toContainPreactComponentTimes,
  toContainReactText,
  toContainPreactHtml,
  toProvidePreactContext,
});
