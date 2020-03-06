"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jest_matcher_utils_1 = require("jest-matcher-utils");
function toReactString(node, options, level) {
    if (options === void 0) { options = {}; }
    if (level === void 0) { level = 0; }
    // if this is an array node then print all children at the current level
    if (!node.type && node.children.length > 0) {
        return node.children
            .map(function (child) { return toReactString(child, options, level); })
            .join('\n');
    }
    var name = nodeName(node);
    var indent = '  '.repeat(level);
    var props = Object.keys(node.props)
        // we always filter out children no matter what, but unless allProps option
        // is present we will also filter out insigificant props
        .filter(function (key) {
        return options.allProps
            ? key !== 'children'
            : !/^(children|className)$|^(aria|data)-/.test(key);
    })
        .reduce(function (list, key) {
        if (!key) {
            return list;
        }
        var value = node.props[key];
        if (value === undefined && !options.allProps) {
            return list;
        }
        list.push(toPropString(key, value, options.verbosity));
        return list;
    }, []);
    var hasChildren = node.children.length > 0 && !['svg'].includes(name);
    var open = indent + "<" + name + (props.length > 0 ? " " + props.join(' ') : '') + (hasChildren ? '>' : ' />');
    if (!hasChildren) {
        return open;
    }
    var close = indent + "</" + name + ">";
    if (options.depth != null && level >= options.depth) {
        return [
            open,
            indent + "  {/* <" + node.children.length + " child" + (node.children.length === 1 ? '' : 'ren') + "... /> */}",
            close,
        ].join('\n');
    }
    return tslib_1.__spread([
        open
    ], node.children.map(function (child) { return toReactString(child, options, level + 1); }), [
        close,
    ]).join('\n');
}
exports.toReactString = toReactString;
function toPropString(key, value, verbosity) {
    if (verbosity === void 0) { verbosity = 1; }
    if (value === undefined) {
        return key + "={undefined}";
    }
    if (value === null) {
        return key + "={null}";
    }
    if (typeof value === 'string') {
        return key + "=\"" + value + "\"";
    }
    if (typeof value === 'boolean' && value) {
        return value ? "" + key : key + "={false}";
    }
    if (value instanceof Array) {
        return key + "={" + jest_matcher_utils_1.stringify(value, verbosity + 1) + "}";
    }
    return key + "={" + jest_matcher_utils_1.stringify(value, verbosity) + "}";
}
exports.toPropString = toPropString;
function nodeName(_a) {
    var type = _a.type;
    if (type && typeof type === 'object' && '_context' in type) {
        var context = type._context;
        return (context.displayName || 'Context') + "." + (type === context.Provider ? 'Provider' : 'Consumer');
    }
    if (type == null) {
        return 'Node';
    }
    return typeof type === 'string'
        ? type
        : type.displayName || type.name || 'Component';
}
exports.nodeName = nodeName;
