import type { Disposable } from '../common/disposable';
import type { Graph } from '@antv/x6';
import type { IHooks } from '../hooks/interface';
import type { IRuntimeHook } from '@antv/xflow-hook/es/interface';
import type { ICommandHandler, IContext } from '../command/interface';
import type { NsGraph } from '../interface';
import { DisposableCollection } from '../common/disposable';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IModelService } from '../model-service';
import { IGraphCommandService } from '../command/interface';
import { IHookService } from '../hooks';
export declare class CmdContext<Args = any, Result = any, Hooks extends IHooks = IHooks> implements IContext<Args, Result, Hooks> {
    /** undos 存在这里 */
    protected toDispose: DisposableCollection;
    protected readonly graphProvider: IGraphProvider;
    protected readonly hookService: IHookService<Hooks>;
    protected readonly commandService: IGraphCommandService;
    protected readonly modelService: IModelService;
    /** command handler的参数 */
    private args;
    /** command handler的runtimeHook */
    private runtimeHooks;
    /** command handler的执行结果 */
    private result;
    /** command handler的实例 */
    handlerInstance: ICommandHandler<Args, Result, Hooks>;
    /** x6 实例的缓存 */
    private graph;
    /** graph meta */
    private graphMeta;
    init(): void;
    /** 获取 x6 实例 */
    getX6Graph: () => Promise<Graph>;
    /** 获取 graph */
    getGraphConfig: () => Promise<import("..").IGraphConfig>;
    /** 获取 graphMeta */
    getGraphMeta: () => Promise<NsGraph.IGraphMeta>;
    /** 设置参数 */
    setArgs: (args: Args, runtimeHooks?: IRuntimeHook) => {
        args: Args;
        hooks: IRuntimeHook<any, any>;
    };
    /** 获取参数 */
    getArgs: () => {
        args: Args & {
            modelService: IModelService;
            commandService: IGraphCommandService;
            getGraphMeta: () => Promise<NsGraph.IGraphMeta>;
            getX6Graph: () => Promise<Graph>;
            getGraphConfig: () => Promise<import("..").IGraphConfig>;
        };
        hooks: IRuntimeHook<any, any>;
    };
    /** 设置执行结果 */
    setResult: (result: Result) => Result;
    /** 获取执行结果 */
    getResult: () => Result;
    /** hooks */
    getHooks: () => Hooks;
    /** 获取Command Service */
    getCommands: () => IGraphCommandService;
    /** 获取Context Service */
    getModelService: () => IModelService;
    /** 添加undo */
    addUndo: (disposable: Disposable | Disposable[]) => any;
    /** 执行undo */
    undo: () => Promise<void>;
    /** 是否可以执行undo */
    isUndoable: () => boolean;
    /** 获取 toDispose */
    getDisposables: () => DisposableCollection;
    /** 设置的共享变量 可以在command间共享 */
    setGlobal: <T extends unknown = any>(key: string, value: T) => void;
    /** 获取共享变量 */
    getGlobal: <T extends unknown = any>(key: string) => T;
}
