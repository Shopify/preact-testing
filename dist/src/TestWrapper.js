"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var TestWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(TestWrapper, _super);
    function TestWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // eslint-disable-next-line shopify/react-prefer-private-members
    TestWrapper.prototype.setProps = function (props) {
        this.props.children.props = tslib_1.__assign(tslib_1.__assign({}, this.props.children.props), props);
        this.forceUpdate();
    };
    TestWrapper.prototype.render = function () {
        var _a = this.props, children = _a.children, render = _a.render;
        return render(children);
    };
    return TestWrapper;
}(preact_1.Component));
exports.TestWrapper = TestWrapper;
