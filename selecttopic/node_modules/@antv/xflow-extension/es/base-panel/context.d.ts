import React from 'react';
import type { IGraphCommandService, IModelService } from '@antv/xflow-core';
import type { PropsProxy } from './config';
interface IContext<T = any> {
    propsProxy: PropsProxy<T>;
    commandService: IGraphCommandService;
    modelService: IModelService;
}
export declare const PanelContext: React.Context<IContext<any>>;
export declare const usePanelContext: <T extends unknown>() => IContext<T>;
export {};
