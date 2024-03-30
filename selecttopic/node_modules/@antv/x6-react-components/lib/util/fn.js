"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.translatePosition = exports.getJudgeFunction = void 0;
var translate_1 = require("./dom/translate");
var functionReturnTrue = function () { return true; };
var functionReturnFalse = function () { return false; };
function getJudgeFunction(fn) {
    if (typeof fn !== 'function') {
        return fn ? functionReturnTrue : functionReturnFalse;
    }
    return fn;
}
exports.getJudgeFunction = getJudgeFunction;
function translatePosition(style, x, y, initialRender) {
    if (initialRender === void 0) { initialRender = false; }
    if (initialRender) {
        style.left = x + "px";
        style.top = y + "px";
    }
    else {
        (0, translate_1.translate)(style, x, y);
    }
}
exports.translatePosition = translatePosition;
function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
    if (setTimeoutFunc === void 0) { setTimeoutFunc = window.setTimeout; }
    if (clearTimeoutFunc === void 0) { clearTimeoutFunc = window.clearTimeout; }
    var timeout;
    var debouncer = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debouncer.reset();
        var callback = function () {
            func.apply(context, args);
        };
        timeout = setTimeoutFunc(callback, wait);
    };
    debouncer.reset = function () {
        clearTimeoutFunc(timeout);
    };
    return debouncer;
}
exports.debounce = debounce;
//# sourceMappingURL=fn.js.map