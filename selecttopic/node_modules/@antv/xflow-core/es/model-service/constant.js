import { __awaiter } from "tslib";
/** existModel的Utils */
export const isModelExistUtil = (token) => (modelService) => {
    const defer = modelService.findDeferredModel(token);
    return defer && defer.promise ? true : false;
};
/** useModel的Utils */
export const getModelUtil = (token) => (modelService) => __awaiter(void 0, void 0, void 0, function* () {
    return yield modelService.awaitModel(token);
});
/** useModel的Utils */
export const useModelValueUtil = (token) => (modelService) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield modelService.awaitModel(token);
    return model.getValidValue();
});
/** 画布是否已开启多选 */
export var GRAPH_ENABLE_MULTI_SELECT;
(function (GRAPH_ENABLE_MULTI_SELECT) {
    GRAPH_ENABLE_MULTI_SELECT.id = 'GRAPH_ENABLE_MULTI_SELECT';
    GRAPH_ENABLE_MULTI_SELECT.getModel = getModelUtil(GRAPH_ENABLE_MULTI_SELECT.id);
    GRAPH_ENABLE_MULTI_SELECT.useValue = useModelValueUtil(GRAPH_ENABLE_MULTI_SELECT.id);
})(GRAPH_ENABLE_MULTI_SELECT || (GRAPH_ENABLE_MULTI_SELECT = {}));
/** 画布是否全屏 */
export var GRAPH_FULLSCREEN;
(function (GRAPH_FULLSCREEN) {
    GRAPH_FULLSCREEN.id = 'GRAPH_FULLSCREEN';
    GRAPH_FULLSCREEN.getModel = getModelUtil(GRAPH_FULLSCREEN.id);
    GRAPH_FULLSCREEN.useValue = useModelValueUtil(GRAPH_FULLSCREEN.id);
})(GRAPH_FULLSCREEN || (GRAPH_FULLSCREEN = {}));
/** 画布已选中节点 */
export var IS_NODE_SELECTED;
(function (IS_NODE_SELECTED) {
    IS_NODE_SELECTED.id = 'IS_NODE_SELECTED';
    IS_NODE_SELECTED.getModel = getModelUtil(IS_NODE_SELECTED.id);
    IS_NODE_SELECTED.useValue = useModelValueUtil(IS_NODE_SELECTED.id);
})(IS_NODE_SELECTED || (IS_NODE_SELECTED = {}));
/** 画布选中节点是Group */
export var IS_GROUP_SELECTED;
(function (IS_GROUP_SELECTED) {
    IS_GROUP_SELECTED.id = 'IS_GROUP_SELECTED';
    IS_GROUP_SELECTED.getModel = getModelUtil(IS_GROUP_SELECTED.id);
    IS_GROUP_SELECTED.useValue = useModelValueUtil(IS_GROUP_SELECTED.id);
})(IS_GROUP_SELECTED || (IS_GROUP_SELECTED = {}));
/** 画布选中节点是Group */
export var IS_NORMAL_NODES_SELECTED;
(function (IS_NORMAL_NODES_SELECTED) {
    IS_NORMAL_NODES_SELECTED.id = 'IS_NORMAL_NODES_SELECTED';
    IS_NORMAL_NODES_SELECTED.getModel = getModelUtil(IS_NORMAL_NODES_SELECTED.id);
    IS_NORMAL_NODES_SELECTED.useValue = useModelValueUtil(IS_NORMAL_NODES_SELECTED.id);
})(IS_NORMAL_NODES_SELECTED || (IS_NORMAL_NODES_SELECTED = {}));
/** 画布选中Cell状态，保存最后一个选中的节点 */
export var SELECTED_CELL;
(function (SELECTED_CELL) {
    SELECTED_CELL.id = 'LAST_SELECTED_CELL';
    SELECTED_CELL.getModel = getModelUtil(SELECTED_CELL.id);
    SELECTED_CELL.useValue = useModelValueUtil(SELECTED_CELL.id);
})(SELECTED_CELL || (SELECTED_CELL = {}));
/** 画布选中CellS状态 */
export var SELECTED_CELLS;
(function (SELECTED_CELLS) {
    SELECTED_CELLS.id = 'SELECTED_CELLS';
    SELECTED_CELLS.getModel = getModelUtil(SELECTED_CELLS.id);
    SELECTED_CELLS.useValue = useModelValueUtil(SELECTED_CELLS.id);
})(SELECTED_CELLS || (SELECTED_CELLS = {}));
/** 画布选中节点状态， 如有多个节点则保存最后一个选中的节点 */
export var SELECTED_NODE;
(function (SELECTED_NODE) {
    SELECTED_NODE.id = 'LAST_SELECTED_NODE';
    SELECTED_NODE.getModel = getModelUtil(SELECTED_NODE.id);
    SELECTED_NODE.useValue = useModelValueUtil(SELECTED_NODE.id);
})(SELECTED_NODE || (SELECTED_NODE = {}));
/** 画布选中节点状态 */
export var SELECTED_NODES;
(function (SELECTED_NODES) {
    SELECTED_NODES.id = 'SELECTED_NODES';
    SELECTED_NODES.getModel = getModelUtil(SELECTED_NODES.id);
    SELECTED_NODES.useValue = useModelValueUtil(SELECTED_NODES.id);
})(SELECTED_NODES || (SELECTED_NODES = {}));
/** 画布选中边状态 */
export var SELECTED_EDGES;
(function (SELECTED_EDGES) {
    SELECTED_EDGES.id = 'SELECTED_EDGES';
    SELECTED_EDGES.getModel = getModelUtil(SELECTED_EDGES.id);
    SELECTED_EDGES.useValue = useModelValueUtil(SELECTED_EDGES.id);
})(SELECTED_EDGES || (SELECTED_EDGES = {}));
/** 画布选中GROUP List */
export var SELECTED_GROUPS;
(function (SELECTED_GROUPS) {
    SELECTED_GROUPS.id = 'SELECTED_GROUPS';
    SELECTED_GROUPS.getModel = getModelUtil(SELECTED_GROUPS.id);
    SELECTED_GROUPS.useValue = useModelValueUtil(SELECTED_GROUPS.id);
})(SELECTED_GROUPS || (SELECTED_GROUPS = {}));
/** 画布节点右键菜单状态 */
export var CONTEXTMENU_NODE;
(function (CONTEXTMENU_NODE) {
    CONTEXTMENU_NODE.id = 'CONTEXTMENU_NODE';
    CONTEXTMENU_NODE.getModel = getModelUtil(CONTEXTMENU_NODE.id);
    CONTEXTMENU_NODE.useValue = useModelValueUtil(CONTEXTMENU_NODE.id);
})(CONTEXTMENU_NODE || (CONTEXTMENU_NODE = {}));
/** 画布边右键菜单状态 */
export var CONTEXTMENU_EDGE;
(function (CONTEXTMENU_EDGE) {
    CONTEXTMENU_EDGE.id = 'CONTEXTMENU_EDGE';
    CONTEXTMENU_EDGE.getModel = getModelUtil(CONTEXTMENU_EDGE.id);
    CONTEXTMENU_EDGE.useValue = useModelValueUtil(CONTEXTMENU_EDGE.id);
})(CONTEXTMENU_EDGE || (CONTEXTMENU_EDGE = {}));
/** 画布右键菜单状态 */
export var CONTEXTMENU_TARGET;
(function (CONTEXTMENU_TARGET) {
    CONTEXTMENU_TARGET.id = 'CONTEXTMENU_TARGET';
    CONTEXTMENU_TARGET.getModel = getModelUtil(CONTEXTMENU_TARGET.id);
    CONTEXTMENU_TARGET.useValue = useModelValueUtil(CONTEXTMENU_TARGET.id);
})(CONTEXTMENU_TARGET || (CONTEXTMENU_TARGET = {}));
/** 画布元数据状态 */
export var GRAPH_META;
(function (GRAPH_META) {
    GRAPH_META.id = 'GRAPH_META';
    GRAPH_META.getModel = getModelUtil(GRAPH_META.id);
    GRAPH_META.useValue = useModelValueUtil(GRAPH_META.id);
})(GRAPH_META || (GRAPH_META = {}));
/** 画布缩放状态 */
export var GRAPH_SCALE;
(function (GRAPH_SCALE) {
    GRAPH_SCALE.id = 'GRAPH_SCALE';
    GRAPH_SCALE.getModel = getModelUtil(GRAPH_SCALE.id);
    GRAPH_SCALE.useValue = useModelValueUtil(GRAPH_SCALE.id);
})(GRAPH_SCALE || (GRAPH_SCALE = {}));
/** COMMAND REDO STACK的状态*/
export var COMMAND_REDOABLE;
(function (COMMAND_REDOABLE) {
    COMMAND_REDOABLE.id = 'COMMAND_REDOABLE';
    COMMAND_REDOABLE.getModel = getModelUtil(COMMAND_REDOABLE.id);
    COMMAND_REDOABLE.useValue = useModelValueUtil(COMMAND_REDOABLE.id);
})(COMMAND_REDOABLE || (COMMAND_REDOABLE = {}));
/** COMMAND UNDO STACK的状态*/
export var COMMAND_UNDOABLE;
(function (COMMAND_UNDOABLE) {
    COMMAND_UNDOABLE.id = 'COMMAND_UNDOABLE';
    COMMAND_UNDOABLE.getModel = getModelUtil(COMMAND_UNDOABLE.id);
    COMMAND_UNDOABLE.useValue = useModelValueUtil(COMMAND_UNDOABLE.id);
})(COMMAND_UNDOABLE || (COMMAND_UNDOABLE = {}));
/** COMMAND 执行结果的状态*/
export var COMMAND_GLOBALS;
(function (COMMAND_GLOBALS) {
    COMMAND_GLOBALS.id = 'COMMAND_GLOBALS';
    COMMAND_GLOBALS.getModel = getModelUtil(COMMAND_GLOBALS.id);
    COMMAND_GLOBALS.useValue = useModelValueUtil(COMMAND_GLOBALS.id);
})(COMMAND_GLOBALS || (COMMAND_GLOBALS = {}));
/** History Undo Redo */
export var HISTORY_UNDOABLE;
(function (HISTORY_UNDOABLE) {
    HISTORY_UNDOABLE.id = 'HISTORY_UNDOABLE';
    HISTORY_UNDOABLE.getModel = getModelUtil(HISTORY_UNDOABLE.id);
    HISTORY_UNDOABLE.useValue = useModelValueUtil(HISTORY_UNDOABLE.id);
})(HISTORY_UNDOABLE || (HISTORY_UNDOABLE = {}));
export var HISTORY_REDOABLE;
(function (HISTORY_REDOABLE) {
    HISTORY_REDOABLE.id = 'HISTORY_REDOABLE';
    HISTORY_REDOABLE.getModel = getModelUtil(HISTORY_REDOABLE.id);
    HISTORY_REDOABLE.useValue = useModelValueUtil(HISTORY_REDOABLE.id);
})(HISTORY_REDOABLE || (HISTORY_REDOABLE = {}));
//# sourceMappingURL=constant.js.map