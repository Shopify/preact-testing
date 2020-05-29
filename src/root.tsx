import {h, ComponentType, VNode, ComponentChild, render} from 'preact';
import {unmountComponentAtNode} from 'preact/compat';
import {act, setupRerender} from 'preact/test-utils';
import {
  Arguments,
  MaybeFunctionReturnType as ReturnType,
} from '@shopify/useful-types';

import {TestWrapper} from './TestWrapper';
import {Element} from './element';
import {
  Node,
  Predicate,
  FunctionKeys,
  DeepPartialArguments,
  PropsFor,
  NodeTree,
  DebugOptions,
} from './types';
import {array, isPromise} from './util';
import {
  getDescendants,
  getVNode,
  getComponent,
  getDOMNode,
  isTextNode,
} from './preact-utilities';

type Render = (element: VNode<unknown>) => VNode<unknown>;
type ResolveRoot = (element: Element<any>) => Element<any> | null;

export interface Options {
  render?: Render;
  resolveRoot?: ResolveRoot;
}

export const connected = new Set<Root<any>>();

export class Root<Props extends Record<string, any>> implements Node<Props> {
  get props() {
    return this.withRoot((root) => root.props);
  }

  get isDOM() {
    return this.withRoot((root) => root.isDOM);
  }

  get type() {
    return this.withRoot((root) => root.type);
  }

  get instance() {
    return this.withRoot((root) => root.instance);
  }

  get children() {
    return this.withRoot((root) => root.children);
  }

  get descendants() {
    return this.withRoot((root) => root.descendants);
  }

  get domNodes() {
    return this.withRoot((root) => root.domNodes);
  }

  get domNode() {
    return this.withRoot((root) => root.domNode);
  }

  private wrapper: TestWrapper<Props> | null = null;
  private element = document.createElement('div');
  private root: Element<Props> | null = null;
  private resolveRoot: ResolveRoot;
  private render: Render;
  private _rerender: any;

  private get mounted() {
    return this.wrapper != null;
  }

  constructor(
    private vdom: VNode<Props>,
    {render = defaultRender, resolveRoot = defaultResolveRoot}: Options = {},
  ) {
    this._rerender = setupRerender();
    this.resolveRoot = resolveRoot;
    this.render = render;
    this.mount();
  }

  html() {
    return this.withRoot((root) => root.html());
  }

  text() {
    return this.withRoot((root) => root.text());
  }

  is<Type extends ComponentType<any> | string>(
    type: Type,
  ): this is Root<PropsFor<Type>> {
    return this.withRoot((root) => root.is(type));
  }

  prop<K extends keyof Props>(key: K) {
    return this.withRoot((root) => root.prop(key));
  }

  data(key: string) {
    return this.withRoot((root) => root.data(key));
  }

  find<Type extends ComponentType<any> | string>(
    type: Type,
    props?: Partial<PropsFor<Type>>,
  ) {
    return this.withRoot((root) => root.find(type, props));
  }

  findAll<Type extends ComponentType<any> | string>(
    type: Type,
    props?: Partial<PropsFor<Type>>,
  ) {
    return this.withRoot((root) => root.findAll(type, props));
  }

  findWhere(predicate: Predicate) {
    return this.withRoot((root) => root.findWhere(predicate));
  }

  findAllWhere(predicate: Predicate) {
    return this.withRoot((root) => root.findAllWhere(predicate));
  }

  trigger<K extends FunctionKeys<Props>>(
    prop: K,
    ...args: DeepPartialArguments<Arguments<Props[K]>>
  ): Promise<ReturnType<NonNullable<Props[K]>>> {
    return this.withRoot((root) => root.trigger(prop, ...(args as any)));
  }

  triggerKeypath<T = unknown>(keypath: string, ...args: unknown[]) {
    return this.withRoot((root) => root.triggerKeypath<T>(keypath, ...args));
  }

