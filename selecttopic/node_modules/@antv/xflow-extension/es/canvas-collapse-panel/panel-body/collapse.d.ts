import React from 'react';
import type { NsGraph, IGraphConfig, IModelService, IGraphCommandService } from '@antv/xflow-core';
import type { ICollapsePanel, IOnActiveKeyChange } from '../interface';
interface ISearchList {
    prefixClz: string;
    modelService: IModelService;
    commandService: IGraphCommandService;
    graphConfig: IGraphConfig;
    onActiveKeyChange: IOnActiveKeyChange;
    onMouseDown: (nodeConfig: NsGraph.INodeConfig) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    collapseData: ICollapsePanel[];
}
export declare const CollapseList: React.FC<ISearchList>;
export {};
