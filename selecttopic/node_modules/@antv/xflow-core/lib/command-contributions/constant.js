"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowGroupCommands = exports.XFlowModelCommands = exports.XFlowGraphCommands = exports.XFlowEdgeCommands = exports.XFlowNodeCommands = void 0;
/** 节点命令 */
var XFlowNodeCommands;
(function (XFlowNodeCommands) {
    var category = '节点操作';
    /** 新增节点 */
    XFlowNodeCommands.ADD_NODE = {
        id: 'xflow:add-node',
        label: '添加节点',
        category: category,
    };
    /** 删除节点 */
    XFlowNodeCommands.DEL_NODE = {
        id: 'xflow:del-node',
        label: '删除节点',
        category: category,
    };
    /** 更新链接桩 */
    XFlowNodeCommands.UPDATE_NODE_PORT = {
        id: 'xflow:update-node-port',
        label: '删除连接桩',
        category: category,
    };
    /** 更新节点 */
    XFlowNodeCommands.UPDATE_NODE = {
        id: 'xflow:update-node',
        label: '更新节点',
        category: category,
    };
    /** 节点交互：高亮节点 */
    XFlowNodeCommands.HIGHLIGHT_NODE = {
        id: 'xflow:highlight-node',
        label: '高亮节点',
        category: category,
    };
    /** 节点交互：选中节点 */
    XFlowNodeCommands.SELECT_NODE = {
        id: 'xflow:select-node',
        label: '选中节点',
        category: category,
    };
    /** 移动节点 */
    XFlowNodeCommands.MOVE_NODE = {
        id: 'xflow:move-node',
        label: 'Move Node',
        category: category,
    };
    /** 节点居中 */
    XFlowNodeCommands.CENTER_NODE = {
        id: 'xflow:center-node',
        label: '居中节点',
        category: category,
    };
    /** 节点前置：调整zindex */
    XFlowNodeCommands.FRONT_NODE = {
        id: 'xflow:front-node',
        label: '前置节点',
        category: category,
    };
    /** 节点后置：调整zindex */
    XFlowNodeCommands.BACK_NODE = {
        id: 'xflow:back-node',
        label: '后置节点',
        category: category,
    };
})(XFlowNodeCommands = exports.XFlowNodeCommands || (exports.XFlowNodeCommands = {}));
/** 边命令 */
var XFlowEdgeCommands;
(function (XFlowEdgeCommands) {
    var category = '边操作';
    /** 新增边 */
    XFlowEdgeCommands.ADD_EDGE = {
        id: 'xflow:add-edge',
        label: '添加边',
        category: category,
    };
    /** 删除边 */
    XFlowEdgeCommands.DEL_EDGE = {
        id: 'xflow:del-edge',
        label: '删除边',
        category: category,
    };
    /** 更新边 */
    XFlowEdgeCommands.UPDATE_EDGE = {
        id: 'xflow:update-edge',
        label: '更新边',
        category: category,
    };
    /** 高亮边 */
    XFlowEdgeCommands.HIGHLIGHT_EDGE = {
        id: 'xflow:highlight-edge',
        label: '高亮边',
        category: category,
    };
    /** 边前置：调整zindex */
    XFlowEdgeCommands.FRONT_EDGE = {
        id: 'xflow:front-edge',
        label: '前置变',
        category: category,
    };
    /** 边后置：调整zindex */
    XFlowEdgeCommands.BACK_EDGE = {
        id: 'xflow:back-edge',
        label: '后置边',
        category: category,
    };
})(XFlowEdgeCommands = exports.XFlowEdgeCommands || (exports.XFlowEdgeCommands = {}));
/** 画布命令 */
var XFlowGraphCommands;
(function (XFlowGraphCommands) {
    var category = '画布操作';
    /** LOAD 元数据操作 */
    XFlowGraphCommands.LOAD_META = {
        id: 'xflow:load-meta',
        label: '获取元数据',
        category: category,
    };
    /** LOAD DATA操作 */
    XFlowGraphCommands.LOAD_DATA = {
        id: 'xflow:load-data',
        label: '获取图数据',
        category: category,
    };
    /** SAVE GRAPH DATA操作 */
    XFlowGraphCommands.SAVE_GRAPH_DATA = {
        id: 'xflow:save-graph-data',
        label: '保存',
        category: category,
    };
    /** LAYOUT */
    XFlowGraphCommands.GRAPH_LAYOUT = {
        id: 'xflow:layout',
        label: '计算布局',
        category: category,
    };
    /** Graph Render */
    XFlowGraphCommands.GRAPH_RENDER = {
        id: 'xflow:graph-render',
        label: '渲染画布',
        category: category,
    };
    /** UNDO 操作 */
    XFlowGraphCommands.UNDO_CMD = {
        id: 'xflow:undo-cmd',
        label: '撤销',
        category: category,
    };
    /** REDO 操作 */
    XFlowGraphCommands.REDO_CMD = {
        id: 'xflow:redo-cmd',
        label: '重做',
        category: category,
    };
    /** Graph General Operations: XFlow命令不满足的可以用这个命令，直接使用Graph的api */
    XFlowGraphCommands.GRAPH_INSTANCE_COMMAND = {
        id: 'xflow:graph-instacne-cmd',
        label: 'Graph通用Command',
        category: category,
    };
    /** Graph Zoom */
    XFlowGraphCommands.GRAPH_ZOOM = {
        id: 'xflow:graph-zoom',
        label: '缩放画布',
        category: category,
    };
    /** Graph Fullscreen */
    XFlowGraphCommands.GRAPH_FULLSCREEN = {
        id: 'xflow:graph-fullscreen',
        label: '全屏',
        category: category,
    };
    /** Graph Resize */
    XFlowGraphCommands.GRAPH_RESIZE = {
        id: 'xflow:graph-resize',
        label: '调整窗口大小',
        category: category,
    };
    /** Graph Copy */
    XFlowGraphCommands.GRAPH_COPY = {
        id: 'xflow:graph-copy-selection',
        label: '复制',
        category: category,
    };
    /** Graph Paste */
    XFlowGraphCommands.GRAPH_PASTE = {
        id: 'xflow:graph-paste-selection',
        label: '粘贴',
        category: category,
    };
    /** Graph 开启框选 */
    XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT = {
        id: 'xflow:graph-toggle-multi-select',
        label: '启用框选',
        category: category,
    };
    /** 新增 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    XFlowGraphCommands.GRAPH_ADD_TOOL = {
        id: 'xflow:add-tool',
        label: '添加工具',
        category: category,
    };
    /** 删除 Tool: https://x6.antv.vision/zh/docs/api/registry/edge-tool */
    XFlowGraphCommands.GRAPH_DEL_TOOL = {
        id: 'xflow:del-tool',
        label: '删除工具',
        category: category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95 */
    XFlowGraphCommands.GRAPH_HISTORY_UNDO = {
        id: 'xflow:history-undo',
        label: 'history undo',
        category: category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_REDO = {
        id: 'xflow:history-redo',
        label: 'history redo',
        category: category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_RESET = {
        id: 'xflow:history-reset',
        label: 'history reset',
        category: category,
    };
    /** history: https://x6.antv.vision/zh/docs/api/graph/history#%E6%96%B9%E6%B3%95  */
    XFlowGraphCommands.GRAPH_HISTORY_TOGGLE = {
        id: 'xflow:history-toggle',
        label: 'history toggle',
        category: category,
    };
})(XFlowGraphCommands = exports.XFlowGraphCommands || (exports.XFlowGraphCommands = {}));
/** 全局状态 */
var XFlowModelCommands;
(function (XFlowModelCommands) {
    var category = '状态操作';
    /** Update model 操作 */
    XFlowModelCommands.UPDATE_MODEL = {
        id: 'xflow:update-model',
        label: '设置状态值',
        category: category,
    };
})(XFlowModelCommands = exports.XFlowModelCommands || (exports.XFlowModelCommands = {}));
/** 全局状态 */
var XFlowGroupCommands;
(function (XFlowGroupCommands) {
    var category = '群组操作';
    /** 初始化群组操作 */
    XFlowGroupCommands.INIT_GROUP = {
        id: 'xflow:init-group',
        label: '初始化群组',
        category: category,
    };
    /** ADD GROUP 操作 */
    XFlowGroupCommands.ADD_GROUP = {
        id: 'xflow:add-group',
        label: '新建群组',
        category: category,
    };
    /** DELETE GROUP 操作 */
    XFlowGroupCommands.DEL_GROUP = {
        id: 'xflow:del-group',
        label: '解散群组',
        category: category,
    };
    /** 折叠操作 */
    XFlowGroupCommands.COLLAPSE_GROUP = {
        id: 'xflow:collapse-group',
        label: '折叠群组',
        category: category,
    };
})(XFlowGroupCommands = exports.XFlowGroupCommands || (exports.XFlowGroupCommands = {}));
//# sourceMappingURL=constant.js.map