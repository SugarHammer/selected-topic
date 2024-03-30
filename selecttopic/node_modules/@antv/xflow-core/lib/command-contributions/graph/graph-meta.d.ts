import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsGraphMeta.IArgs, NsGraphMeta.IResult, NsGraphMeta.ICmdHooks>;
export declare namespace NsGraphMeta {
    /** Command Id: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "graphMeta";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        meta?: {
            flowId: string;
            [key: string]: any;
        };
        graphMetaService?: IGraphMetaService;
    }
    /** hook handler 返回类型 */
    interface IResult extends NsGraph.IGraphMeta {
        flowId: string;
    }
    /** api service 类型 */
    interface IGraphMetaService {
        (args: IArgs): Promise<NsGraph.IGraphMeta>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphMeta: HookHub<IArgs, IResult>;
    }
}
export declare class GraphMetaCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphMeta.IArgs, NsGraphMeta.IResult, NsGraphMeta.ICmdHooks>;
    init(): void;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    /** isUndoable */
    isUndoable(): boolean;
}
export {};
