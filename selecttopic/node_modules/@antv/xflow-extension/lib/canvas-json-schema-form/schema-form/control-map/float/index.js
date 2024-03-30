"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var tooltip_1 = require("../../common/tooltip");
var form_item_wrapper_1 = require("../../common/form-item-wrapper");
var input_number_1 = require("./input-number");
var Float = function (props) {
    var controlSchema = props.controlSchema;
    var required = controlSchema.required, tooltip = controlSchema.tooltip, extra = controlSchema.extra, name = controlSchema.name, label = controlSchema.label, placeholder = controlSchema.placeholder, rules = controlSchema.rules;
    return (react_1.default.createElement(form_item_wrapper_1.FormItemWrapper, { schema: controlSchema }, function (_a) {
        var disabled = _a.disabled, hidden = _a.hidden, initialValue = _a.initialValue;
        return (react_1.default.createElement(antd_1.Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: (0, tooltip_1.renderFormItemExtra)(extra), required: required, hidden: hidden, rules: rules },
            react_1.default.createElement(input_number_1.InputNumber, { placeholder: placeholder, disabled: disabled })));
    }));
};
exports.Float = Float;
//# sourceMappingURL=index.js.map