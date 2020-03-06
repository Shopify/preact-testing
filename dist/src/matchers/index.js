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
});
