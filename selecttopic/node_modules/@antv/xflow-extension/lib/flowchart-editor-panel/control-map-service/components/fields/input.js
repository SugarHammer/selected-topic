"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var constants_1 = require("../constants");
var InputFiled = function (props) {
    var _a = props.label, label = _a === void 0 ? '标签' : _a, value = props.value, onChange = props.onChange;
    return (react_1.default.createElement("div", { className: "group" },
        react_1.default.createElement("label", null, label),
        react_1.default.createElement(antd_1.Input, { value: value, style: {
                height: constants_1.FormItemHeight,
            }, onChange: function (e) {
                onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value);
            } })));
};
exports.default = InputFiled;
//# sourceMappingURL=input.js.map