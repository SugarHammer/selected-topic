import { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphLoadData.IArgs, NsGraphLoadData.IResult, NsGraphLoadData.ICmdHooks>;
/** 从服务端获取画布数据命令 */
export declare namespace NsGraphLoadData {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "loadData";
    const createHook: () => HookHub<IArgs, IResult>;
    interface IArgs extends IArgsBase {
        loadDataService: (meta?: NsGraph.IGraphMeta) => Promise<NsGraph.IGraphData>;
        [key: string]: any;
    }
    interface IResult {
        /** 从服务端返回的数据 */
        graphData: NsGraph.IGraphData;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        loadData: HookHub<IArgs, IResult>;
    }
}
export declare class GraphLoadDataCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphLoadData.IArgs, NsGraphLoadData.IResult, NsGraphLoadData.ICmdHooks>;
    init(): void;
    /** 执行cmd */
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
