"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var toPreactString_1 = require("./toPreactString");
var Element = /** @class */ (function () {
    function Element(tree, allChildren, allDescendants, root) {
        this.tree = tree;
        this.allChildren = allChildren;
        this.allDescendants = allDescendants;
        this.root = root;
        this.elementChildren = allChildren.filter(function (element) { return typeof element !== 'string'; });
        this.elementDescendants = allDescendants.filter(function (element) { return typeof element !== 'string'; });
    }
    Object.defineProperty(Element.prototype, "props", {
        get: function () {
            return this.tree.props;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "displayName", {
        get: function () {
            var _a;
            if (this.isDOM) {
                return this.type;
            }
            return ((_a = this.type) === null || _a === void 0 ? void 0 : _a.displayName) || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "type", {
        get: function () {
            return this.tree.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "isDOM", {
        get: function () {
            return typeof this.tree.type == 'string';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "instance", {
        get: function () {
            return this.tree.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "children", {
        get: function () {
            return this.elementChildren;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "descendants", {
        get: function () {
            return this.elementDescendants;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "domNodes", {
        get: function () {
            if (this.isDOM) {
                return [this.instance];
            }
            return this.elementChildren
                .filter(function (element) { return element.isDOM; })
                .map(function (element) { return element.instance; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "domNode", {
        get: function () {
            var domNodes = this.domNodes;
            if (domNodes.length > 1) {
                throw new Error('You can’t call getDOMNode() on an element that returns multiple HTML elements. Call getDOMNodes() to retrieve all of the elements instead.');
            }
            return domNodes[0] || null;
        },
        enumerable: true,
        configurable: true
    });
    Element.prototype.data = function (key) {
        return this.props[key.startsWith('data-') ? key : "data-" + key];
    };
    Element.prototype.prop = function (key) {
        return this.props[key];
    };
    Element.prototype.text = function () {
        var _a = this, instance = _a.instance, children = _a.children;
        if (instance instanceof HTMLElement) {
            return instance.textContent || '';
        }
        return children.reduce(function (text, child) {
            return text + (typeof child === 'string' ? child : child.text());
        }, '');
    };
    Element.prototype.html = function () {
        var _a = this, instance = _a.instance, children = _a.children;
        if (instance instanceof HTMLElement) {
            return instance.outerHTML;
        }
        return children.reduce(function (text, child) {
            return text + (typeof child === 'string' ? child : child.html());
        }, '');
    };
    Element.prototype.is = function (type) {
        return isMatchingType(this.type, type);
    };
    Element.prototype.find = function (type, props) {
        return (this.elementDescendants.find(function (element) {
            return isMatchingType(element.type, type) &&
                (props == null || equalSubset(props, element.props));
        }) || null);
    };
    Element.prototype.findAll = function (type, props) {
        return this.elementDescendants.filter(function (element) {
            return isMatchingType(element.type, type) &&
                (props == null || equalSubset(props, element.props));
        });
    };
    Element.prototype.findWhere = function (predicate) {
        return this.elementDescendants.find(function (element) { return predicate(element); }) || null;
    };
    Element.prototype.findAllWhere = function (predicate) {
        return this.elementDescendants.filter(function (element) { return predicate(element); });
    };
    Element.prototype.trigger = function (prop) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.root.act(function () {
            var propValue = _this.props[prop];
            if (propValue == null) {
                throw new Error("Attempted to call prop " + prop + " but it was not defined.");
            }
            return propValue.apply(void 0, tslib_1.__spread(args));
        });
    };
    Element.prototype.triggerKeypath = function (keypath) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.root.act(function () {
            var e_1, _a;
            var props = _this.props;
            var parts = keypath.split(/[.[\]]/g).filter(Boolean);
            var currentProp = props;
            var currentKeypath = [];
            try {
                for (var parts_1 = tslib_1.__values(parts), parts_1_1 = parts_1.next(); !parts_1_1.done; parts_1_1 = parts_1.next()) {
                    var part = parts_1_1.value;
                    if (currentProp == null || typeof currentProp !== 'object') {
                        throw new Error("Attempted to access field keypath '" + currentKeypath.join('.') + "', but it was not an object.");
                    }
                    currentProp = currentProp[part];
                    currentKeypath.push(part);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) _a.call(parts_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (typeof currentProp !== 'function') {
                throw new Error("Value at keypath '" + keypath + "' is not a function.");
            }
            return currentProp.apply(void 0, tslib_1.__spread(args));
        });
    };
    Element.prototype.debug = function (options) {
        return toPreactString_1.toPreactString(this, options);
    };
    Element.prototype.toString = function () {
        return "<" + toPreactString_1.nodeName(this) + " />";
    };
    return Element;
}());
exports.Element = Element;
function isMatchingType(type, test) {
    if (type === test) {
        return true;
    }
    if (test == null) {
        return false;
    }
    return test.type != null && isMatchingType(type, test.type);
}
function equalSubset(subset, full) {
    return Object.keys(subset).every(function (key) { return key in full && full[key] === subset[key]; });
}
