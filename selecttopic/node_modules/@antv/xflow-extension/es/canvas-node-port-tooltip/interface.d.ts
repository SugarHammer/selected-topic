/// <reference types="react" />
import type { NsGraph, IModelService } from '@antv/xflow-core';
export declare namespace NsPortEvent {
    const MOUSE_ENTER = "node-port:mouseenter";
    interface IPortEvent {
        e: MouseEvent;
        portId: string;
        nodeId: string;
        portData: NsGraph.INodeAnchor;
        nodeData: NsGraph.INodeConfig;
        tooltip: string;
        placement: 'top' | 'bottom';
    }
    const MOUSE_LEAVE = "node-port:mouseleave";
}
export declare namespace ACTIVE_NODE_PORT {
    const id = "ACTIVE_NODE_PORT";
    interface IState {
        e: MouseEvent;
        position: {
            x: number;
            y: number;
        };
        portId: string;
        nodeId: string;
        portData: NsGraph.INodeAnchor;
        nodeData: NsGraph.INodeConfig;
        tooltip: string;
        placement: 'top' | 'bottom';
    }
    const useModel: (modelService: IModelService) => Promise<{
        data: IState;
        model: import("@antv/xflow-core").NsModel.IModel<IState>;
    }>;
}
export interface IConfigProps {
    getTooltip?: (args: ACTIVE_NODE_PORT.IState) => React.ReactNode;
}
