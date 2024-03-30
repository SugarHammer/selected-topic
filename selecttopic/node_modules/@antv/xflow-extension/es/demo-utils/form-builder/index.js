import React from 'react';
import { Form, Button } from 'antd';
export function FormBuilder(props) {
    const { className, layout, initialValues, form, formItems = [], onFinish, submitButton, buttonProps, } = props;
    if (!form) {
        return null;
    }
    const style = layout === 'vertical' ? { padding: '0px 12px' } : { padding: '8px 12px' };
    return (React.createElement(Form, { size: "small", form: form, style: style, layout: layout, onFinish: onFinish, className: className, initialValues: initialValues, labelCol: layout === 'vertical' ? { span: 24 } : { span: 8 }, wrapperCol: layout === 'vertical' ? { span: 24 } : { span: 16 } },
        formItems.map(item => (React.createElement(Form.Item, Object.assign({ label: item.label, name: item.name, rules: item.rules }, item.itemProps), React.createElement(item.render, item.renderProps)))),
        React.createElement(Form.Item, { wrapperCol: { offset: 0, span: 24 } }, submitButton ? (submitButton) : (React.createElement(Button, Object.assign({ type: "primary", htmlType: "submit", style: { width: '100%' } }, buttonProps), "\u6267\u884C\u547D\u4EE4")))));
}
//# sourceMappingURL=index.js.map