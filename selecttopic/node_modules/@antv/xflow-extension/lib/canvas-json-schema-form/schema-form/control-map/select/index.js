"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var form_item_wrapper_1 = require("../../common/form-item-wrapper");
var tooltip_1 = require("../../common/tooltip");
var Select = function (props) {
    var controlSchema = props.controlSchema;
    var required = controlSchema.required, tooltip = controlSchema.tooltip, extra = controlSchema.extra, name = controlSchema.name, label = controlSchema.label, placeholder = controlSchema.placeholder, _a = controlSchema.options, options = _a === void 0 ? [] : _a, rules = controlSchema.rules;
    return (react_1.default.createElement(form_item_wrapper_1.FormItemWrapper, { schema: controlSchema }, function (_a) {
        var hidden = _a.hidden, disabled = _a.disabled, initialValue = _a.initialValue;
        return (react_1.default.createElement(antd_1.Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: (0, tooltip_1.renderFormItemExtra)(extra), required: required, hidden: hidden, rules: rules },
            react_1.default.createElement(antd_1.Select, { disabled: disabled, placeholder: placeholder }, options.map(function (option) {
                var title = option.title, value = option.value;
                return (react_1.default.createElement(antd_1.Select.Option, { key: value.toString(), value: value }, title));
            }))));
    }));
};
exports.Select = Select;
//# sourceMappingURL=index.js.map