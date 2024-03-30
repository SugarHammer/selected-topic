import React from 'react';
import type { IProps } from './interface';
import type { NsJsonSchemaFormModel } from './service';
export interface IFooterProps extends IProps {
    state: NsJsonSchemaFormModel.IState;
    prefixClz?: string;
}
export declare const PanelFooter: React.FC<IFooterProps>;
