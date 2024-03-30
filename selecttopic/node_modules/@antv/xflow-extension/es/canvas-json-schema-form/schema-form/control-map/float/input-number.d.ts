import React from 'react';
interface Props {
    disabled?: boolean;
    placeholder?: string;
    value?: number;
    onChange?: (val: number | string) => void;
}
export declare const InputNumber: React.FC<Props>;
export {};
