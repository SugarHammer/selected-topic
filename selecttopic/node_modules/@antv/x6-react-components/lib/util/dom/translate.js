"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
var getVendorPrefix_1 = require("./getVendorPrefix");
var browserSupport_1 = require("./browserSupport");
var transform = (0, getVendorPrefix_1.getVendorPrefix)('transform');
var backfaceVisibility = (0, getVendorPrefix_1.getVendorPrefix)('backfaceVisibility');
exports.translate = (function () {
    if ((0, browserSupport_1.hasCSSTransforms)()) {
        var ua = window ? window.navigator.userAgent : '';
        var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
        // It appears that Safari messes up the composition order
        // of GPU-accelerated layers
        // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
        // Use 2D translation instead.
        if (!isSafari && (0, browserSupport_1.hasCSS3DTransforms)()) {
            return function (style, x, y) {
                style[transform] = "translate3d(" + x + "px," + y + "px,0)";
                style[backfaceVisibility] = 'hidden';
            };
        }
        return function (style, x, y) {
            style[transform] = "translate(" + x + "px," + y + "px)";
        };
    }
    return function (style, x, y) {
        style.left = x + "px";
        style.top = y + "px";
    };
})();
//# sourceMappingURL=translate.js.map