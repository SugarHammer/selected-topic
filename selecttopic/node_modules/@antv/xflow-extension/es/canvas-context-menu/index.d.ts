import React from 'react';
import { ContextMenuConfig } from './config';
export declare const CONFIG_TYPE = "CanvasContextMenu";
export interface IProps {
    config: ContextMenuConfig;
}
export { IProps as ICanvasContextMenuProps };
export declare const CanvasContextMenu: React.FC<IProps>;
export declare const createCtxMenuConfig: <T extends unknown = any>(addOptions: (config: ContextMenuConfig, proxy: {
    getValue: () => T;
}) => void) => (props?: T) => ContextMenuConfig;
