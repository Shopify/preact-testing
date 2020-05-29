"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var root_1 = require("../root");
var element_1 = require("../element");
function assertIsNode(node, _a) {
    var expectation = _a.expectation, isNot = _a.isNot;
    if (node == null) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/preact-testing Root or Element object", "Received " + jest_matcher_utils_1.RECEIVED_COLOR('null') + ".\nThis usually means that your `.findX` method failed to find any matching elements."));
    }
    if (Array.isArray(node) &&
        node.length > 1 &&
        (node[0] instanceof root_1.Root || node[0] instanceof element_1.Element)) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/preact-testing Root or Element object", "Received an " + jest_matcher_utils_1.RECEIVED_COLOR('array of Root or Element objects') + ".\nThis usually means that you passed in the result of `.findAllX`. Pass the result of `.findX` instead."));
    }
    if (!(node instanceof root_1.Root) && !(node instanceof element_1.Element)) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('received') + " value must be an @shopify/preact-testing Root or Element object", jest_matcher_utils_1.printWithType('Received', node, jest_matcher_utils_1.printReceived)));
    }
}
exports.assertIsNode = assertIsNode;
function assertIsType(type, _a) {
    var expectation = _a.expectation, isNot = _a.isNot;
    if (type == null) {
        throw new Error(jest_matcher_utils_1.matcherErrorMessage(jest_matcher_utils_1.matcherHint("." + expectation, undefined, undefined, { isNot: isNot }), jest_matcher_utils_1.RECEIVED_COLOR('expected') + " value must be a string or a valid Preact component.", jest_matcher_utils_1.printWithType('Expected', type, jest_matcher_utils_1.printExpected)));
    }
}
exports.assertIsType = assertIsType;
function diffs(element, props, expand) {
    return element.reduce(function (diffs, element, index) {
        var separator = index === 0 ? '' : '\n\n';
        return "" + diffs + separator + normalizedDiff(element, props, {
            expand: expand,
            showLegend: index === 0,
        });
    }, '');
}
exports.diffs = diffs;
function normalizedDiff(element, props, _a) {
    var _b = _a.expand, expand = _b === void 0 ? false : _b, _c = _a.showLegend, showLegend = _c === void 0 ? false : _c;
    var result = diffPropsForNode(element, props, {
        expand: expand,
    }) || '';
    return showLegend ? result : result.split('\n\n')[1];
}
function printType(type) {
    if (typeof type === 'object' && '_context' in type) {
        var context = type._context;
        var componentName = type === context.Provider ? 'Provider' : 'Consumer';
        var displayName_1 = context.displayName || 'Context';
        return "<" + displayName_1 + "." + componentName + " />";
    }
    var displayName = typeof type === 'string'
        ? type
        : type.displayName || type.name || 'Component';
    return "<" + displayName + " />";
}
exports.printType = printType;
function diffPropsForNode(node, props, _a) {
    var _b = _a.expand, expand = _b === void 0 ? false : _b;
    return jest_matcher_utils_1.diff(props, getObjectSubset(node.props, props), {
        expand: expand,
    });
}
exports.diffPropsForNode = diffPropsForNode;
// Original from https://github.com/facebook/jest/blob/master/packages/expect/src/utils.ts#L107
function getObjectSubset(object, subset) {
    if (Array.isArray(object)) {
        if (Array.isArray(subset) && subset.length === object.length) {
            return subset.map(function (sub, i) {
                return getObjectSubset(object[i], sub);
            });
        }
    }
    else if (object instanceof Date) {
        return object;
    }
    else if (typeof object === 'object' &&
        object !== null &&
        typeof subset === 'object' &&
        subset !== null) {
        var trimmed_1 = {};
        Object.keys(subset)
            .filter(function (key) { return Reflect.has(object, key); })
            .forEach(function (key) { return (trimmed_1[key] = getObjectSubset(object[key], subset[key])); });
        if (Object.keys(trimmed_1).length > 0) {
            return trimmed_1;
        }
    }
    return object;
}
function pluralize(word, count) {
    return count === 1 ? word : word + "s";
}
exports.pluralize = pluralize;
