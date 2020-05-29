"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jest_matcher_utils_1 = require("jest-matcher-utils");
var utilities_1 = require("./utilities");
function toProvideContext(node, Context, value) {
    var _this = this;
    utilities_1.assertIsNode(node, {
        expectation: 'toProvideContext',
        isNot: this.isNot,
    });
    var foundByType = node.findAll(Context.Provider);
    var foundByValue = value == null
        ? foundByType
        : foundByType.filter(function (element) {
            // preact's context provider types are awkward here
            return _this.equals(value, element.prop('value'));
        });
    var pass = foundByValue.length > 0;
    var message = pass
        ? function () {
            return jest_matcher_utils_1.matcherHint('.not.toProvideContext') + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("Not to contain context provider:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(Context.Provider)) + "\n" + (value ? "With value matching:\n  " + jest_matcher_utils_1.printExpected(value) + "\n" : '')) +
                ("But " + foundByValue.length + " matching " + utilities_1.printType(Context.Provider) + (foundByValue.length === 1 ? 's were' : ' was') + " found.\n");
        }
        : function () {
            return "" + (jest_matcher_utils_1.matcherHint('.toProvideContext') + "\n\n" +
                ("Expected the element:\n  " + jest_matcher_utils_1.RECEIVED_COLOR(node.toString()) + "\n") +
                ("To contain context provider:\n  " + jest_matcher_utils_1.EXPECTED_COLOR(utilities_1.printType(Context.Provider)) + "\n" + (value ? "With value matching:\n  " + jest_matcher_utils_1.printExpected(value) + "\n" : ''))) + (foundByType.length === 0
                ? "But no matching " + utilities_1.printType(Context.Provider) + "s were found.\n"
                : "But the " + (foundByType.length === 1
                    ? 'found provider has'
                    : 'found provider have') + " had different values:\n\n" + utilities_1.diffs(foundByType, { value: value }, _this.expand));
        };
    return { pass: pass, message: message };
}
exports.toProvideContext = toProvideContext;
