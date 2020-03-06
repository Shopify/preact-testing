import { Component, VNode } from 'preact';
/**
 * Preact mangles it's private internals, this module helps us access them safely(ish)
 * See https://github.com/preactjs/preact/blob/master/mangle.json
 */
interface PreactComponent<P> extends Component<P> {
    __v: VNode;
}
interface PreactVNode<P> extends VNode<P> {
    __e: Node | null;
    __c: PreactComponent<P> | null;
    __k: VNode[] | null;
}
interface TextNode {
    type: null;
    props: string;
}
export declare type PortalNode = PreactVNode<PortalProps>;
interface PortalProps {
    vnode: PreactVNode<unknown>;
    container: HTMLElement;
}
/**
 * Return the descendants of the given vnode from it's last render.
 */
export declare function getDescendants<P>(node: VNode<P>): PreactVNode<unknown> | VNode<{}>[];
/**
 * Return the rendered DOM node associated with a rendered VNode.
 */
export declare function getDOMNode<P>(node: VNode<P>): Node | null;
/**
 * Return the `Component` instance associated with a rendered VNode.
 */
export declare function getComponent<P>(node: VNode<P>): PreactComponent<P> | null;
/**
 * Return the `VNode` associated with a component.
 */
export declare function getVNode<P>(component: Component<P>): VNode<{}>;
export declare function isPortal(node: VNode<unknown>): node is VNode<PortalProps>;
export declare function isTextNode(node: any): node is TextNode;
export declare function getPortalContainer<P>(node: VNode<P>): HTMLElement;
export declare function getPortalContent<P>(node: VNode<P>): PreactVNode<unknown>;
export declare function getChildren<P>(node: VNode<P>): string | number | boolean | object | null | undefined;
export {};
//# sourceMappingURL=preact-utilities.d.ts.map