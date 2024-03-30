import React from 'react';
import { XFlowHookConfig } from '../module';
import { HookConfig } from '../config';
export interface IProps {
    config?: XFlowHookConfig;
    XFlowModuleType?: string;
}
export declare const HookRegistry: React.FC<IProps>;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createHookConfig: <T extends unknown = any>(addOptions: (config: HookConfig, container: IValueProxy<T>) => void) => (value?: T) => XFlowHookConfig;
export {};
