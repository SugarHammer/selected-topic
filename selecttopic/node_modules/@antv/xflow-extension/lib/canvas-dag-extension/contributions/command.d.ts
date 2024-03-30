import type { HookHub } from '@antv/xflow-hook';
import type { IArgsBase } from '@antv/xflow-core';
import type { IHooks } from '@antv/xflow-core';
import { ICommandHandler } from '@antv/xflow-core';
import { GRAPH_STATUS_INFO } from '../constants';
import type { Graph as X6Graph } from '@antv/x6';
declare type ICommand = ICommandHandler<NsGraphStatusCommand.IArgs, NsGraphStatusCommand.IResult, NsGraphStatusCommand.ICmdHooks>;
export declare namespace NsGraphStatusCommand {
    /** Command: 获取执行状态 */
    const MODEL: typeof GRAPH_STATUS_INFO;
    /** Command: 用于注册 named factory */
    const command: import("@antv/xflow-core").IGraphCommand;
    /** hookName */
    const hookKey = "queryGraphStatus";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        loop?: boolean;
        loopInterval?: number;
        doOnce?: (args: IArgs) => Promise<IArgs>;
        graphStatusService: IStatusService;
        shouldStop?: (status: IStatusInfo, args: IArgs) => Promise<boolean>;
        ctx?: any;
    }
    /** hook handler 返回类型 */
    interface IResult {
    }
    /**  api service 类型 */
    interface IStatusService {
        (args: IArgs): Promise<IStatusInfo>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        queryGraphStatus: HookHub<IArgs, IResult>;
    }
    /** 状态 类型 */
    enum StatusEnum {
        SUCCESS = "success",
        PROCESSING = "processing",
        ERROR = "error",
        DEFAULT = "default",
        WARNING = "warning"
    }
    /** 节点状态 类型 */
    interface INodeStatus {
        status: StatusEnum;
        [key: string]: any;
    }
    /** 接口返回 类型 */
    interface IStatusInfo {
        graphStatus: StatusEnum;
        statusMap: Record<string, INodeStatus>;
    }
    /** 接口返回 类型 */
    type IStatusMap = Record<NsGraphStatusCommand.StatusEnum, string[]>;
    /** 按status 分类  */
    const initStatusMap: () => {
        default: any[];
        processing: any[];
        error: any[];
        warning: any[];
        success: any[];
    };
    /** 接口返回 类型 */
    const groupByStatus: (data: Record<string, INodeStatus>) => IStatusMap;
    /** diff status */
    const statusDiff: (cur: any[], next: any[]) => {
        current: any[];
        add: any[];
        remove: any[];
    };
    const shouldStop: (info: IStatusInfo) => Promise<boolean>;
}
/** 创建节点命令 */
export declare class QueryGraphStatusCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** 状态缓存 */
    statusInfo: NsGraphStatusCommand.IStatusMap;
    /** 判断是否循环 */
    isLooping: boolean;
    /** X6Graph */
    x6Graph: X6Graph;
    /** 获取Model */
    getStatusModel: () => Promise<import("@antv/xflow-core").NsModel.IModel<GRAPH_STATUS_INFO.IState>>;
    /** 更新Model数据 */
    updateModelValue: (callback: (state: GRAPH_STATUS_INFO.IState) => void) => Promise<void>;
    /** 停止Looping的flag */
    stopCurrentStatusLooping: () => Promise<void>;
    /** 设置停止looping的方法 */
    addStopDispose: () => Promise<void>;
    /** 更新Graph的数据 */
    updateGraph: (curStatusInfo: NsGraphStatusCommand.IStatusMap, nextStatusMap: NsGraphStatusCommand.IStatusMap, statusMap: Record<string, NsGraphStatusCommand.INodeStatus>) => void;
    /** 更新节点数据 */
    updateNodeData: (id: any, data: NsGraphStatusCommand.INodeStatus) => void;
    /** 更新连线数据 */
    updateNodes: (curStatusInfo: NsGraphStatusCommand.IStatusMap, nextStatusMap: NsGraphStatusCommand.IStatusMap, statusMap: Record<string, NsGraphStatusCommand.INodeStatus>) => void;
    /** 更新节点数据 */
    updateEdges: (curStatusInfo: NsGraphStatusCommand.IStatusMap, nextStatusMap: NsGraphStatusCommand.IStatusMap) => void;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export declare const execCmd: () => void;
export {};
