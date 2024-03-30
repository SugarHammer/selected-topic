"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datetime = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var tooltip_1 = require("../../common/tooltip");
var form_item_wrapper_1 = require("../../common/form-item-wrapper");
var datetime_picker_1 = require("./datetime-picker");
var Datetime = function (props) {
    var controlSchema = props.controlSchema;
    var required = controlSchema.required, tooltip = controlSchema.tooltip, extra = controlSchema.extra, name = controlSchema.name, label = controlSchema.label, rules = controlSchema.rules;
    return (react_1.default.createElement(form_item_wrapper_1.FormItemWrapper, { schema: controlSchema }, function (_a) {
        var disabled = _a.disabled, hidden = _a.hidden, initialValue = _a.initialValue;
        return (react_1.default.createElement(antd_1.Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: (0, tooltip_1.renderFormItemExtra)(extra), required: required, hidden: hidden, rules: rules },
            react_1.default.createElement(datetime_picker_1.DatetimePicker, { style: { width: '100%' }, disabled: disabled })));
    }));
};
exports.Datetime = Datetime;
//# sourceMappingURL=index.js.map