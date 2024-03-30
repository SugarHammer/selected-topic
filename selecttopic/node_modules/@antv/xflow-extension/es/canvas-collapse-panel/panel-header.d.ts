import React from 'react';
import type { IProps, IOnKeywordChange, NsCollapsePanelModel } from './interface';
export interface IHeaderProps extends IProps {
    /** 关键字变化 */
    onKeywordChange: IOnKeywordChange;
    /** panel state */
    state: NsCollapsePanelModel.IState;
}
export declare const NodePanelHeader: React.FC<IHeaderProps>;
