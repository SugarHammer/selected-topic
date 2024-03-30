import React from 'react';
import type { IToolbarItemOptions, IToolbarLayout } from '@antv/xflow-core';
export interface IProps {
    item: IToolbarItemOptions;
    layout: IToolbarLayout;
}
export declare const ToolbarItem: React.FC<IProps>;
