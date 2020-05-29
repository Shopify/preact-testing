"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var root_1 = require("./root");
function destroyAll() {
    var e_1, _a;
    try {
        for (var _b = tslib_1.__values(tslib_1.__spread(root_1.connected)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var wrapper = _c.value;
            wrapper.destroy();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.destroyAll = destroyAll;
