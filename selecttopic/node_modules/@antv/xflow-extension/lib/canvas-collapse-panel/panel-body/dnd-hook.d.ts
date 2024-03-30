import React from 'react';
import type { IGraphConfig } from '@antv/xflow-core';
import type { IProps, NsCollapsePanelModel, IOnActiveKeyChange, IPanelNode, INodeFactoryArgs } from '../interface';
export interface IBodyProps extends IProps {
    state: NsCollapsePanelModel.IState;
    onActiveKeyChange: IOnActiveKeyChange;
}
export declare const defaultNodeFactory: (args: INodeFactoryArgs) => import("@antv/x6").Node<import("@antv/x6").Node.Properties>;
export declare const useGraphDnd: (props: IBodyProps) => {
    graphConfig: IGraphConfig;
    onMouseDown: (nodeConfig: IPanelNode) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    modelService: import("@antv/xflow-core").IModelService;
    commandService: import("@antv/xflow-core").IGraphCommandService;
};
