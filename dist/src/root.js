"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var compat_1 = require("preact/compat");
var test_utils_1 = require("preact/test-utils");
var TestWrapper_1 = require("./TestWrapper");
var element_1 = require("./element");
var util_1 = require("./util");
var preact_utilities_1 = require("./preact-utilities");
exports.connected = new Set();
var Root = /** @class */ (function () {
    function Root(vdom, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.render, render = _c === void 0 ? defaultRender : _c, _d = _b.resolveRoot, resolveRoot = _d === void 0 ? defaultResolveRoot : _d;
        this.vdom = vdom;
        this.wrapper = null;
        this.wrappedVDom = null;
        this.element = document.createElement('div');
        this.root = null;
        this._rerender = test_utils_1.setupRerender();
        this.resolveRoot = resolveRoot;
        this.render = render;
        this.mount();
    }
    Object.defineProperty(Root.prototype, "props", {
        get: function () {
            return this.withRoot(function (root) { return root.props; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "isDOM", {
        get: function () {
            return this.withRoot(function (root) { return root.isDOM; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "type", {
        get: function () {
            return this.withRoot(function (root) { return root.type; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "instance", {
        get: function () {
            return this.withRoot(function (root) { return root.instance; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "children", {
        get: function () {
            return this.withRoot(function (root) { return root.children; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "descendants", {
        get: function () {
            return this.withRoot(function (root) { return root.descendants; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "domNodes", {
        get: function () {
            return this.withRoot(function (root) { return root.domNodes; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "domNode", {
        get: function () {
            return this.withRoot(function (root) { return root.domNode; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Root.prototype, "mounted", {
        get: function () {
            return this.wrapper != null;
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.html = function () {
        return this.withRoot(function (root) { return root.html(); });
    };
    Root.prototype.text = function () {
        return this.withRoot(function (root) { return root.text(); });
    };
    Root.prototype.is = function (type) {
        return this.withRoot(function (root) { return root.is(type); });
    };
    Root.prototype.prop = function (key) {
        return this.withRoot(function (root) { return root.prop(key); });
    };
    Root.prototype.data = function (key) {
        return this.withRoot(function (root) { return root.data(key); });
    };
    Root.prototype.find = function (type, props) {
        return this.withRoot(function (root) { return root.find(type, props); });
    };
    Root.prototype.findAll = function (type, props) {
        return this.withRoot(function (root) { return root.findAll(type, props); });
    };
    Root.prototype.findWhere = function (predicate) {
        return this.withRoot(function (root) { return root.findWhere(predicate); });
    };
    Root.prototype.findAllWhere = function (predicate) {
        return this.withRoot(function (root) { return root.findAllWhere(predicate); });
    };
    Root.prototype.trigger = function (prop) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.withRoot(function (root) { return root.trigger.apply(root, tslib_1.__spread([prop], args)); });
    };
    Root.prototype.triggerKeypath = function (keypath) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.withRoot(function (root) { return root.triggerKeypath.apply(root, tslib_1.__spread([keypath], args)); });
    };
    Root.prototype.act = function (action, _a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).update, update = _b === void 0 ? true : _b;
        var result;
        var afterResolve = function () {
            if (update) {
                _this.rerender();
            }
            return result;
        };
        var promise = test_utils_1.act(function () {
            result = action();
            // The return type of non-async `act()` contains a `then` method
            // This condition checks the returned value is an actual Promise and returns it
            // to Preact's `act()` call, otherwise we just want to return `undefined`
            if (util_1.isPromise(result)) {
                return result;
            }
        });
        if (util_1.isPromise(result)) {
            if (update) {
                this.rerender();
            }
            return Promise.resolve(promise).then(afterResolve);
        }
        return afterResolve();
    };
    Root.prototype.mount = function () {
        var _this = this;
        if (this.mounted) {
            throw new Error('Attempted to mount a node that was already mounted');
        }
        if (this.element.parentNode == null) {
            document.body.appendChild(this.element);
            exports.connected.add(this);
        }
        this.wrappedVDom = (preact_1.h(TestWrapper_1.TestWrapper, { ref: function (wrapper) {
                _this.wrapper = wrapper;
            }, render: this.render }, this.vdom));
        preact_1.render(this.wrappedVDom, this.element);
        this.buildElementsFromVDOM();
        // force a rerender to allow `useEffect` state updates to be represented
        this.forceUpdate();
    };
    Root.prototype.rerender = function () {
        this._rerender();
        this.buildElementsFromVDOM();
    };
    Root.prototype.unmount = function () {
        var _this = this;
        if (!this.mounted) {
            throw new Error('You attempted to unmount a node that was already unmounted');
        }
        this.ensureRoot();
        this.act(function () { return compat_1.unmountComponentAtNode(_this.element); });
    };
    Root.prototype.destroy = function () {
        var _a = this, element = _a.element, mounted = _a.mounted;
        if (mounted) {
            this.unmount();
        }
        element.remove();
        exports.connected.delete(this);
    };
    Root.prototype.setProps = function (props) {
        var _this = this;
        this.ensureRoot();
        this.act(function () { return _this.wrapper.setProps(props); });
    };
    Root.prototype.forceUpdate = function () {
        var _this = this;
        this.ensureRoot();
        this.act(function () { return _this.wrapper.forceUpdate(); });
    };
    Root.prototype.debug = function (options) {
        this.ensureRoot();
        return this.root.debug(options);
    };
    Root.prototype.toString = function () {
        return this.withRoot(function (root) { return root.toString(); });
    };
    Root.prototype.buildElementsFromVDOM = function () {
        if (this.wrapper) {
            var vnode = preact_utilities_1.getVNode(this.wrapper);
            var topElement = buildElementWrappers(vnode, this)[0];
            this.root = this.resolveRoot(topElement);
        }
        else {
            this.root = null;
        }
    };
    Root.prototype.ensureRoot = function () {
        if (this.wrapper == null || this.root == null) {
            throw new Error('Attempted to operate on a mounted tree, but the component is no longer mounted' +
                '\nwrapper: ' +
                this.wrapper +
                '\nroot: ' +
                this.root);
        }
    };
    Root.prototype.withRoot = function (task) {
        this.ensureRoot();
        return task(this.root);
    };
    return Root;
}());
exports.Root = Root;
function defaultResolveRoot(element) {
    if (element.children.length == 0) {
        return element;
    }
    return element.children[0];
}
function defaultRender(element) {
    return element;
}
function buildElementWrappers(node, root) {
    if (node == null) {
        return [];
    }
    if (preact_utilities_1.isTextNode(node)) {
        return [node.props];
    }
    if (isVNode(node)) {
        var props = tslib_1.__assign({}, node.props);
        var _a = childrenToTree(preact_utilities_1.getDescendants(node), root), children = _a.children, descendants = _a.descendants;
        return tslib_1.__spread([
            new element_1.Element({
                type: node.type,
                props: props,
                instance: preact_utilities_1.getComponent(node) || preact_utilities_1.getDOMNode(node),
            }, children, descendants, root)
        ], descendants);
    }
    return [node.toString()];
}
function isVNode(maybeNode) {
    return (typeof maybeNode === 'object' &&
        maybeNode != null &&
        Reflect.has(maybeNode, 'props'));
}
function childrenToTree(inputChildren, root) {
    var e_1, _a;
    var children = [];
    var descendants = [];
    try {
        for (var _b = tslib_1.__values(util_1.array(inputChildren)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            var wrappers = buildElementWrappers(child, root);
            children.push(wrappers[0]);
            descendants.push.apply(descendants, tslib_1.__spread(wrappers));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { children: children, descendants: descendants };
}
