import React from 'react';
import { ToolbarConfig } from './config';
import type { IToolbarProps } from './interface';
export declare const CanvasToolbar: React.FC<IToolbarProps>;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createToolbarConfig: <T extends unknown = any>(addOptions: (config: ToolbarConfig, proxy: IValueProxy<T>) => void) => (value?: T) => ToolbarConfig;
export { IToolbarProps };
