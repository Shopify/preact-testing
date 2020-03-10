import 'jest';
import {ComponentType, Context as PreactContext} from 'preact';
import {ComponentType as ReactComponentType, Context as ReactContext} from 'react';
import {Node, PropsFor} from '../types';

import {toHaveProps, toHaveDataProps} from './props';
import {
  toContainComponent,
  toContainComponentTimes,
} from './components';
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
      toContainComponent<Type extends string | ReactComponentType<any>>(
        type: Type,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainComponentTimes<Type extends string | ComponentType<any>>(  
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toContainComponentTimes<Type extends string | ReactComponentType<any>>(
        type: Type,
        times: number,
        props?: Partial<PropsFor<Type>>,
      ): void;
      toProvideContext<Type>(
        context: PreactContext<Type>,
        value?: Type,
      ): void;
      toProvideContext<Type>(
        context: ReactContext<Type>,
        value?: Type,
      ): void;
      toContainText(text: string): void;
      toContainHtml(text: string): void;
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
});
