import {h, Component, VNode} from 'preact';
import {createPortal, Fragment} from 'preact/compat';

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

interface TextNode {
  type: null;

  props: string;
}

export type PortalNode = PreactVNode<PortalProps>;

interface PortalProps {
  vnode: PreactVNode<unknown>;
  container: HTMLElement;
}

/**
 * Return the descendants of the given vnode from it's last render.
 */
export function getDescendants<P>(node: VNode<P>) {
  if (isPortal(node)) {
    return getPortalContent(node);
  }

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

// Portals always use the same component function but it is only accessible by the `type` of the vdom node returned by `createPortal`
const PORTAL_TYPE = createPortal(
  <div>dummy portal</div>,
  document.createElement('div'),
).type;
export function isPortal(node: VNode<unknown>): node is VNode<PortalProps> {
  return node.type === PORTAL_TYPE;
}

// Text nodes in peact are very weird, they actually have a null `type` field (despite that not being part of the type for VNode) and their props are just the text content (despite that being typed as an object)
export function isTextNode(node: any): node is TextNode {
  return node.type === null && typeof node.props === 'string';
}

export function getPortalContainer<P>(node: VNode<P>) {
  return ((node as any) as PreactVNode<PortalProps>).props.container;
}

export function getPortalContent<P>(node: VNode<P>) {
  return ((node as any) as PreactVNode<PortalProps>).props.vnode;
}

export function getChildren<P>(node: VNode<P>) {
  if (isPortal(node)) {
    return getPortalContent(node);
  }

  return node.props.children;
}
