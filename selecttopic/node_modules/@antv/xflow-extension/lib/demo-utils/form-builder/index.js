"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilder = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
function FormBuilder(props) {
    var className = props.className, layout = props.layout, initialValues = props.initialValues, form = props.form, _a = props.formItems, formItems = _a === void 0 ? [] : _a, onFinish = props.onFinish, submitButton = props.submitButton, buttonProps = props.buttonProps;
    if (!form) {
        return null;
    }
    var style = layout === 'vertical' ? { padding: '0px 12px' } : { padding: '8px 12px' };
    return (react_1.default.createElement(antd_1.Form, { size: "small", form: form, style: style, layout: layout, onFinish: onFinish, className: className, initialValues: initialValues, labelCol: layout === 'vertical' ? { span: 24 } : { span: 8 }, wrapperCol: layout === 'vertical' ? { span: 24 } : { span: 16 } },
        formItems.map(function (item) { return (react_1.default.createElement(antd_1.Form.Item, tslib_1.__assign({ label: item.label, name: item.name, rules: item.rules }, item.itemProps), react_1.default.createElement(item.render, item.renderProps))); }),
        react_1.default.createElement(antd_1.Form.Item, { wrapperCol: { offset: 0, span: 24 } }, submitButton ? (submitButton) : (react_1.default.createElement(antd_1.Button, tslib_1.__assign({ type: "primary", htmlType: "submit", style: { width: '100%' } }, buttonProps), "\u6267\u884C\u547D\u4EE4")))));
}
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=index.js.map