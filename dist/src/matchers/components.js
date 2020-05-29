"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var utilities_1 = require("./utilities");
function toContainComponent(node, type, props) {
    var _this = this;
    utilities_1.assertIsNode(node, {
        expectation: 'toContainComponent',
        isNot: this.isNot,
    });
    utilities_1.assertIsType(type, {
        expectation: 'toContainComponent',
        isNot: this.isNot,
    });
    var foundByType = node.findAll(type);
    var foundByProps = props == null
        ? foundByType
        : foundByType.filter(function (element) {
            return Object.keys(props).every(function (key) {
                return _this.equals(props[key], element.props[key]);
            });
        });
    var pass = foundByProps.length > 0;
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toContainComponent') + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(type)) + "\n" + (props ? "With props matching:\n  " + jest_matcher_utils_1.printExpected(props) + "\n" : '')) +
                ("But " + foundByProps.length + " matching " + utilities_1.printType(type) + " " + (foundByProps.length === 1 ? 'elements were' : 'element was') + " found.\n");
        }
        : function () {
            return "" + (jest_matcher_utils_1.matcherHint('.toContainComponent') + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("To contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(type)) + "\n" + (props ? "With props matching:\n  " + jest_matcher_utils_1.printExpected(props) + "\n" : ''))) + (foundByType.length === 0
                ? "But no matching " + utilities_1.printType(type) + " elements were found.\n"
                : "But the " + (foundByType.length === 1
                    ? 'found element has'
                    : 'found elements have') + " the following prop differences:\n\n" + utilities_1.diffs(foundByType, props, _this.expand));
        };
    return { pass: pass, message: message };
}
exports.toContainComponent = toContainComponent;
function toContainComponentTimes(node, type, times, props) {
    var _this = this;
    utilities_1.assertIsNode(node, {
        expectation: 'toContainComponentTimes',
        isNot: this.isNot,
    });
    utilities_1.assertIsType(type, {
        expectation: 'toContainComponent',
        isNot: this.isNot,
    });
    var foundByType = node.findAll(type);
    var foundByProps = props == null
        ? foundByType
        : foundByType.filter(function (element) {
            return Object.keys(props).every(function (key) {
                return _this.equals(props[key], element.props[key]);
            });
        });
    var pass = foundByProps.length === times;
    var message = pass
        ? function () {
            return [
                jest_matcher_utils_1.matcherHint('.not.toContainComponentTimes') + "\n",
                "Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()),
                "Not to contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(type)),
                times + " " + utilities_1.pluralize('time', times) + ", but it did.",
            ].join('\n');
        }
        : function () {
            return [
                jest_matcher_utils_1.matcherHint('.toContainComponentTimes') + "\n",
                "Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()),
                "To contain component:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(type)),
                times + " " + utilities_1.pluralize('time', times) + ", but it was found " + foundByProps.length + ".",
            ].join('\n');
        };
    return { pass: pass, message: message };
}
exports.toContainComponentTimes = toContainComponentTimes;
