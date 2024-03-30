import React from 'react';
import type { AbstractTooltipProps } from 'antd/es/tooltip';
interface Props extends AbstractTooltipProps {
    text: React.ReactNode;
}
export declare const Tooltip: React.FC<Props>;
export declare function renderFormItemExtra(text?: string): JSX.Element;
export {};
