import React from 'react';
import type { IProps } from './interface';
import type { NsJsonSchemaFormModel } from './service';
export interface IHeaderProps extends IProps {
    hasSchema: boolean;
    state: NsJsonSchemaFormModel.IState;
    prefixClz: string;
}
export declare const PanelHeader: React.FC<IHeaderProps>;
