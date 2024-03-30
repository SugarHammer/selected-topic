import React from 'react';
import { Input, Form } from 'antd';
import { renderFormItemExtra } from '../../common/tooltip';
import { FormItemWrapper } from '../../common/form-item-wrapper';
export const StringInput = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, placeholder, rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ disabled, hidden, initialValue }) => {
        return (React.createElement(Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, rules: rules },
            React.createElement(Input, { className: 'xflow-form-input', allowClear: true, placeholder: placeholder, disabled: disabled })));
    }));
};
//# sourceMappingURL=index.js.map