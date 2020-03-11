import 'jest';
import {ComponentType, Context as PreactContext} from 'preact';
import {Node, PropsFor} from '../types';

import {toHaveProps, toHaveDataProps} from './props';
import {toContainComponent, toContainComponentTimes} from './components';
import {toProvideContext} from './context';
import {toContainText, toContainHtml} from './strings';

type PropsFromNode<T> = T extends Node<infer U> ? U : never;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveProps(props: Partial<PropsFromNode<R>>): void;
      toHaveDataProps(data: {[key: string]: string}): void;
      toContainComponent<Type extends string | ComponentType<any>>(
        type: Type,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainComponentTimes<Type extends string | ComponentType<any>>(
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toProvideContext<Type>(context: PreactContext<Type>, value?: Type): void;
      toContainText(text: string): void;
      toContainHtml(text: string): void;

      // compatibility APIs for @shopify/react-testing
      toHaveReactProps(props: Partial<PropsFromNode<R>>): void;
      toHaveReactDataProps(data: {[key: string]: string}): void;
      toContainReactComponent<Type extends string | ComponentType<any>>(
        type: Type,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainReactComponentTimes<Type extends string | ComponentType<any>>(
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toProvideReactContext<Type>(context: PreactContext<Type>, value?: Type): void;
      toContainReactText(text: string): void;
      toContainReactHtml(text: string): void;
    }
  }
}

expect.extend({
  toHaveProps,
  toHaveDataProps,
  toContainComponent,
  toContainComponentTimes,
  toContainText,
  toContainHtml,
  toProvideContext,
  toHaveReactProps: toHaveProps,
  toHaveReactDataProps: toHaveDataProps,
  toContainReactComponent: toContainComponent,
  toContainReactComponentTimes: toContainComponentTimes,
  toContainReactText: toContainText,
  toContainReactHtml: toContainHtml,
  toProvideReactContext: toProvideContext,
});
