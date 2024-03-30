import 'reflect-metadata';
/** Application 扩展依赖 */
import { IGraphCommandFactory, IGraphCommandContribution } from '../command/interface';
import type { GraphCommandRegistry } from '../command/graph-command';
import type { Syringe } from 'mana-syringe';
import type { IHookService } from '../hooks/interface';
import { IHookContribution } from '../hooks/interface';
import { Disposable, DisposableCollection } from '../common/disposable';
import { CommandConfig } from './config';
import type { ICmdHooks } from './interface';
export declare class XFlowCommandContribution implements IGraphCommandContribution, IHookContribution<ICmdHooks> {
    /** 命令工厂 */
    commandFactory: IGraphCommandFactory;
    /** 命令工厂 */
    commandConfig: CommandConfig;
    /** 注册画布节点命令 */
    registerGraphCommands(registry: GraphCommandRegistry): void;
    /** 注册钩子 */
    registerHook: (hooks: ICmdHooks) => Promise<Disposable>;
    /** 注册钩子 */
    registerHookHub: (registry: IHookService<ICmdHooks>) => Promise<DisposableCollection>;
}
export declare const registerXFlowCommandContribution: (register: Syringe.Register, commandConfig: CommandConfig) => void;
