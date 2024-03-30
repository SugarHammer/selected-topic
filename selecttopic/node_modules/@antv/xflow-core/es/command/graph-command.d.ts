import { Contribution } from 'mana-syringe';
import { RxModel } from '../common/rx-model';
import { Disposable, DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import type { ICommandHandler, IGraphCommand, ICommandFactory, IGraphPipelineCommand, ICommandRegisterFunction } from './interface';
import { IGraphCommandService, IGraphCommandContribution } from './interface';
import type { IRuntimeHook } from '@antv/xflow-hook/es/interface';
import 'reflect-metadata';
export declare namespace NCommand {
    function is(arg: IGraphCommand | any): arg is IGraphCommand;
    /** Comparator function for when sorting commands */
    function compareCommands(a: IGraphCommand, b: IGraphCommand): number;
    /**
     * Determine if two commands are equal.
     *
     * @param a the first command for comparison.
     * @param b the second command for comparison.
     */
    function equals(a: IGraphCommand, b: IGraphCommand): boolean;
}
export declare class GraphCommandRegistry implements IGraphCommandService, IFrontendApplicationContribution {
    protected readonly contributionProvider: Contribution.Provider<IGraphCommandContribution>;
    /**
     * undo cmd后将命令存储在队列中给redo调用
     */
    protected readonly redoStack: ICommandHandler[];
    /**
     * executeCommand后将命令存储在队列中给undo调用
     */
    protected readonly undoStack: ICommandHandler[];
    /**
     * 储存所有注册的command
     */
    protected readonly commands: Map<string, IGraphCommand>;
    /**
     * 储存所有注册的command factory
     */
    protected readonly factories: Map<string, ICommandFactory<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /**
     * 储存所有注册的command handler disposables
     */
    protected readonly disposables: Map<string, DisposableCollection>;
    /**
     * 监听cmdregistry的变化
     */
    private readonly cmdChangeEvent;
    /**
     * 监听cmdregistry的变化
     */
    get watchChange(): import("../common/rx-model").NsModel.IWatch<null>;
    /**
     * 在Command实例间共享变量
     */
    readonly Globals: RxModel<Map<any, any>>;
    /** 设置command间的共享变量 */
    setGlobal: (key: string, value: any) => void;
    /** 获取共享变量 */
    getGlobal: (key: string) => any;
    constructor(contributionProvider: Contribution.Provider<IGraphCommandContribution>);
    onStart(): void;
    executeCommandPipeline(cmdOptions: IGraphPipelineCommand[]): Promise<ICommandHandler<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /** 执行 Command：会在undo stack中push cmd */
    executeCommand<Args = any, Result = any>(commandId: string, cmdArgs: Args, hook?: IRuntimeHook<Args, Result>): Promise<ICommandHandler<Args, Result, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /** 执行 unod Command：不会在undo stack中push新的command记录 */
    executeUndoCommand<T = any>(commandId: string, cmdArgs: T, hook?: IRuntimeHook<T, any>): Promise<ICommandHandler<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    createCommand<T = any>(commandId: string, cmdArgs: T, hook?: IRuntimeHook<T, any>): Promise<ICommandHandler<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /**
     * 执行undo stack中最后一条Command
     */
    undoCommand: () => Promise<void>;
    /**
     * 执行redo stack中最后一条Command
     */
    redoCommand: () => Promise<void>;
    /**
     * 检查是否注册了Command
     */
    get isUndoable(): boolean;
    /**
     * 检查是否注册了Command
     */
    get isRedoable(): boolean;
    /**
     * 检查是否注册了Command
     */
    hasCommand(commandId: string): boolean;
    /**
     * Get a command for the given command identifier.
     */
    getCommand(id: string): IGraphCommand | undefined;
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    registerCommand(command: IGraphCommand, factory: ICommandFactory): Disposable;
    /**
     * 注册一批可单独dispose的Command
     * @param externalRegisterFn ICommandRegisterFunction
     */
    registerDisposableCommand: (externalRegisterFn: ICommandRegisterFunction) => DisposableCollection;
    protected doRegisterCommand(command: IGraphCommand): Disposable;
    /**
     * Unregister command from the registry
     *
     * @param command
     */
    unregisterCommand(command: IGraphCommand): void;
    /**
     * 检查commandId是否有Factory
     */
    hasFactory(commandId: string): boolean;
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    getFactory(commandId: string): ICommandFactory | undefined;
    /**
     * Register the given handler for the given command identifier.
     *
     * If there is already a handler for the given command
     * then the given handler is registered as more specific, and
     * has higher priority during enablement, visibility and toggle state evaluations.
     */
    registerFactory(commandId: string, factory: ICommandFactory, force?: boolean): Disposable;
    /**
     * Returns with all handlers for the given command. If the command does not have any handlers,
     * or the command is not registered, returns an empty array.
     */
    getAllFactories(): [string, ICommandFactory<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>][];
}
