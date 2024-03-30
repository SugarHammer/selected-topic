import React from 'react';
interface IProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}
declare const InputFiled: React.FC<IProps>;
export default InputFiled;
