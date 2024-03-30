import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InputNumber as AInputNumber } from 'antd';
function transformValue(val) {
    const result = Number(val);
    return Number.isNaN(result) ? undefined : result;
}
export const InputNumber = props => {
    const { disabled, placeholder, value, onChange } = props;
    const [innerValue, setInnerValue] = useState(transformValue(value));
    const mountedRef = useRef(false);
    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
        }
        setInnerValue(transformValue(value));
    }, [value]);
    const onValueChange = useCallback((nextValue) => {
        setInnerValue(nextValue);
        if (typeof onChange === 'function') {
            if (nextValue === undefined) {
                onChange('');
            }
            else if (typeof transformValue(nextValue) === 'number') {
                onChange(transformValue(nextValue));
            }
        }
    }, [onChange]);
    return (React.createElement(AInputNumber, { style: { width: '100%' }, size: "small", placeholder: placeholder, value: innerValue, onChange: onValueChange, disabled: disabled }));
};
//# sourceMappingURL=input-number.js.map