"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputNumber = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
function transformValue(val) {
    var result = Number(val);
    return Number.isNaN(result) ? undefined : result;
}
var InputNumber = function (props) {
    var disabled = props.disabled, placeholder = props.placeholder, value = props.value, onChange = props.onChange;
    var _a = (0, react_1.useState)(transformValue(value)), innerValue = _a[0], setInnerValue = _a[1];
    var mountedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!mountedRef.current) {
            mountedRef.current = true;
        }
        setInnerValue(transformValue(value));
    }, [value]);
    var onValueChange = (0, react_1.useCallback)(function (nextValue) {
        setInnerValue(nextValue);
        if (typeof onChange === 'function') {
            if (nextValue === undefined) {
                onChange('');
            }
            else if (typeof transformValue(nextValue) === 'number') {
                onChange(transformValue(nextValue));
            }
        }
    }, [onChange]);
    return (react_1.default.createElement(antd_1.InputNumber, { style: { width: '100%' }, size: "small", placeholder: placeholder, value: innerValue, onChange: onValueChange, disabled: disabled }));
};
exports.InputNumber = InputNumber;
//# sourceMappingURL=input-number.js.map