import type { NsPanelData } from './service';
import type { IProps } from './interface';
import React from 'react';
export interface IBodyProps extends IProps {
    state: NsPanelData.IState;
}
export declare const NodePanelBody: React.FC<IBodyProps>;