  act<T>(action: () => T, {update = true} = {}): T {
    let result!: T;

    const afterResolve = () => {
      if (update) {
        this.rerender();
      }

      return result;
    };

    const promise = act(() => {
      result = action();

      // The return type of non-async `act()` contains a `then` method
      // This condition checks the returned value is an actual Promise and returns it
      // to Preact's `act()` call, otherwise we just want to return `undefined`
      if (isPromise(result)) {
        return (result as unknown) as Promise<void>;
      }
    });

    if (isPromise(result)) {
      if (update) {
        this.rerender();
      }

      return Promise.resolve(promise).then(afterResolve) as any;
    }

    return afterResolve();
  }

  mount() {
    if (this.mounted) {
      throw new Error('Attempted to mount a node that was already mounted');
    }

    if (this.element.parentNode == null) {
      document.body.appendChild(this.element);
      connected.add(this);
    }

    this.act(() => {
      render(
        <TestWrapper<Props>
          ref={(wrapper) => {
            this.wrapper = wrapper;
          }}
          render={this.render}
        >
          {this.vdom}
        </TestWrapper>,
        this.element,
      );
    });
  }

  rerender() {
    this._rerender();
    this.buildElementsFromVDOM();
  }

  unmount() {
    if (!this.mounted) {
      throw new Error(
        'You attempted to unmount a node that was already unmounted',
      );
    }

    this.ensureRoot();
    this.act(() => unmountComponentAtNode(this.element));
  }

  destroy() {
    const {element, mounted} = this;

    if (mounted) {
      this.unmount();
    }

    element.remove();
    connected.delete(this);
  }

  setProps(props: Partial<Props>) {
    this.ensureRoot();
    this.act(() => this.wrapper!.setProps(props));
  }

  forceUpdate() {
    this.ensureRoot();
    this.act(() => this.wrapper!.forceUpdate());
  }

  debug(options?: DebugOptions) {
    this.ensureRoot();
    return this.root!.debug(options);
  }

  toString() {
    return this.withRoot((root) => root.toString());
  }

  private buildElementsFromVDOM() {
    if (this.wrapper) {
      const vnode = getVNode(this.wrapper);
      const topElement = buildElementWrappers(vnode, this)[0];
      this.root = this.resolveRoot(topElement as any) as any;
    } else {
      this.root = null;
    }
  }

  private ensureRoot() {
    if (this.wrapper == null || this.root == null) {
      throw new Error(
        'Attempted to operate on a mounted tree, but the component is no longer mounted' +
          '\nwrapper: ' +
          this.wrapper +
          '\nroot: ' +
          this.root,
      );
    }
  }

  private withRoot<T>(task: (root: Element<Props>) => T): T {
    this.ensureRoot();
    return task(this.root!);
  }
}

function defaultResolveRoot(element: Element<any>) {
  if (element.children.length == 0) {
    return element;
  }

  return element.children[0];
}

function defaultRender(element: VNode<unknown>) {
  return element;
}

function buildElementWrappers(node: ComponentChild, root: Root<any>): NodeTree {
  if (node == null) {
    return [] as Element<any>[];
  }

  if (isTextNode(node)) {
    return [node.props];
  }

  if (isVNode(node)) {
    const props = {...node.props};
    const {children, descendants} = childrenToTree(getDescendants(node), root);

    return [
      new Element(
        {
          type: node.type,
          props,
          instance: getComponent(node) || getDOMNode(node),
        },
        children,
        descendants,
        root,
      ),
      ...descendants,
    ];
  }
  
  return [node.toString()];
}

function isVNode(maybeNode: ComponentChild): maybeNode is VNode<unknown> {
  return (
    typeof maybeNode === 'object' &&
    maybeNode != null &&
    Reflect.has(maybeNode, 'props')
  );
}

function childrenToTree(inputChildren: ComponentChild, root: Root<any>) {
  const children: NodeTree = [];
  const descendants: NodeTree = [];
  
  for (const child of array(inputChildren)) {
    const wrappers = buildElementWrappers(child, root);
    if (wrappers.length > 0) {
      children.push(wrappers[0]);
      descendants.push(...wrappers);
    }
  }
  
  return {children, descendants};
}
