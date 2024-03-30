import React from 'react';
import { Form, Input } from 'antd';
import { FormItemWrapper } from '../../common/form-item-wrapper';
import { renderFormItemExtra } from '../../common/tooltip';
export const TextArea = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, placeholder, rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ hidden, disabled, initialValue }) => {
        return (React.createElement(Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, rules: rules },
            React.createElement(Input.TextArea, { allowClear: true, placeholder: placeholder, rows: 3, disabled: disabled })));
    }));
};
//# sourceMappingURL=index.js.map