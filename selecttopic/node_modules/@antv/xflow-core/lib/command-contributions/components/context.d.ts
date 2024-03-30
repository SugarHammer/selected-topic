import React from 'react';
import type { IGraphCommandService } from '../../command';
import type { IModelService } from '../../model-service';
import type { Graph as X6Graph, Node as X6Node, Edge as X6Edge } from '@antv/x6';
import type { NsGraph } from '../../interface';
interface IAppContext {
    cell: X6Node | X6Edge;
    x6Graph: X6Graph;
    commands: IGraphCommandService;
    modelService: IModelService;
}
export declare const AppContext: React.Context<IAppContext>;
export declare const useAppContext: () => IAppContext;
export declare function getNodeReactComponent(Component: React.ComponentType<NsGraph.IReactNodeProps>, commands: IGraphCommandService, modelService: IModelService): (x6Node: X6Node) => JSX.Element;
export declare function getEdgeReactComponent(Component: React.ComponentType<NsGraph.IReactEdgeProps>, commands: IGraphCommandService, modelService: IModelService): (x6Edge: X6Edge) => JSX.Element;
/** 获取节点选中状态 */
export declare const useIsNodeSelected: () => boolean[];
export {};
