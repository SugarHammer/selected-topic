import React from 'react';
import { Form, Checkbox as ACheckbox } from 'antd';
import { FormItemWrapper } from '../../common/form-item-wrapper';
import { renderFormItemExtra } from '../../common/tooltip';
export const Checkbox = props => {
    const { controlSchema } = props;
    const { required, tooltip, extra, name, label, rules } = controlSchema;
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, ({ hidden, disabled, initialValue }) => {
        return (React.createElement(Form.Item, { className: "xflow-form-checkbox", name: name, rules: rules, initialValue: initialValue, tooltip: tooltip, extra: renderFormItemExtra(extra), required: required, hidden: hidden, valuePropName: "checked", getValueProps: checked => {
                const checkedMap = {
                    true: true,
                    false: false,
                };
                return { checked: !!checkedMap[checked] };
            } },
            React.createElement(ACheckbox, { disabled: disabled }, label)));
    }));
};
//# sourceMappingURL=index.js.map