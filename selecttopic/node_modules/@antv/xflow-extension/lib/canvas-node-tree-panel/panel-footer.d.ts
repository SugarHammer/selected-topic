import React from 'react';
import type { IProps } from './interface';
import type { NsNodeTreePanelModel } from './service';
export interface IFooterProps extends IProps {
    state: NsNodeTreePanelModel.IState;
}
export declare const NodePanelFooter: React.FC<IFooterProps>;
