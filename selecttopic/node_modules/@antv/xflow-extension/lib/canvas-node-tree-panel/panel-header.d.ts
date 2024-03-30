import React from 'react';
import type { IProps, IOnKeywordChange } from './interface';
import type { NsNodeTreePanelModel } from './service';
export interface IHeaderProps extends IProps {
    onKeywordChange: IOnKeywordChange;
    state: NsNodeTreePanelModel.IState;
}
export declare const NodePanelHeader: React.FC<IHeaderProps>;
