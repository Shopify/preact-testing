"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var utilities_1 = require("./utilities");
function toHaveProps(node, props) {
    var _this = this;
    utilities_1.assertIsNode(node, {
        expectation: 'toHavePreactProps',
        isNot: this.isNot,
    });
    if (props == null || typeof props !== 'object') {
        return {
            pass: false,
            message: function () {
                return "You passed " + (props == null ? String(props) : "a " + typeof props) + " as props, but it must be an object.";
            },
        };
    }
    var pass = Object.keys(props).every(function (key) {
        return _this.equals(props[key], node.props[key]);
    });
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toHavePreactProps', node.toString()) + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to have props:\n  " + jest_matcher_utils_1.printExpected(props) + "\n") +
                ("Received:\n  " + jest_matcher_utils_1.printReceived(node.props) + "\n");
        }
        : function () {
            var diffString = utilities_1.diffPropsForNode(node, props, {
                expand: _this.expand,
            });
            return (jest_matcher_utils_1.matcherHint('.toHavePreactProps', node.toString()) + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("To have props:\n  " + jest_matcher_utils_1.printExpected(props) + "\n") +
                ("Received:\n  " + jest_matcher_utils_1.printReceived(node.props) + "\n" + (diffString ? "Difference:\n" + diffString + "\n" : '')));
        };
    return { pass: pass, message: message };
}
exports.toHaveProps = toHaveProps;
function toHaveDataProps(node, data) {
    return toHaveProps.call(this, node, data);
}
exports.toHaveDataProps = toHaveDataProps;
