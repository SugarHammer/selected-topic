"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HISTORY_REDOABLE = exports.HISTORY_UNDOABLE = exports.COMMAND_GLOBALS = exports.COMMAND_UNDOABLE = exports.COMMAND_REDOABLE = exports.GRAPH_SCALE = exports.GRAPH_META = exports.CONTEXTMENU_TARGET = exports.CONTEXTMENU_EDGE = exports.CONTEXTMENU_NODE = exports.SELECTED_GROUPS = exports.SELECTED_EDGES = exports.SELECTED_NODES = exports.SELECTED_NODE = exports.SELECTED_CELLS = exports.SELECTED_CELL = exports.IS_NORMAL_NODES_SELECTED = exports.IS_GROUP_SELECTED = exports.IS_NODE_SELECTED = exports.GRAPH_FULLSCREEN = exports.GRAPH_ENABLE_MULTI_SELECT = exports.useModelValueUtil = exports.getModelUtil = exports.isModelExistUtil = void 0;
var tslib_1 = require("tslib");
/** existModel的Utils */
var isModelExistUtil = function (token) {
    return function (modelService) {
        var defer = modelService.findDeferredModel(token);
        return defer && defer.promise ? true : false;
    };
};
exports.isModelExistUtil = isModelExistUtil;
/** useModel的Utils */
var getModelUtil = function (token) {
    return function (modelService) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, modelService.awaitModel(token)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
};
exports.getModelUtil = getModelUtil;
/** useModel的Utils */
var useModelValueUtil = function (token) {
    return function (modelService) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var model;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, modelService.awaitModel(token)];
                case 1:
                    model = _a.sent();
                    return [2 /*return*/, model.getValidValue()];
            }
        });
    }); };
};
exports.useModelValueUtil = useModelValueUtil;
/** 画布是否已开启多选 */
var GRAPH_ENABLE_MULTI_SELECT;
(function (GRAPH_ENABLE_MULTI_SELECT) {
    GRAPH_ENABLE_MULTI_SELECT.id = 'GRAPH_ENABLE_MULTI_SELECT';
    GRAPH_ENABLE_MULTI_SELECT.getModel = (0, exports.getModelUtil)(GRAPH_ENABLE_MULTI_SELECT.id);
    GRAPH_ENABLE_MULTI_SELECT.useValue = (0, exports.useModelValueUtil)(GRAPH_ENABLE_MULTI_SELECT.id);
})(GRAPH_ENABLE_MULTI_SELECT = exports.GRAPH_ENABLE_MULTI_SELECT || (exports.GRAPH_ENABLE_MULTI_SELECT = {}));
/** 画布是否全屏 */
var GRAPH_FULLSCREEN;
(function (GRAPH_FULLSCREEN) {
    GRAPH_FULLSCREEN.id = 'GRAPH_FULLSCREEN';
    GRAPH_FULLSCREEN.getModel = (0, exports.getModelUtil)(GRAPH_FULLSCREEN.id);
    GRAPH_FULLSCREEN.useValue = (0, exports.useModelValueUtil)(GRAPH_FULLSCREEN.id);
})(GRAPH_FULLSCREEN = exports.GRAPH_FULLSCREEN || (exports.GRAPH_FULLSCREEN = {}));
/** 画布已选中节点 */
var IS_NODE_SELECTED;
(function (IS_NODE_SELECTED) {
    IS_NODE_SELECTED.id = 'IS_NODE_SELECTED';
    IS_NODE_SELECTED.getModel = (0, exports.getModelUtil)(IS_NODE_SELECTED.id);
    IS_NODE_SELECTED.useValue = (0, exports.useModelValueUtil)(IS_NODE_SELECTED.id);
})(IS_NODE_SELECTED = exports.IS_NODE_SELECTED || (exports.IS_NODE_SELECTED = {}));
/** 画布选中节点是Group */
var IS_GROUP_SELECTED;
(function (IS_GROUP_SELECTED) {
    IS_GROUP_SELECTED.id = 'IS_GROUP_SELECTED';
    IS_GROUP_SELECTED.getModel = (0, exports.getModelUtil)(IS_GROUP_SELECTED.id);
    IS_GROUP_SELECTED.useValue = (0, exports.useModelValueUtil)(IS_GROUP_SELECTED.id);
})(IS_GROUP_SELECTED = exports.IS_GROUP_SELECTED || (exports.IS_GROUP_SELECTED = {}));
/** 画布选中节点是Group */
var IS_NORMAL_NODES_SELECTED;
(function (IS_NORMAL_NODES_SELECTED) {
    IS_NORMAL_NODES_SELECTED.id = 'IS_NORMAL_NODES_SELECTED';
    IS_NORMAL_NODES_SELECTED.getModel = (0, exports.getModelUtil)(IS_NORMAL_NODES_SELECTED.id);
    IS_NORMAL_NODES_SELECTED.useValue = (0, exports.useModelValueUtil)(IS_NORMAL_NODES_SELECTED.id);
})(IS_NORMAL_NODES_SELECTED = exports.IS_NORMAL_NODES_SELECTED || (exports.IS_NORMAL_NODES_SELECTED = {}));
/** 画布选中Cell状态，保存最后一个选中的节点 */
var SELECTED_CELL;
(function (SELECTED_CELL) {
    SELECTED_CELL.id = 'LAST_SELECTED_CELL';
    SELECTED_CELL.getModel = (0, exports.getModelUtil)(SELECTED_CELL.id);
    SELECTED_CELL.useValue = (0, exports.useModelValueUtil)(SELECTED_CELL.id);
})(SELECTED_CELL = exports.SELECTED_CELL || (exports.SELECTED_CELL = {}));
/** 画布选中CellS状态 */
var SELECTED_CELLS;
(function (SELECTED_CELLS) {
    SELECTED_CELLS.id = 'SELECTED_CELLS';
    SELECTED_CELLS.getModel = (0, exports.getModelUtil)(SELECTED_CELLS.id);
    SELECTED_CELLS.useValue = (0, exports.useModelValueUtil)(SELECTED_CELLS.id);
})(SELECTED_CELLS = exports.SELECTED_CELLS || (exports.SELECTED_CELLS = {}));
/** 画布选中节点状态， 如有多个节点则保存最后一个选中的节点 */
var SELECTED_NODE;
(function (SELECTED_NODE) {
    SELECTED_NODE.id = 'LAST_SELECTED_NODE';
    SELECTED_NODE.getModel = (0, exports.getModelUtil)(SELECTED_NODE.id);
    SELECTED_NODE.useValue = (0, exports.useModelValueUtil)(SELECTED_NODE.id);
})(SELECTED_NODE = exports.SELECTED_NODE || (exports.SELECTED_NODE = {}));
/** 画布选中节点状态 */
var SELECTED_NODES;
(function (SELECTED_NODES) {
    SELECTED_NODES.id = 'SELECTED_NODES';
    SELECTED_NODES.getModel = (0, exports.getModelUtil)(SELECTED_NODES.id);
    SELECTED_NODES.useValue = (0, exports.useModelValueUtil)(SELECTED_NODES.id);
})(SELECTED_NODES = exports.SELECTED_NODES || (exports.SELECTED_NODES = {}));
/** 画布选中边状态 */
var SELECTED_EDGES;
(function (SELECTED_EDGES) {
    SELECTED_EDGES.id = 'SELECTED_EDGES';
    SELECTED_EDGES.getModel = (0, exports.getModelUtil)(SELECTED_EDGES.id);
    SELECTED_EDGES.useValue = (0, exports.useModelValueUtil)(SELECTED_EDGES.id);
})(SELECTED_EDGES = exports.SELECTED_EDGES || (exports.SELECTED_EDGES = {}));
/** 画布选中GROUP List */
var SELECTED_GROUPS;
(function (SELECTED_GROUPS) {
    SELECTED_GROUPS.id = 'SELECTED_GROUPS';
    SELECTED_GROUPS.getModel = (0, exports.getModelUtil)(SELECTED_GROUPS.id);
    SELECTED_GROUPS.useValue = (0, exports.useModelValueUtil)(SELECTED_GROUPS.id);
})(SELECTED_GROUPS = exports.SELECTED_GROUPS || (exports.SELECTED_GROUPS = {}));
/** 画布节点右键菜单状态 */
var CONTEXTMENU_NODE;
(function (CONTEXTMENU_NODE) {
    CONTEXTMENU_NODE.id = 'CONTEXTMENU_NODE';
    CONTEXTMENU_NODE.getModel = (0, exports.getModelUtil)(CONTEXTMENU_NODE.id);
    CONTEXTMENU_NODE.useValue = (0, exports.useModelValueUtil)(CONTEXTMENU_NODE.id);
})(CONTEXTMENU_NODE = exports.CONTEXTMENU_NODE || (exports.CONTEXTMENU_NODE = {}));
/** 画布边右键菜单状态 */
var CONTEXTMENU_EDGE;
(function (CONTEXTMENU_EDGE) {
    CONTEXTMENU_EDGE.id = 'CONTEXTMENU_EDGE';
    CONTEXTMENU_EDGE.getModel = (0, exports.getModelUtil)(CONTEXTMENU_EDGE.id);
    CONTEXTMENU_EDGE.useValue = (0, exports.useModelValueUtil)(CONTEXTMENU_EDGE.id);
})(CONTEXTMENU_EDGE = exports.CONTEXTMENU_EDGE || (exports.CONTEXTMENU_EDGE = {}));
/** 画布右键菜单状态 */
var CONTEXTMENU_TARGET;
(function (CONTEXTMENU_TARGET) {
    CONTEXTMENU_TARGET.id = 'CONTEXTMENU_TARGET';
    CONTEXTMENU_TARGET.getModel = (0, exports.getModelUtil)(CONTEXTMENU_TARGET.id);
    CONTEXTMENU_TARGET.useValue = (0, exports.useModelValueUtil)(CONTEXTMENU_TARGET.id);
})(CONTEXTMENU_TARGET = exports.CONTEXTMENU_TARGET || (exports.CONTEXTMENU_TARGET = {}));
/** 画布元数据状态 */
var GRAPH_META;
(function (GRAPH_META) {
    GRAPH_META.id = 'GRAPH_META';
    GRAPH_META.getModel = (0, exports.getModelUtil)(GRAPH_META.id);
    GRAPH_META.useValue = (0, exports.useModelValueUtil)(GRAPH_META.id);
})(GRAPH_META = exports.GRAPH_META || (exports.GRAPH_META = {}));
/** 画布缩放状态 */
var GRAPH_SCALE;
(function (GRAPH_SCALE) {
    GRAPH_SCALE.id = 'GRAPH_SCALE';
    GRAPH_SCALE.getModel = (0, exports.getModelUtil)(GRAPH_SCALE.id);
    GRAPH_SCALE.useValue = (0, exports.useModelValueUtil)(GRAPH_SCALE.id);
})(GRAPH_SCALE = exports.GRAPH_SCALE || (exports.GRAPH_SCALE = {}));
/** COMMAND REDO STACK的状态*/
var COMMAND_REDOABLE;
(function (COMMAND_REDOABLE) {
    COMMAND_REDOABLE.id = 'COMMAND_REDOABLE';
    COMMAND_REDOABLE.getModel = (0, exports.getModelUtil)(COMMAND_REDOABLE.id);
    COMMAND_REDOABLE.useValue = (0, exports.useModelValueUtil)(COMMAND_REDOABLE.id);
})(COMMAND_REDOABLE = exports.COMMAND_REDOABLE || (exports.COMMAND_REDOABLE = {}));
/** COMMAND UNDO STACK的状态*/
var COMMAND_UNDOABLE;
(function (COMMAND_UNDOABLE) {
    COMMAND_UNDOABLE.id = 'COMMAND_UNDOABLE';
    COMMAND_UNDOABLE.getModel = (0, exports.getModelUtil)(COMMAND_UNDOABLE.id);
    COMMAND_UNDOABLE.useValue = (0, exports.useModelValueUtil)(COMMAND_UNDOABLE.id);
})(COMMAND_UNDOABLE = exports.COMMAND_UNDOABLE || (exports.COMMAND_UNDOABLE = {}));
/** COMMAND 执行结果的状态*/
var COMMAND_GLOBALS;
(function (COMMAND_GLOBALS) {
    COMMAND_GLOBALS.id = 'COMMAND_GLOBALS';
    COMMAND_GLOBALS.getModel = (0, exports.getModelUtil)(COMMAND_GLOBALS.id);
    COMMAND_GLOBALS.useValue = (0, exports.useModelValueUtil)(COMMAND_GLOBALS.id);
})(COMMAND_GLOBALS = exports.COMMAND_GLOBALS || (exports.COMMAND_GLOBALS = {}));
/** History Undo Redo */
var HISTORY_UNDOABLE;
(function (HISTORY_UNDOABLE) {
    HISTORY_UNDOABLE.id = 'HISTORY_UNDOABLE';
    HISTORY_UNDOABLE.getModel = (0, exports.getModelUtil)(HISTORY_UNDOABLE.id);
    HISTORY_UNDOABLE.useValue = (0, exports.useModelValueUtil)(HISTORY_UNDOABLE.id);
})(HISTORY_UNDOABLE = exports.HISTORY_UNDOABLE || (exports.HISTORY_UNDOABLE = {}));
var HISTORY_REDOABLE;
(function (HISTORY_REDOABLE) {
    HISTORY_REDOABLE.id = 'HISTORY_REDOABLE';
    HISTORY_REDOABLE.getModel = (0, exports.getModelUtil)(HISTORY_REDOABLE.id);
    HISTORY_REDOABLE.useValue = (0, exports.useModelValueUtil)(HISTORY_REDOABLE.id);
})(HISTORY_REDOABLE = exports.HISTORY_REDOABLE || (exports.HISTORY_REDOABLE = {}));
//# sourceMappingURL=constant.js.map