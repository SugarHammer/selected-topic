/**
 * 全量 Command，用户通过 name 指定，支持配置式和命令式
 * enum Command {Undo, Redo, SaveGraphData,frontNode,backNode}
 */
/** undo 操作 */
var UNDO_CMD = 'undo-cmd';
/** redo 操作 */
var REDO_CMD = 'redo-cmd';
/** 保存 */
var SAVE_GRAPH_DATA = 'save-graph-data';
/** 置前 */
var FRONT_NODE = 'front-node';
/** 置后 */
var BACK_NODE = 'back-node';
var MULTI_SELECT = 'graph-toggle-multi-select';
var ADD_GROUP = 'add-group';
var DEL_GROUP = 'del-group';
var COPY = 'graph-copy-selection';
var PASTE = 'graph-paste-selection';
export var CommandPool = {
    UNDO_CMD: UNDO_CMD,
    REDO_CMD: REDO_CMD,
    SAVE_GRAPH_DATA: SAVE_GRAPH_DATA,
    FRONT_NODE: FRONT_NODE,
    BACK_NODE: BACK_NODE,
    MULTI_SELECT: MULTI_SELECT,
    ADD_GROUP: ADD_GROUP,
    DEL_GROUP: DEL_GROUP,
    COPY: COPY,
    PASTE: PASTE,
};
