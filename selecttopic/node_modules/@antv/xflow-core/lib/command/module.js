"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandRegistryModule = void 0;
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
/** Command */
var graph_command_1 = require("./graph-command");
var interface_1 = require("../command/interface");
/** Command 扩展依赖 */
var mana_syringe_1 = require("mana-syringe");
exports.commandRegistryModule = (0, mana_syringe_1.Module)(function (register) {
    /** 声明 GraphCommandRegistry */
    mana_syringe_1.Contribution.register(register, interface_1.IGraphCommandContribution);
    /** 将 GraphCommandRegistry 注册成 IFrontendApplicationContribution 的扩展 */
    /** 将 IGraphCommandContribution 注册成为扩展点 */
    register(graph_command_1.GraphCommandRegistry);
});
//# sourceMappingURL=module.js.map