import type { IPosition, IModelService, IToolbarModel, IToolbarLayout, DisposableCollection, IToolbarOptions } from '@antv/xflow-core';
import type React from 'react';
import type { ToolbarConfig } from './config';
export interface IToolbarProps {
    config: ToolbarConfig;
    layout: IToolbarLayout;
    position: IPosition;
    style?: React.CSSProperties;
    className?: string;
}
export interface IToolbarModelService {
    (model: IToolbarModel, modelService: IModelService, toDispose: DisposableCollection): Promise<void>;
}
export interface IToolbarCustomRenderService {
    (modelService: IModelService, updateComponent: (fc: React.FC<IToolbarCustomRenderProps>) => void): Promise<React.FC<IToolbarCustomRenderProps> | undefined>;
}
export interface IToolbarCustomRenderProps {
    config: IToolbarOptions;
}
