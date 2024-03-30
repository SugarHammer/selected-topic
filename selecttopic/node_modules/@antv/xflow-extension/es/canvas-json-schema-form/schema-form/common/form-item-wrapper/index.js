import React, { useState, useMemo } from 'react';
import { Form } from 'antd';
import { makeUpdaterByDependencies, makeFormItemControlledProps, isEmptyParamValue } from './util';
export const FormItemWrapper = props => {
    const { schema, children } = props;
    const [updateReasonField, setUpdateReasonField] = useState();
    const { dependencies, value, defaultValue, hidden, disabled } = schema;
    const updater = useMemo(() => {
        return (dependencies === null || dependencies === void 0 ? void 0 : dependencies.length)
            ? makeUpdaterByDependencies(dependencies, setUpdateReasonField)
            : undefined;
    }, [dependencies]);
    if (typeof children !== 'function') {
        throw new Error('[Schema Form]: chilren of FormItemWrapper should be a render prop.');
    }
    const initValue = isEmptyParamValue(value) ? defaultValue : value;
    if (updater) {
        return (React.createElement(Form.Item, { noStyle: true, shouldUpdate: updater }, form => {
            const { hidden: isHidden, disabled: isDisabled } = makeFormItemControlledProps(form, schema, updateReasonField);
            return children({
                hidden: isHidden,
                disabled: isDisabled,
                initialValue: initValue,
            });
        }));
    }
    return children({
        hidden,
        disabled,
        initialValue: initValue,
    });
};
//# sourceMappingURL=index.js.map