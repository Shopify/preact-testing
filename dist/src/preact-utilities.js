"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var compat_1 = require("preact/compat");
/**
 * Return the descendants of the given vnode from it's last render.
 */
function getDescendants(node) {
    if (isPortal(node)) {
        return getPortalContent(node);
    }
    return node.__k || [];
}
exports.getDescendants = getDescendants;
/**
 * Return the rendered DOM node associated with a rendered VNode.
 */
function getDOMNode(node) {
    return node.__e;
}
exports.getDOMNode = getDOMNode;
/**
 * Return the `Component` instance associated with a rendered VNode.
 */
function getComponent(node) {
    return node.__c;
}
exports.getComponent = getComponent;
/**
 * Return the `VNode` associated with a component.
 */
function getVNode(component) {
    return component.__v;
}
exports.getVNode = getVNode;
// Portals always use the same component function but it is only accessible by the `type` of the vdom node returned by `createPortal`
var PORTAL_TYPE = compat_1.createPortal(preact_1.h("div", null, "dummy portal"), document.createElement('div')).type;
function isPortal(node) {
    return node.type === PORTAL_TYPE;
}
exports.isPortal = isPortal;
// Text nodes in peact are very weird, they actually have a null `type` field (despite that not being part of the type for VNode) and their props are just the text content (despite that being typed as an object)
function isTextNode(node) {
    return node.type === null && typeof node.props === 'string';
}
exports.isTextNode = isTextNode;
function getPortalContainer(node) {
    return node.props.container;
}
exports.getPortalContainer = getPortalContainer;
function getPortalContent(node) {
    return node.props.vnode;
}
exports.getPortalContent = getPortalContent;
function getChildren(node) {
    if (isPortal(node)) {
        return getPortalContent(node);
    }
    return node.props.children;
}
exports.getChildren = getChildren;
