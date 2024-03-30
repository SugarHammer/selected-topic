"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartService = exports.EditorPanels = exports.defaultControlMapService = void 0;
var node_1 = require("./components/node");
var edge_1 = require("./components/edge");
var group_1 = require("./components/group");
var canvas_1 = require("./components/canvas");
var fields_1 = require("./components/fields");
Object.defineProperty(exports, "EditorPanels", { enumerable: true, get: function () { return fields_1.EditorPanels; } });
/** 默认支持修改标签和重命名功能 */
var defaultControlMapService = function (controlMap) {
    controlMap.set('node-service', node_1.NodeService);
    controlMap.set('edge-service', edge_1.EdgeService);
    controlMap.set('group-service', group_1.GroupService);
    controlMap.set('canvas-service', canvas_1.CanvasService);
    return controlMap;
};
exports.defaultControlMapService = defaultControlMapService;
exports.FlowchartService = {
    NodeService: node_1.NodeService,
    EdgeService: edge_1.EdgeService,
    GroupService: group_1.GroupService,
    CanvasService: canvas_1.CanvasService,
};
//# sourceMappingURL=index.js.map