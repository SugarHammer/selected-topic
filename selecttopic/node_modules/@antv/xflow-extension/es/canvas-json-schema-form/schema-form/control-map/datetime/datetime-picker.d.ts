import React from 'react';
interface Props {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    value?: string;
    onChange?: (val: string) => void;
}
export declare const DatetimePicker: React.FC<Props>;
export {};
