"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASPECTRATIONODE = exports.NODEPOOL = exports.DefaultNodeConfig = exports.NODE_PADDING = exports.NODE_HEIGHT = exports.NODE_WIDTH = exports.GROUP_NODE_RENDER_ID = exports.CONTAINER_CLASS = exports.PANEL_HEADER_HEIGHT = void 0;
exports.PANEL_HEADER_HEIGHT = 40;
exports.CONTAINER_CLASS = 'xflow-node-panel-collpase';
/** 组群 ID */
exports.GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID';
// 节点默认尺寸
exports.NODE_WIDTH = 60;
exports.NODE_HEIGHT = 40;
// svg 绘制起始点，解决边不清晰的问题
exports.NODE_PADDING = 1;
exports.DefaultNodeConfig = {
    stroke: '#A2B1C3',
    fill: '#FFFFFF',
    fontFill: '#000',
    fontSize: 12,
    label: '',
};
exports.NODEPOOL = [
    {
        name: 'Terminal',
    },
    {
        name: 'Process',
    },
    {
        name: 'Decision',
    },
    {
        name: 'Multi Document',
    },
    {
        name: 'Connector',
        width: exports.NODE_HEIGHT,
        height: exports.NODE_HEIGHT,
    },
    {
        name: 'DataIO',
        ports: ['top', 'bottom'],
    },
    {
        name: 'Database',
    },
    {
        name: 'Hard Disk',
    },
    {
        name: 'Stroed Data',
    },
    {
        name: 'Document',
    },
    {
        name: 'Predefined Process',
    },
    {
        name: 'Extract',
    },
    {
        name: 'Merge',
    },
    {
        name: 'Or',
        width: exports.NODE_HEIGHT,
        height: exports.NODE_HEIGHT,
    },
    {
        name: 'Manual Input',
    },
    {
        name: 'Preparation',
    },
    {
        name: 'Delay',
    },
    {
        name: 'Manual Operation',
    },
    {
        name: 'Display',
    },
    {
        name: 'Off Page Link',
    },
    {
        name: 'Note Left',
        label: '≣',
    },
    {
        name: 'Note Right',
        label: '≣',
    },
    {
        name: 'Internal Storage',
    },
    {
        name: 'Text',
        label: 'text',
    },
];
// 缩放时保存同比例
exports.ASPECTRATIONODE = ['Connector', 'Or'];
//# sourceMappingURL=constants.js.map