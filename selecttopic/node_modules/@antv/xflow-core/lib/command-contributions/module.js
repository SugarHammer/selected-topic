"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
var interface_1 = require("../command/interface");
var mana_syringe_1 = require("mana-syringe");
var cmd_context_1 = require("./cmd-context");
var config_1 = require("./config");
var command_contribution_1 = require("./command-contribution");
var mapping_service_1 = require("./mapping-service");
/** 依赖扩展模块，必须要加载 */
var createModule = function (commandConfig) {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 注册 mapping helper */
        register(mapping_service_1.GraphMappingHelper);
        /** 注册 CommandConfig */
        (0, config_1.registerCommandConfig)(register, commandConfig);
        /** 注册 Command扩展 */
        (0, command_contribution_1.registerXFlowCommandContribution)(register, commandConfig);
        /** 注册 Context Clz */
        register(cmd_context_1.CmdContext);
        /** ICommandHandler 工厂 */
        register(interface_1.IGraphCommandFactory, {
            useFactory: function (context) {
                return function (commandId, args, hook) {
                    var child = context.container.createChild();
                    /** 实例化 Context */
                    var cmdContext = child.get(cmd_context_1.CmdContext);
                    /** 绑定 CommandContext 工厂类 */
                    child.register(interface_1.ICommandContextProvider, {
                        useDynamic: function () {
                            return function () { return cmdContext; };
                        },
                    });
                    /** 实例化CommandHandler */
                    var commandHandler = child.getNamed(interface_1.ICommandHandler, commandId);
                    /** 设置参数 */
                    cmdContext.setArgs(args, hook);
                    /** 绑定关系 */
                    cmdContext.handlerInstance = commandHandler;
                    return commandHandler;
                };
            },
        });
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map