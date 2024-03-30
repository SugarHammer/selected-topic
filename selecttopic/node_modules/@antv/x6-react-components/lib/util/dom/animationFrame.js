"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAnimationFrame = exports.cancelAnimationFrame = void 0;
var animationFrameTime = 0;
var nativeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
exports.cancelAnimationFrame = (window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.clearTimeout).bind(window);
exports.requestAnimationFrame = nativeRequestAnimationFrame
    ? nativeRequestAnimationFrame.bind(window)
    : function (callback) {
        var currTime = Date.now();
        var timeDelay = Math.max(0, 16 - (currTime - animationFrameTime));
        animationFrameTime = currTime + timeDelay;
        return window.setTimeout(function () {
            callback(Date.now());
        }, timeDelay);
    };
//# sourceMappingURL=animationFrame.js.map