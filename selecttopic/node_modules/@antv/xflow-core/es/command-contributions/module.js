import 'reflect-metadata';
/** Application 扩展依赖 */
import { ICommandHandler, IGraphCommandFactory, ICommandContextProvider, } from '../command/interface';
import { Module } from 'mana-syringe';
import { CmdContext } from './cmd-context';
import { registerCommandConfig } from './config';
import { registerXFlowCommandContribution } from './command-contribution';
import { GraphMappingHelper } from './mapping-service';
/** 依赖扩展模块，必须要加载 */
export const createModule = (commandConfig) => {
    return Module(register => {
        /** 注册 mapping helper */
        register(GraphMappingHelper);
        /** 注册 CommandConfig */
        registerCommandConfig(register, commandConfig);
        /** 注册 Command扩展 */
        registerXFlowCommandContribution(register, commandConfig);
        /** 注册 Context Clz */
        register(CmdContext);
        /** ICommandHandler 工厂 */
        register(IGraphCommandFactory, {
            useFactory: context => {
                return (commandId, args, hook) => {
                    const child = context.container.createChild();
                    /** 实例化 Context */
                    const cmdContext = child.get(CmdContext);
                    /** 绑定 CommandContext 工厂类 */
                    child.register(ICommandContextProvider, {
                        useDynamic: () => {
                            return () => cmdContext;
                        },
                    });
                    /** 实例化CommandHandler */
                    const commandHandler = child.getNamed(ICommandHandler, commandId);
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
//# sourceMappingURL=module.js.map