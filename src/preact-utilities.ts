import {Component, VNode, options} from 'preact';

/**
 * Preact mangles it's private internals, this module helps us access them safely(ish)
 * See https://github.com/preactjs/preact/blob/master/mangle.json
 */

interface PreactComponent<P> extends Component<P> {
  __v: VNode;
}

interface PreactVNode<P> extends VNode<P> {
  // the DOM node
  __e: Node | null;

  // the component instance
  __c: PreactComponent<P> | null;

  // the rendered children
  __k: VNode[] | null;
}

/**
 * Return the descendants of the given vnode from it's last render.
 */
export function getDescendants<P>(node: VNode<P>): VNode[] {
  return (node as PreactVNode<P>).__k || [];
}

/**
 * Return the rendered DOM node associated with a rendered VNode.
 */
export function getDOMNode<P>(node: VNode<P>): Node | null {
  return (node as PreactVNode<P>).__e;
}

/**
 * Return the `Component` instance associated with a rendered VNode.
 */
export function getComponent<P>(node: VNode<P>): PreactComponent<P> | null {
  return (node as PreactVNode<P>).__c;
}

/**
 * Return the `VNode` associated with a component.
 */
export function getVNode<P>(component: Component<P>) {
  return (component as PreactComponent<P>).__v;
}

/**
 * Simplified version of Preact's render queueing, render in the next tick
 */
function defer(callback: () => any) {
  Promise.resolve().then(callback);
}

let debounceInstalled = false;
const pendingRenders = new Set<() => any>();

/**
 * Install an `options.debounceRendering` hook that tracks any renders scheduled by Preact
 */
export function installRenderQueue() {
  if (debounceInstalled) {
    return;
  }
  
  const originalDebounce = options.debounceRendering || defer;
  
  function debounceRender(callback: () => any) {
    pendingRenders.add(callback);
    originalDebounce.call(null, callback);
  }

  options.debounceRendering = debounceRender;
  debounceInstalled = true;
}

/**
 * Run all pending renders
 */
export function rerender() {
  pendingRenders.forEach(cb => cb());
  pendingRenders.clear();
}
