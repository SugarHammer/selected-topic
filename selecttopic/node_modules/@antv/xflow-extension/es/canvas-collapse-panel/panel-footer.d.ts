import React from 'react';
import type { IProps } from './interface';
import type { NsCollapsePanelModel } from './interface';
export interface IFooterProps extends IProps {
    state: NsCollapsePanelModel.IState;
}
export declare const NodePanelFooter: React.FC<IFooterProps>;
