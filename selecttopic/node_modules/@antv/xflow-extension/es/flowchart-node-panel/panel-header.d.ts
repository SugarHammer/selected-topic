import React from 'react';
import type { IProps, IOnKeywordChange } from './interface';
import type { NsPanelData } from './service';
export interface IHeaderProps extends IProps {
    onKeywordChange: IOnKeywordChange;
    state: NsPanelData.IState;
}
export declare const NodePanelHeader: React.FC<IHeaderProps>;
