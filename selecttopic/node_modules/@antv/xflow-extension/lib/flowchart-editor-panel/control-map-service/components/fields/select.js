"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var constants_1 = require("../constants");
var SelectField = function (props) {
    var _a = props.label, label = _a === void 0 ? '箭头' : _a, value = props.value, onChange = props.onChange, _b = props.options, options = _b === void 0 ? [] : _b, width = props.width;
    return (react_1.default.createElement("div", { className: "group" },
        react_1.default.createElement("label", null, label),
        react_1.default.createElement(antd_1.Select, { size: "small", value: value, style: {
                width: width,
                height: constants_1.FormItemHeight,
            }, getPopupContainer: function (trigger) { return trigger.parentNode; }, optionFilterProp: "children", onChange: function (v) {
                onChange === null || onChange === void 0 ? void 0 : onChange(v);
            }, filterOption: function (input, option) {
                var _a = option.label, text = _a === void 0 ? '' : _a;
                if (typeof text === 'string') {
                    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
                return text.toString().indexOf(input.toLowerCase()) >= 0;
            }, options: options })));
};
exports.default = SelectField;
//# sourceMappingURL=select.js.map