import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
export const DatetimePicker = props => {
    const { className, style, disabled, value, onChange } = props;
    const [innerValue, setInnerValue] = useState(value ? moment(value) : undefined);
    const mountedRef = useRef(false);
    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        }
        const valueMoment = moment(value);
        if (valueMoment.isValid()) {
            setInnerValue(valueMoment);
        }
    }, [value]);
    const onChangeMoment = useCallback((_, dateString) => {
        const nextMoment = moment(dateString);
        setInnerValue(nextMoment.isValid() ? nextMoment : undefined);
        if (typeof onChange === 'function') {
            onChange(nextMoment.isValid() ? nextMoment.format('YYYY-MM-DD HH:mm:ss') : '');
        }
    }, [onChange]);
    return (React.createElement(DatePicker, { showTime: true, allowClear: true, className: className, style: style, disabled: disabled, value: innerValue, onChange: onChangeMoment }));
};
//# sourceMappingURL=datetime-picker.js.map