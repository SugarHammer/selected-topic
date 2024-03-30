import React from 'react';
import type { IToolbarGroupOptions, IToolbarLayout } from '@antv/xflow-core';
export interface IProps {
    group: IToolbarGroupOptions;
    layout: IToolbarLayout;
}
export declare const ToolbarGroup: React.FC<IProps>;
