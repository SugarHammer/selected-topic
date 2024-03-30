import React from 'react';
import { ModelServiceConfig } from '../config';
export interface IProps {
    config?: ModelServiceConfig;
    XFlowModuleType?: string;
}
export declare const ModelServiceRegistry: React.FC<IProps>;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createModelServiceConfig: <T extends unknown = any>(addOptions: (config: ModelServiceConfig, proxy: IValueProxy<TextDecoderOptions>) => void) => (value?: T) => ModelServiceConfig;
export {};
