import type React from 'react';
import type { IControlProps } from '../../interface';
export declare const xflowDefaultControls: [string, React.FC<IControlProps>][];
export declare type IControlMap = Map<string, React.FC<IControlProps>>;
export declare const makeControlMap: (controls: [string, React.FC<IControlProps>][]) => Map<string, React.FC<IControlProps>>;
export declare const getControlFromMap: (key: string, controlMap: Map<string, React.FC<IControlProps>>, defaultControl?: React.ComponentType<IControlProps>) => React.FC<IControlProps> | React.ComponentClass<IControlProps, any>;
