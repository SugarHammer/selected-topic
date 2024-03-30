import type { IPanelNode } from '../interface';
import type { IGraphCommandService, IGraphConfig, IModelService } from '@antv/xflow-core';
import React from 'react';
interface INodeRenderOptions {
    graphConfig: IGraphConfig;
    nodeConfig: IPanelNode;
    modelService: IModelService;
    commandService: IGraphCommandService;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export declare const renderNode: (props: INodeRenderOptions) => JSX.Element;
interface INodeProps {
    prefixClz: string;
    item: IPanelNode;
    graphConfig: IGraphConfig;
    modelService: IModelService;
    commandService: IGraphCommandService;
    popoverContent: React.ReactNode;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export declare const PanelNode: React.FC<INodeProps>;
export {};
