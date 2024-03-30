import type { IGraphCommand } from '../command/interface';
/** 节点命令 */
export declare namespace XFlowNodeCommands {
    /** 新增节点 */
    const ADD_NODE: IGraphCommand;
    /** 删除节点 */
    const DEL_NODE: IGraphCommand;
    /** 更新链接桩 */
    const UPDATE_NODE_PORT: IGraphCommand;
    /** 更新节点 */
    const UPDATE_NODE: IGraphCommand;
    /** 节点交互：高亮节点 */
    const HIGHLIGHT_NODE: IGraphCommand;
    /** 节点交互：选中节点 */
    const SELECT_NODE: IGraphCommand;
    /** 移动节点 */
    const MOVE_NODE: IGraphCommand;
    /** 节点居中 */
    const CENTER_NODE: IGraphCommand;
    /** 节点前置：调整zindex */
    const FRONT_NODE: IGraphCommand;
    /** 节点后置：调整zindex */
    const BACK_NODE: IGraphCommand;
}
/** 边命令 */
export declare namespace XFlowEdgeCommands {
    /** 新增边 */
    const ADD_EDGE: IGraphCommand;
    /** 删除边 */
    const DEL_EDGE: IGraphCommand;
    /** 更新边 */
    const UPDATE_EDGE: IGraphCommand;
    /** 高亮边 */
    const HIGHLIGHT_EDGE: IGraphCommand;
    /** 边前置：调整zindex */
    const FRONT_EDGE: IGraphCommand;
    /** 边后置：调整zindex */
    const BACK_EDGE: IGraphCommand;
}
/** 画布命令 */
export declare namespace XFlowGraphCommands {
    /** LOAD 元数据操作 */
    const LOAD_META: IGraphCommand;
    /** LOAD DATA操作 */
    const LOAD_DATA: IGraphCommand;
    /** SAVE GRAPH DATA操作 */
    const SAVE_GRAPH_DATA: IGraphCommand;
    /** LAYOUT */
    const GRAPH_LAYOUT: IGraphCommand;
    /** Graph Render */
    const GRAPH_RENDER: IGraphCommand;
    /** UNDO 操作 */
    const UNDO_CMD: IGraphCommand;
    /** REDO 操作 */
    const REDO_CMD: IGraphCommand;
    /** Graph General Operations: XFlow命令不满足的可以用这个命令，直接使用Graph的api */
    const GRAPH_INSTANCE_COMMAND: IGraphCommand;
    /** Graph Zoom */
    const GRAPH_ZOOM: IGraphCommand;
    /** Graph Fullscreen */
    const GRAPH_FULLSCREEN: IGraphCommand;
    /** Graph Resize */
    const GRAPH_RESIZE: IGraphCommand;
    /** Graph Copy */
    const GRAPH_COPY: IGraphCommand;
    /** Graph Paste */
    const GRAPH_PASTE: IGraphCommand;
    /** Graph 开启框选 */
    const GRAPH_TOGGLE_MULTI_SELECT: IGraphCommand;
    /** 新增 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    const GRAPH_ADD_TOOL: IGraphCommand;
    /** 删除 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    const GRAPH_DEL_TOOL: IGraphCommand;
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95 */
    const GRAPH_HISTORY_UNDO: IGraphCommand;
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    const GRAPH_HISTORY_REDO: IGraphCommand;
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    const GRAPH_HISTORY_RESET: IGraphCommand;
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    const GRAPH_HISTORY_TOGGLE: IGraphCommand;
}
/** 全局状态 */
export declare namespace XFlowModelCommands {
    /** Update model 操作 */
    const UPDATE_MODEL: IGraphCommand;
}
/** 全局状态 */
export declare namespace XFlowGroupCommands {
    /** 初始化群组操作 */
    const INIT_GROUP: IGraphCommand;
    /** ADD GROUP 操作 */
    const ADD_GROUP: IGraphCommand;
    /** DELETE GROUP 操作 */
    const DEL_GROUP: IGraphCommand;
    /** 折叠操作 */
    const COLLAPSE_GROUP: IGraphCommand;
}
