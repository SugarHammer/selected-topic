import React from 'react';
import { KeybindingConfig } from '../config';
export interface IProps {
    config?: KeybindingConfig;
    style?: React.CSSProperties;
    className?: string;
}
export declare const KeyBindings: React.FC<IProps>;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createKeybindingConfig: <T extends unknown = any>(addOptions: (config: KeybindingConfig, container: IValueProxy<T>) => void) => (value?: T) => KeybindingConfig;
export {};
