import { getModelUtil, useModelValueUtil } from '@antv/xflow-core/es/model-service/constant';
export const EDGE_PATH_TYPE = {
    /** node 水平 */
    HORIRONTAL_NODE: 'xflow-node-horizontal-edge',
    /** Node 垂直 */
    VERTICAL_NODE: 'xflow-node-vertical-edge',
    /** Group 垂直 */
    VERTICAL_GROUP: 'xflow-group-vertical-edge',
};
export const XFLOW_SHAPE = {
    EDGE: 'xflow-edge',
};
export const XFLOW_NODE_SHAPE = 'XFLOW_NODE_SHAPE';
export const EDGE_PROCESSING_CLASSNAME = 'processing';
export const NODE_DEFAULT_WIDTH = 160;
export const NODE_DEFAULT_HEIGHT = 32;
/** 画布状态 */
export var GRAPH_STATUS_INFO;
(function (GRAPH_STATUS_INFO) {
    /** Model id */
    GRAPH_STATUS_INFO.id = 'GRAPH_STATUS_INFO';
    /** 类型 */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum["SUCCESS"] = "success";
        StatusEnum["PROCESSING"] = "processing";
        StatusEnum["ERROR"] = "error";
        StatusEnum["DEFAULT"] = "default";
        StatusEnum["WARNING"] = "warning";
    })(StatusEnum = GRAPH_STATUS_INFO.StatusEnum || (GRAPH_STATUS_INFO.StatusEnum = {}));
    /** Model Utils */
    GRAPH_STATUS_INFO.getModel = getModelUtil(GRAPH_STATUS_INFO.id);
    GRAPH_STATUS_INFO.useValue = useModelValueUtil(GRAPH_STATUS_INFO.id);
})(GRAPH_STATUS_INFO || (GRAPH_STATUS_INFO = {}));
export var XFlowDagCommands;
(function (XFlowDagCommands) {
    //更新节点的状态
    XFlowDagCommands.QUERY_GRAPH_STATUS = {
        id: 'xflow:query-graph-status',
        label: '查询画布节点状态',
    };
})(XFlowDagCommands || (XFlowDagCommands = {}));
//# sourceMappingURL=constants.js.map