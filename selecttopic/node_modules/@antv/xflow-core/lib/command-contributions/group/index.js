"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookhubList = exports.registerGroupCommand = void 0;
var group_add_1 = require("./group-add");
var group_del_1 = require("./group-del");
var group_init_1 = require("./group-init");
var group_toggle_collapse_1 = require("./group-toggle-collapse");
/** 注册Command Handler Class */
var registerGroupCommand = function (register) {
    register(group_add_1.AddGroupCommand);
    register(group_del_1.DelGroupCommand);
    register(group_init_1.InitGroupCommand);
    register(group_toggle_collapse_1.CollapseGroupCommand);
};
exports.registerGroupCommand = registerGroupCommand;
/** app onStart 时, 注册 Command Hooks */
exports.hookhubList = [group_add_1.NsAddGroup, group_del_1.NsDelGroup, group_init_1.NsInitGroup, group_toggle_collapse_1.NsCollapseGroup];
//# sourceMappingURL=index.js.map