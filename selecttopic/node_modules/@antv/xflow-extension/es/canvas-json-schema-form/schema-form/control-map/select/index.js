import React from 'react';
import { Form, Select as ASelect } from 'antd';
import { FormItemWrapper } from '../../common/form-item-wrapper';
import { renderFormItemExtra } from '../../common/tooltip';
export const Select = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, placeholder, options = [], rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ hidden, disabled, initialValue }) => {
        return (React.createElement(Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, rules: rules },
            React.createElement(ASelect, { disabled: disabled, placeholder: placeholder }, options.map(option => {
                const { title, value } = option;
                return (React.createElement(ASelect.Option, { key: value.toString(), value: value }, title));
            }))));
    }));
};
//# sourceMappingURL=index.js.map