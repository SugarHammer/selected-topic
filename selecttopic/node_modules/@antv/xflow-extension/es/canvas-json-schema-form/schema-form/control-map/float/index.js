import React from 'react';
import { Form } from 'antd';
import { renderFormItemExtra } from '../../common/tooltip';
import { FormItemWrapper } from '../../common/form-item-wrapper';
import { InputNumber } from './input-number';
export const Float = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, placeholder, rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ disabled, hidden, initialValue }) => {
        return (React.createElement(Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, rules: rules },
            React.createElement(InputNumber, { placeholder: placeholder, disabled: disabled })));
    }));
};
//# sourceMappingURL=index.js.map