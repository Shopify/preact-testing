"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var root_1 = require("./root");
exports.Root = root_1.Root;
var element_1 = require("./element");
exports.Element = element_1.Element;
function mount(element) {
    return new root_1.Root(element);
}
exports.mount = mount;
var CustomRoot = /** @class */ (function (_super) {
    tslib_1.__extends(CustomRoot, _super);
    function CustomRoot(tree, context, options) {
        var _this = _super.call(this, tree, options) || this;
        _this.context = context;
        return _this;
    }
    return CustomRoot;
}(root_1.Root));
exports.CustomRoot = CustomRoot;
function createMount(_a) {
    var render = _a.render, _b = _a.context, createContext = _b === void 0 ? defaultContext : _b, _c = _a.afterMount, afterMount = _c === void 0 ? defaultAfterMount : _c;
    function mount(element, options) {
        if (options === void 0) { options = {}; }
        var context = createContext(options);
        var wrapper = new CustomRoot(element, context, {
            render: function (element) { return render(element, context, options); },
            resolveRoot: function (root) {
                return root.find(element.type);
            }
        });
        var afterMountResult = afterMount(wrapper, options);
        return afterMountResult != null && 'then' in afterMountResult
            ? afterMountResult.then(function () { return wrapper; })
            : wrapper;
    }
    Reflect.defineProperty(mount, 'extend', {
        writable: false,
        value: function (_a) {
            var _b = _a.context, createAdditionalContext = _b === void 0 ? defaultContext : _b, additionalRender = _a.render, _c = _a.afterMount, additionalAfterMount = _c === void 0 ? defaultAfterMount : _c;
            return createMount({
                context: function (options) { return (tslib_1.__assign(tslib_1.__assign({}, createContext(options)), createAdditionalContext(options))); },
                render: function (element, context, options) {
                    return render(additionalRender(element, context, options), context, options);
                },
                afterMount: function (wrapper, options) {
                    var result = additionalAfterMount(wrapper, options);
                    var finalResult = function () { return afterMount(wrapper, options); };
                    return result != null && 'then' in result
                        ? result.then(finalResult)
                        : finalResult();
                },
            });
        },
    });
    return mount;
}
exports.createMount = createMount;
function defaultContext() {
    return {};
}
function defaultAfterMount() { }
