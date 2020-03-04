import 'jest';
import {ComponentType, Context as ReactContext} from 'preact';
import {Node, PropsFor} from '../types';

import {toHaveProps, toHaveDataProps} from './props';
import {
  toContainComponent,
  toContainComponentTimes,
} from './components';
import {toProvideContext} from './context';
import {toContainReactText, toContainHtml} from './strings';

type PropsFromNode<T> = T extends Node<infer U> ? U : never;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveProps(props: Partial<PropsFromNode<R>>): void;
      toHaveReactDataProps(data: {[key: string]: string}): void;
      toContainComponent<Type extends string | ComponentType<any>>(
        type: Type,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainComponentTimes<Type extends string | ComponentType<any>>(
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toProvideContext<Type>(
        context: ReactContext<Type>,
        value?: Type,
      ): void;
      toContainReactText(text: string): void;
      toContainHtml(text: string): void;
    }
  }
}

expect.extend({
  toHaveProps,
  toHaveDataProps,
  toContainComponent,
  toContainComponentTimes,
  toContainReactText,
  toContainHtml,
  toProvideContext,
});
