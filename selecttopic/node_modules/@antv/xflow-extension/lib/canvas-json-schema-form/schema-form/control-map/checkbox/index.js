"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var form_item_wrapper_1 = require("../../common/form-item-wrapper");
var tooltip_1 = require("../../common/tooltip");
var Checkbox = function (props) {
    var controlSchema = props.controlSchema;
    var required = controlSchema.required, tooltip = controlSchema.tooltip, extra = controlSchema.extra, name = controlSchema.name, label = controlSchema.label, rules = controlSchema.rules;
    return (react_1.default.createElement(form_item_wrapper_1.FormItemWrapper, { schema: controlSchema }, function (_a) {
        var hidden = _a.hidden, disabled = _a.disabled, initialValue = _a.initialValue;
        return (react_1.default.createElement(antd_1.Form.Item, { className: "xflow-form-checkbox", name: name, rules: rules, initialValue: initialValue, tooltip: tooltip, extra: (0, tooltip_1.renderFormItemExtra)(extra), required: required, hidden: hidden, valuePropName: "checked", getValueProps: function (checked) {
                var checkedMap = {
                    true: true,
                    false: false,
                };
                return { checked: !!checkedMap[checked] };
            } },
            react_1.default.createElement(antd_1.Checkbox, { disabled: disabled }, label)));
    }));
};
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map