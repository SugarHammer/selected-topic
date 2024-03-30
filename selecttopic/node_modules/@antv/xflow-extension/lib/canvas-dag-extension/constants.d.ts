import type { DisposableCollection } from '@antv/xflow-core';
import type { IGraphCommand } from '@antv/xflow-core';
export declare const EDGE_PATH_TYPE: {
    /** node 水平 */
    readonly HORIRONTAL_NODE: "xflow-node-horizontal-edge";
    /** Node 垂直 */
    readonly VERTICAL_NODE: "xflow-node-vertical-edge";
    /** Group 垂直 */
    readonly VERTICAL_GROUP: "xflow-group-vertical-edge";
};
export declare const XFLOW_SHAPE: {
    readonly EDGE: "xflow-edge";
};
export declare const XFLOW_NODE_SHAPE = "XFLOW_NODE_SHAPE";
export declare const EDGE_PROCESSING_CLASSNAME = "processing";
export declare const NODE_DEFAULT_WIDTH = 160;
export declare const NODE_DEFAULT_HEIGHT = 32;
/** 画布状态 */
export declare namespace GRAPH_STATUS_INFO {
    /** Model id */
    const id = "GRAPH_STATUS_INFO";
    /** 类型 */
    enum StatusEnum {
        SUCCESS = "success",
        PROCESSING = "processing",
        ERROR = "error",
        DEFAULT = "default",
        WARNING = "warning"
    }
    interface INodeStatus {
        status: StatusEnum;
        [key: string]: any;
    }
    interface IState {
        graphStatus: StatusEnum;
        statusMap: Map<string, INodeStatus>;
        subscription: DisposableCollection;
    }
    /** Model Utils */
    const getModel: (modelService: import("@antv/xflow-core").IModelService) => Promise<import("@antv/xflow-core").NsModel.IModel<IState>>;
    const useValue: (modelService: import("@antv/xflow-core").IModelService) => Promise<IState>;
}
export declare namespace XFlowDagCommands {
    const QUERY_GRAPH_STATUS: IGraphCommand;
}
