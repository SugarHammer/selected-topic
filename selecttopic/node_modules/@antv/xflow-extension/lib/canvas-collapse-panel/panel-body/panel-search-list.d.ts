import React from 'react';
import type { NsGraph, IGraphConfig, IModelService, IGraphCommandService } from '@antv/xflow-core';
import type { IPanelNode } from '../interface';
interface ISearchList {
    prefixClz: string;
    modelService: IModelService;
    commandService: IGraphCommandService;
    graphConfig: IGraphConfig;
    onMouseDown: (nodeConfig: NsGraph.INodeConfig) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    searchResult: IPanelNode[];
}
export declare const SearchResult: React.FC<ISearchList>;
export {};
