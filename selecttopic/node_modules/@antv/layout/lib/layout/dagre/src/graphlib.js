"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var graphlib_1 = __importDefault(require("@dagrejs/graphlib"));
var graphlib = graphlib_1.default;
if (!graphlib && typeof window !== "undefined") {
    graphlib = window.graphlib;
}
if (!Array.prototype.flat) {
    // @ts-ignore
    Array.prototype.flat = function (count) {
        var c = count || 1;
        if (!isFinite(c))
            return;
        var len = this.length;
        var ret = [];
        if (this.length === 0)
            return this;
        while (c--) {
            var arr = [];
            var flag = false;
            if (ret.length === 0) {
                flag = true;
                for (var i = 0; i < len; i++) {
                    if (this[i] instanceof Array) {
                        ret.push.apply(ret, this[i]);
                    }
                    else {
                        ret.push(this[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < ret.length; i++) {
                    if (ret[i] instanceof Array) {
                        flag = true;
                        arr.push.apply(arr, ret[i]);
                    }
                    else {
                        arr.push(ret[i]);
                    }
                }
                ret = arr;
            }
            if (!flag && c === Infinity) {
                break;
            }
        }
        return ret;
    };
}
exports.default = graphlib;
//# sourceMappingURL=graphlib.js.map