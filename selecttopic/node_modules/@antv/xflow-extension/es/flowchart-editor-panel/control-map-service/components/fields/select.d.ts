import React from 'react';
interface IProps {
    label?: string;
    value?: string;
    options?: {
        label: string | number;
        value: string | number;
    }[];
    width?: number | string;
    onChange?: (value: string) => void;
}
declare const SelectField: React.FC<IProps>;
export default SelectField;
