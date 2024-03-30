import React from 'react';
import { CommandConfig } from '../config';
export interface IProps {
    config?: CommandConfig;
}
export declare const CommandsRegistry: React.FC<IProps>;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createCmdConfig: <T extends unknown = any>(addOptions: (config: CommandConfig, container: IValueProxy<T>) => void) => (value?: T) => CommandConfig;
export {};
