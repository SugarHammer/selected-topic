import React from 'react';
import { Form } from 'antd';
import { renderFormItemExtra } from '../../common/tooltip';
import { FormItemWrapper } from '../../common/form-item-wrapper';
import { DatetimePicker } from './datetime-picker';
export const Datetime = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ disabled, hidden, initialValue }) => {
        return (React.createElement(Form.Item, { name: name, label: label, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, rules: rules },
            React.createElement(DatetimePicker, { style: { width: '100%' }, disabled: disabled })));
    }));
};
//# sourceMappingURL=index.js.map