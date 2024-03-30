import React from 'react';
import type { NsTreePanelData, IProps, ITreeNode, IOnFolderExpand, INodeFactoryArgs } from './interface';
import type { IModelService, IGraphCommandService, IGraphConfig } from '@antv/xflow-core';
export declare const defaultNodeFactory: (args: INodeFactoryArgs) => import("@antv/x6").Node<import("@antv/x6").Node.Properties>;
interface IConfigRenderOptions {
    graphConfig: IGraphConfig;
    nodeConfig: ITreeNode;
    modelService: IModelService;
    commandService: IGraphCommandService;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export declare const renderNode: (props: IConfigRenderOptions) => JSX.Element;
interface ITitleProps {
    prefixClz: string;
    item: ITreeNode;
    graphConfig: any;
    modelService: IModelService;
    commandService: IGraphCommandService;
    popoverContent: React.ReactNode;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
export declare const NodeTitle: (props: ITitleProps) => JSX.Element;
export interface IBodyProps extends IProps {
    state: NsTreePanelData.IState;
    onFolderExpand: IOnFolderExpand;
}
export declare const NodePanelBody: React.FC<IBodyProps>;
export {};
