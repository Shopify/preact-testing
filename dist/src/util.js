"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
function array(maybeArray) {
    if (maybeArray == null) {
        return [];
    }
    if (Array.isArray(maybeArray)) {
        return maybeArray;
    }
    return [maybeArray];
}
exports.array = array;
function isPromise(promise) {
    return (promise != null && typeof promise === "object" && "then" in promise);
}
exports.isPromise = isPromise;
