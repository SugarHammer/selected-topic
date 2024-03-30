"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookhubList = exports.registerNodeCommand = void 0;
/** commands */
var node_add_1 = require("./node-add");
var node_del_1 = require("./node-del");
var node_select_1 = require("./node-select");
var node_move_1 = require("./node-move");
var node_update_1 = require("./node-update");
var node_center_1 = require("./node-center");
var node_front_1 = require("./node-front");
var node_back_1 = require("./node-back");
var node_highlight_1 = require("./node-highlight");
var node_update_port_1 = require("./node-update-port");
/** 注册Command Handler Class */
var registerNodeCommand = function (register) {
    register(node_add_1.AddNodeCommand);
    register(node_del_1.DelNodeCommand);
    register(node_select_1.SelectNodeCommand);
    register(node_move_1.MoveNodeCommand);
    register(node_update_1.UpdateNodeCommand);
    register(node_center_1.CenterNodeCommand);
    register(node_front_1.FrontNodeCommand);
    register(node_back_1.BackNodeCommand);
    register(node_highlight_1.HighlightNodeCommand);
    register(node_update_port_1.UpdateNodePort);
};
exports.registerNodeCommand = registerNodeCommand;
/** app onStart 时, 注册 Command Hooks */
exports.hookhubList = [
    node_add_1.NsAddNode,
    node_del_1.NsDelNode,
    node_select_1.NsSelectNode,
    node_move_1.NsMoveNode,
    node_update_1.NsUpdateNode,
    node_center_1.NsCenterNode,
    node_front_1.NsFrontNode,
    node_back_1.NsBackNode,
    node_highlight_1.NsHighlightNode,
    node_update_port_1.NsUpdateNodePort,
];
//# sourceMappingURL=index.js.map