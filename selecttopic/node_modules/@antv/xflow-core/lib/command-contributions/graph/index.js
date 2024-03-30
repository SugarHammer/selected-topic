"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookhubList = exports.registerGraphCommand = void 0;
// 数据相关
var graph_meta_1 = require("./graph-meta");
var graph_save_data_1 = require("./graph-save-data");
var graph_load_data_1 = require("./graph-load-data");
// 渲染相关
var graph_layout_1 = require("./graph-layout");
var graph_render_1 = require("./graph-render");
var graph_resize_1 = require("./graph-resize");
// 全屏
var graph_fulllscreen_1 = require("./graph-fulllscreen");
// 画布操作相关
var graph_zoom_1 = require("./graph-zoom");
var graph_copy_1 = require("./graph-copy");
var graph_paste_1 = require("./graph-paste");
var graph_toggle_multi_select_1 = require("./graph-toggle-multi-select");
// history 相关
var graph_history_undo_1 = require("./graph-history-undo");
var graph_history_redo_1 = require("./graph-history-redo");
var graph_history_toggle_1 = require("./graph-history-toggle");
var graph_history_reset_1 = require("./graph-history-reset");
// Tool相关
var graph_add_tool_1 = require("./graph-add-tool");
var graph_del_tool_1 = require("./graph-del-tool");
// xflow-command
var graph_cmd_redo_1 = require("./graph-cmd-redo");
var graph_cmd_undo_1 = require("./graph-cmd-undo");
/** 注册Command Handler Class */
var registerGraphCommand = function (register) {
    // 数据
    register(graph_meta_1.GraphMetaCommand);
    register(graph_load_data_1.GraphLoadDataCommand);
    register(graph_save_data_1.GraphSaveDataCommand);
    // render
    register(graph_layout_1.GraphLayoutCommand);
    register(graph_render_1.GraphRenderCommand);
    register(graph_resize_1.GraphResizeCommand);
    // hisotry
    register(graph_history_undo_1.GraphHistoryUndoCommand);
    register(graph_history_redo_1.GraphHistoryRedoCommand);
    register(graph_history_toggle_1.GraphHistoryToggleCommand);
    register(graph_history_reset_1.GraphHistoryResetCommand);
    // xflow command
    register(graph_cmd_redo_1.GraphRedoCommand);
    register(graph_cmd_undo_1.GraphUndoCommand);
    // graph 操作
    register(graph_zoom_1.GraphZoomCommand);
    register(graph_toggle_multi_select_1.GraphToggleMultiSelectCommand);
    register(graph_copy_1.GraphCopySelectionCommand);
    register(graph_paste_1.GraphPasteSelectionCommand);
    register(graph_fulllscreen_1.GraphFullscreenCommand);
    // tools
    register(graph_add_tool_1.GraphAddToolCommand);
    register(graph_del_tool_1.GraphDelToolCommand);
};
exports.registerGraphCommand = registerGraphCommand;
/** app onStart 时, 注册 Command Hooks */
exports.hookhubList = [
    // 数据
    graph_meta_1.NsGraphMeta,
    graph_save_data_1.NsGraphSaveData,
    graph_load_data_1.NsGraphLoadData,
    // hisotry
    graph_history_undo_1.NsGraphHistoryUndo,
    graph_history_redo_1.NsGraphHistoryRedo,
    graph_history_reset_1.NsGraphHistoryReset,
    graph_history_toggle_1.NsGraphHistoryToggle,
    // render
    graph_layout_1.NsGraphLayout,
    graph_render_1.NsGraphRender,
    graph_resize_1.NsGraphResize,
    graph_fulllscreen_1.NsGraphFullscreen,
    // xflow command
    graph_cmd_redo_1.NsRedoCmd,
    graph_cmd_undo_1.NsUndoCmd,
    // graph 操作
    graph_zoom_1.NsGraphZoom,
    graph_toggle_multi_select_1.NsGraphToggleMultiSelect,
    graph_copy_1.NsGraphCopySelection,
    graph_paste_1.NsGraphPasteSelection,
    // tools
    graph_add_tool_1.NsGraphAddTool,
    graph_del_tool_1.NsGraphDelTool,
];
//# sourceMappingURL=index.js.map