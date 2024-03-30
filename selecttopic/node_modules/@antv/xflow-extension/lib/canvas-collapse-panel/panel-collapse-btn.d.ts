import React from 'react';
import type { IProps } from './interface';
export interface ICollapseBtnProps extends IProps {
    isCollapsed: boolean;
    onCollapseBtnClick: () => void;
}
/** collapseBtn */
export declare const NodePanelCollapseBtn: React.FC<ICollapseBtnProps>;
