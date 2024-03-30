"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatetimePicker = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var moment_1 = tslib_1.__importDefault(require("moment"));
var DatetimePicker = function (props) {
    var className = props.className, style = props.style, disabled = props.disabled, value = props.value, onChange = props.onChange;
    var _a = (0, react_1.useState)(value ? (0, moment_1.default)(value) : undefined), innerValue = _a[0], setInnerValue = _a[1];
    var mountedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function () {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        }
        var valueMoment = (0, moment_1.default)(value);
        if (valueMoment.isValid()) {
            setInnerValue(valueMoment);
        }
    }, [value]);
    var onChangeMoment = (0, react_1.useCallback)(function (_, dateString) {
        var nextMoment = (0, moment_1.default)(dateString);
        setInnerValue(nextMoment.isValid() ? nextMoment : undefined);
        if (typeof onChange === 'function') {
            onChange(nextMoment.isValid() ? nextMoment.format('YYYY-MM-DD HH:mm:ss') : '');
        }
    }, [onChange]);
    return (react_1.default.createElement(antd_1.DatePicker, { showTime: true, allowClear: true, className: className, style: style, disabled: disabled, value: innerValue, onChange: onChangeMoment }));
};
exports.DatetimePicker = DatetimePicker;
//# sourceMappingURL=datetime-picker.js.map