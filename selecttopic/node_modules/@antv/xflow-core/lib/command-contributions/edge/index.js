"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookhubList = exports.registerEdgeCommand = void 0;
/** commands */
var edge_add_1 = require("./edge-add");
var edge_del_1 = require("./edge-del");
var edge_update_1 = require("./edge-update");
var edge_highlight_1 = require("./edge-highlight");
var edge_front_1 = require("./edge-front");
var edge_back_1 = require("./edge-back");
/** 注册Command Handler Class */
var registerEdgeCommand = function (register) {
    register(edge_add_1.AddEdgeCommand);
    register(edge_del_1.DelEdgeCommand);
    register(edge_update_1.UpdateEdgeCommand);
    register(edge_highlight_1.HighlightEdgeCommand);
    register(edge_front_1.FrontEdgeCommand);
    register(edge_back_1.BackEdgeCommand);
};
exports.registerEdgeCommand = registerEdgeCommand;
/** app onStart 时, 注册 Command Hooks */
exports.hookhubList = [edge_add_1.NsAddEdge, edge_del_1.NsDelEdge, edge_update_1.NsUpdateEdge, edge_highlight_1.NsHighlightEdge, edge_front_1.NsFrontEdge, edge_back_1.NsBackEdge];
//# sourceMappingURL=index.js.map