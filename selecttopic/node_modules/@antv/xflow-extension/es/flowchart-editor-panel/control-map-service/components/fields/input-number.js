import React from 'react';
import { InputNumber } from 'antd';
import { FormItemHeight } from '../constants';
const InputNumberFiled = props => {
    const { label, value, onChange, min, width } = props;
    return (React.createElement("div", { className: "group" },
        label && React.createElement("label", null, label),
        React.createElement(InputNumber, { value: value, min: min, style: {
                width,
                height: FormItemHeight,
            }, onChange: (v) => {
                onChange === null || onChange === void 0 ? void 0 : onChange(v);
            } })));
};
export default InputNumberFiled;
//# sourceMappingURL=input-number.js.map