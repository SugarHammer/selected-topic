"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactComponent = exports.isFunctionComponent = exports.isClassComponent = exports.insertCss = exports.throttle = exports.debounce = exports.disposableNoop = exports.noop = void 0;
var noop = function () { return null; };
exports.noop = noop;
exports.disposableNoop = {
    dispose: exports.noop,
};
function debounce(cb, time) {
    var flag;
    return function () {
        clearTimeout(flag);
        flag = window.setTimeout(cb, time);
    };
}
exports.debounce = debounce;
function throttle(cb) {
    var flag;
    return function () {
        if (!flag) {
            flag = requestAnimationFrame(function () {
                flag = null;
                cb();
            });
        }
    };
}
exports.throttle = throttle;
var insertCss = function (cssString) {
    var $style = document.createElement('style');
    $style.setAttribute('type', 'text/css');
    document.head.appendChild($style);
    // This is required for IE8 and below.
    // @ts-ignore
    if ($style.styleSheet) {
        // @ts-ignore
        $style.styleSheet.cssText = cssString;
    }
    else {
        $style.appendChild(document.createTextNode(cssString));
    }
    return $style;
};
exports.insertCss = insertCss;
// refer:https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
function isClassComponent(component) {
    return typeof component === 'function' && !!component.prototype.isReactComponent;
}
exports.isClassComponent = isClassComponent;
function isFunctionComponent(component) {
    return typeof component === 'function' && String(component).includes('return React.createElement');
}
exports.isFunctionComponent = isFunctionComponent;
function isReactComponent(component) {
    return isClassComponent(component) || isFunctionComponent(component);
}
exports.isReactComponent = isReactComponent;
//# sourceMappingURL=utils.js.map