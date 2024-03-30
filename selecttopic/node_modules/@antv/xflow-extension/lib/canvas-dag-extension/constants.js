"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowDagCommands = exports.GRAPH_STATUS_INFO = exports.NODE_DEFAULT_HEIGHT = exports.NODE_DEFAULT_WIDTH = exports.EDGE_PROCESSING_CLASSNAME = exports.XFLOW_NODE_SHAPE = exports.XFLOW_SHAPE = exports.EDGE_PATH_TYPE = void 0;
var constant_1 = require("@antv/xflow-core/es/model-service/constant");
exports.EDGE_PATH_TYPE = {
    /** node 水平 */
    HORIRONTAL_NODE: 'xflow-node-horizontal-edge',
    /** Node 垂直 */
    VERTICAL_NODE: 'xflow-node-vertical-edge',
    /** Group 垂直 */
    VERTICAL_GROUP: 'xflow-group-vertical-edge',
};
exports.XFLOW_SHAPE = {
    EDGE: 'xflow-edge',
};
exports.XFLOW_NODE_SHAPE = 'XFLOW_NODE_SHAPE';
exports.EDGE_PROCESSING_CLASSNAME = 'processing';
exports.NODE_DEFAULT_WIDTH = 160;
exports.NODE_DEFAULT_HEIGHT = 32;
/** 画布状态 */
var GRAPH_STATUS_INFO;
(function (GRAPH_STATUS_INFO) {
    /** Model id */
    GRAPH_STATUS_INFO.id = 'GRAPH_STATUS_INFO';
    /** 类型 */
    var StatusEnum;
    (function (StatusEnum) {
        StatusEnum["SUCCESS"] = "success";
        StatusEnum["PROCESSING"] = "processing";
        StatusEnum["ERROR"] = "error";
        StatusEnum["DEFAULT"] = "default";
        StatusEnum["WARNING"] = "warning";
    })(StatusEnum = GRAPH_STATUS_INFO.StatusEnum || (GRAPH_STATUS_INFO.StatusEnum = {}));
    /** Model Utils */
    GRAPH_STATUS_INFO.getModel = (0, constant_1.getModelUtil)(GRAPH_STATUS_INFO.id);
    GRAPH_STATUS_INFO.useValue = (0, constant_1.useModelValueUtil)(GRAPH_STATUS_INFO.id);
})(GRAPH_STATUS_INFO = exports.GRAPH_STATUS_INFO || (exports.GRAPH_STATUS_INFO = {}));
var XFlowDagCommands;
(function (XFlowDagCommands) {
    //更新节点的状态
    XFlowDagCommands.QUERY_GRAPH_STATUS = {
        id: 'xflow:query-graph-status',
        label: '查询画布节点状态',
    };
})(XFlowDagCommands = exports.XFlowDagCommands || (exports.XFlowDagCommands = {}));
//# sourceMappingURL=constants.js.map