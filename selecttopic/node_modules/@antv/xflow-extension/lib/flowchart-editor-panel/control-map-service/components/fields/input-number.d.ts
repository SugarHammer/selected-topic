import React from 'react';
interface IProps {
    label?: string;
    value?: number;
    min?: number;
    width?: number;
    onChange?: (value: number) => void;
}
declare const InputNumberFiled: React.FC<IProps>;
export default InputNumberFiled;
