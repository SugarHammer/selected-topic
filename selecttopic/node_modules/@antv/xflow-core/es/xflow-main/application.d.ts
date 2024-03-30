import { Contribution } from 'mana-syringe';
import type { Registry } from '@antv/x6';
import { Node as X6Node, Edge as X6Edge } from '@antv/x6';
import type { IGraphPipelineCommand } from '../command/interface';
import type { MaybePromise } from '../common/types';
import type { IRuntimeHook } from '@antv/xflow-hook/es/interface';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import { IGraphCommandService } from '../command/interface';
import { IModelService } from '../model-service';
import { IFrontendApplicationContribution } from './interface';
export { IFrontendApplicationContribution } from './interface';
export declare class FrontendApplication {
    /** app的扩展 */
    protected readonly contributions: Contribution.Provider<IFrontendApplicationContribution>;
    /** graphProvider */
    readonly graphProvider: IGraphProvider;
    /** commandService */
    readonly commandService: IGraphCommandService;
    /** modelService */
    readonly modelService: IModelService;
    /** 启动app */
    start(): Promise<void>;
    /** 获取画布实例 */
    getGraphInstance: () => Promise<import("@antv/x6").Graph>;
    /** 获取画布配置项 */
    getGraphConfig: () => Promise<import("./graph").IGraphConfig>;
    /** 获取画布配置项 */
    getGraphData: () => Promise<{
        nodes: import("..").NsGraph.INodeConfig[];
        edges: import("..").NsGraph.IEdgeConfig[];
    }>;
    /** 获取画布所有节点 */
    getAllNodes: () => Promise<X6Node<X6Node.Properties>[]>;
    /** 获取画布节点 */
    getNodeById: (nodeId: string) => Promise<X6Node<X6Node.Properties>>;
    /** 获取画布所有连线 */
    getAllEdges: () => Promise<X6Edge<X6Edge.Properties>[]>;
    /** 获取画布连线 */
    getEdgeById: (edgeId: string) => Promise<X6Edge<X6Edge.Properties>>;
    /** 更新节点样式 */
    updateNodeAttrs: (node: string | X6Node, attrs: Registry.Attr.CellAttrs) => Promise<void>;
    /** 更新连线样式 */
    updateEdgeAttrs: (edge: string | X6Edge, attrs: Registry.Attr.CellAttrs) => Promise<void>;
    /** 平移画布 */
    translateGraph: (tx: number, ty: number) => Promise<void>;
    /** 暴露命令的执行接口 */
    executeCommand<Args = any, Result = any>(commandId: string, cmdArgs: Args, hook?: IRuntimeHook<Args, Result>): Promise<import("../command/interface").ICommandHandler<Args, Result, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /** 暴露命令的批量执行接口 */
    executeCommandPipeline(cmdOptions: IGraphPipelineCommand[]): Promise<import("../command/interface").ICommandHandler<any, any, {
        graphOptions: import("@antv/xflow-hook").HookHub<import("@antv/x6").Graph.Options, import("@antv/x6").Graph.Options>;
        reactNodeRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.INodeRender<any>>, Map<string, import("..").NsGraph.INodeRender<any>>>;
        reactEdgeLabelRender: import("@antv/xflow-hook").HookHub<Map<string, import("..").NsGraph.IEdgeRender<any>>, Map<string, import("..").NsGraph.IEdgeRender<any>>>;
        afterGraphInit: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        beforeGraphDestroy: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IGeneralAppService, import("../hooks/interface").IGeneralAppService>;
        x6Events: import("@antv/xflow-hook").HookHub<import("../hooks/interface").IEventCollection, import("../hooks/interface").IEventSubscription>;
    }>>;
    /**
     * Register global event listeners.
     */
    protected registerEventListeners(): void;
    /**
     * Initialize and start the frontend application contributions.
     */
    protected startContributions(): Promise<void>;
    /**
     * Stop the frontend application contributions. This is called when the window is unloaded.
     */
    protected stopContributions(): void;
    protected measure<T>(name: string, fn: () => MaybePromise<T>): Promise<T>;
}
