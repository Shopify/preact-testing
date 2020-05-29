"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var props_1 = require("./props");
var components_1 = require("./components");
var context_1 = require("./context");
var strings_1 = require("./strings");
expect.extend({
    toHaveProps: props_1.toHaveProps,
    toHaveDataProps: props_1.toHaveDataProps,
    toContainComponent: components_1.toContainComponent,
    toContainComponentTimes: components_1.toContainComponentTimes,
    toContainText: strings_1.toContainText,
    toContainHtml: strings_1.toContainHtml,
    toProvideContext: context_1.toProvideContext,
    toHaveReactProps: props_1.toHaveProps,
    toHaveReactDataProps: props_1.toHaveDataProps,
    toContainReactComponent: components_1.toContainComponent,
    toContainReactComponentTimes: components_1.toContainComponentTimes,
    toContainReactText: strings_1.toContainText,
    toContainReactHtml: strings_1.toContainHtml,
    toProvideReactContext: context_1.toProvideContext,
});
