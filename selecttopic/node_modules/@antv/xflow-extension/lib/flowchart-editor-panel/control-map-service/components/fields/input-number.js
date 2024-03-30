"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var constants_1 = require("../constants");
var InputNumberFiled = function (props) {
    var label = props.label, value = props.value, onChange = props.onChange, min = props.min, width = props.width;
    return (react_1.default.createElement("div", { className: "group" },
        label && react_1.default.createElement("label", null, label),
        react_1.default.createElement(antd_1.InputNumber, { value: value, min: min, style: {
                width: width,
                height: constants_1.FormItemHeight,
            }, onChange: function (v) {
                onChange === null || onChange === void 0 ? void 0 : onChange(v);
            } })));
};
exports.default = InputNumberFiled;
//# sourceMappingURL=input-number.js.map