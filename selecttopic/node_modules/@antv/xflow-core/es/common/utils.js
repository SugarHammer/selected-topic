export const noop = () => null;
export const disposableNoop = {
    dispose: noop,
};
export function debounce(cb, time) {
    let flag;
    return () => {
        clearTimeout(flag);
        flag = window.setTimeout(cb, time);
    };
}
export function throttle(cb) {
    let flag;
    return () => {
        if (!flag) {
            flag = requestAnimationFrame(() => {
                flag = null;
                cb();
            });
        }
    };
}
export const insertCss = (cssString) => {
    const $style = document.createElement('style');
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
// refer:https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
export function isClassComponent(component) {
    return typeof component === 'function' && !!component.prototype.isReactComponent;
}
export function isFunctionComponent(component) {
    return typeof component === 'function' && String(component).includes('return React.createElement');
}
export function isReactComponent(component) {
    return isClassComponent(component) || isFunctionComponent(component);
}
//# sourceMappingURL=utils.js.map