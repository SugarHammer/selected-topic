import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { Edge as X6Edge, Model } from '@antv/x6';
import { ICommandHandler } from '../../command/interface';
export declare type ICommand = ICommandHandler<NsAddEdge.IArgs, NsAddEdge.IResult, NsAddEdge.ICmdHooks>;
export declare namespace NsAddEdge {
    interface IX6EdgePlainConfig {
        sourceCell?: string;
        sourcePort?: string;
        targetCell?: string;
        targetPort?: string;
    }
    interface IX6EdgeObjectConfig {
        source: {
            cell: string;
            port: string;
        };
        target: {
            cell: string;
            port: string;
        };
    }
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "addEdge";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 边的元数据 */
        edgeConfig: NsGraph.IEdgeConfig;
        /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
        options?: Model.AddOptions;
        /** cell的工厂方法 */
        cellFactory?: IEdgeCellFactory;
        /** 创建 edge id的方法（可选） */
        createIdService?: ICreateEdgeIdService;
        /** 创建 edgeCell 的方法 */
        createEdgeService?: ICreateEdgeService;
    }
    /** hook handler 返回类型 */
    interface IResult {
        /** err */
        err?: string;
        /** 元数据 */
        edgeConfig?: NsGraph.IEdgeConfig;
        /** edge的x6实例 */
        edgeCell?: X6Edge;
    }
    interface ICreateEdgeService {
        (args: IArgs): Promise<NsGraph.IEdgeConfig | boolean>;
    }
    interface ICreateEdgeIdService {
        (edgeConfig: NsGraph.IEdgeConfig): Promise<string>;
    }
    interface IEdgeCellFactory {
        (args: NsGraph.IEdgeConfig, self: AddEdgeCommand): Promise<X6Edge>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        addEdge: HookHub<IArgs, IResult>;
    }
    /** edge id 类型 */
    const createEdgeId: (edge: NsGraph.IEdgeConfig) => string;
    function isX6EdgeConfig(edge: any): edge is IX6EdgeObjectConfig;
    function isX6EdgePlainConfig(edge: any): edge is IX6EdgePlainConfig;
}
export declare class AddEdgeCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsAddEdge.IArgs, NsAddEdge.IResult, NsAddEdge.ICmdHooks>;
    init(): void;
    /** 处理edgeConfig的兜底逻辑 */
    processEdgeConfig: (args: NsAddEdge.IArgs, edge: NsGraph.IEdgeConfig) => Promise<NsGraph.IEdgeConfig>;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
