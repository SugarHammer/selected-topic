// 数据相关
import { NsGraphMeta, GraphMetaCommand } from './graph-meta';
import { NsGraphSaveData, GraphSaveDataCommand } from './graph-save-data';
import { GraphLoadDataCommand, NsGraphLoadData } from './graph-load-data';
// 渲染相关
import { GraphLayoutCommand, NsGraphLayout } from './graph-layout';
import { GraphRenderCommand, NsGraphRender } from './graph-render';
import { GraphResizeCommand, NsGraphResize } from './graph-resize';
// 全屏
import { GraphFullscreenCommand, NsGraphFullscreen } from './graph-fulllscreen';
// 画布操作相关
import { NsGraphZoom, GraphZoomCommand } from './graph-zoom';
import { NsGraphCopySelection, GraphCopySelectionCommand } from './graph-copy';
import { NsGraphPasteSelection, GraphPasteSelectionCommand } from './graph-paste';
import { GraphToggleMultiSelectCommand, NsGraphToggleMultiSelect, } from './graph-toggle-multi-select';
// history 相关
import { NsGraphHistoryUndo, GraphHistoryUndoCommand } from './graph-history-undo';
import { NsGraphHistoryRedo, GraphHistoryRedoCommand } from './graph-history-redo';
import { NsGraphHistoryToggle, GraphHistoryToggleCommand } from './graph-history-toggle';
import { NsGraphHistoryReset, GraphHistoryResetCommand } from './graph-history-reset';
// Tool相关
import { NsGraphAddTool, GraphAddToolCommand } from './graph-add-tool';
import { NsGraphDelTool, GraphDelToolCommand } from './graph-del-tool';
// xflow-command
import { NsRedoCmd, GraphRedoCommand } from './graph-cmd-redo';
import { NsUndoCmd, GraphUndoCommand } from './graph-cmd-undo';
/** 注册Command Handler Class */
export const registerGraphCommand = (register) => {
    // 数据
    register(GraphMetaCommand);
    register(GraphLoadDataCommand);
    register(GraphSaveDataCommand);
    // render
    register(GraphLayoutCommand);
    register(GraphRenderCommand);
    register(GraphResizeCommand);
    // hisotry
    register(GraphHistoryUndoCommand);
    register(GraphHistoryRedoCommand);
    register(GraphHistoryToggleCommand);
    register(GraphHistoryResetCommand);
    // xflow command
    register(GraphRedoCommand);
    register(GraphUndoCommand);
    // graph 操作
    register(GraphZoomCommand);
    register(GraphToggleMultiSelectCommand);
    register(GraphCopySelectionCommand);
    register(GraphPasteSelectionCommand);
    register(GraphFullscreenCommand);
    // tools
    register(GraphAddToolCommand);
    register(GraphDelToolCommand);
};
/** app onStart 时, 注册 Command Hooks */
export const hookhubList = [
    // 数据
    NsGraphMeta,
    NsGraphSaveData,
    NsGraphLoadData,
    // hisotry
    NsGraphHistoryUndo,
    NsGraphHistoryRedo,
    NsGraphHistoryReset,
    NsGraphHistoryToggle,
    // render
    NsGraphLayout,
    NsGraphRender,
    NsGraphResize,
    NsGraphFullscreen,
    // xflow command
    NsRedoCmd,
    NsUndoCmd,
    // graph 操作
    NsGraphZoom,
    NsGraphToggleMultiSelect,
    NsGraphCopySelection,
    NsGraphPasteSelection,
    // tools
    NsGraphAddTool,
    NsGraphDelTool,
];
//# sourceMappingURL=index.js.map