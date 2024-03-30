import type React from 'react';
import type { IMenuModel, IMenuTarget } from '@antv/xflow-core';
interface IProps {
    onHide: () => void;
    target: IMenuTarget;
    menuModel: IMenuModel;
}
export declare const XFlowMenu: React.FC<IProps>;
export {};
