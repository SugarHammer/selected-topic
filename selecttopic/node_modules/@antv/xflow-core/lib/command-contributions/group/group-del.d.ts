import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsDelGroup.IArgs, NsDelGroup.IResult, NsDelGroup.ICmdHooks>;
export declare namespace NsDelGroup {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 群组节点的元数据 */
        nodeConfig: NsGraph.IGroupConfig;
        /** 更新群组节点的元数据的异步方法 */
        deleteService?: IDeleteGroupService;
    }
    /** add group api service 类型 */
    interface IDeleteGroupService {
        (args: IArgs): Promise<boolean>;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: string | null;
    }
    /** hookName */
    const hookKey: "delGroup";
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        delGroup: HookHub<IArgs, IResult>;
    }
}
export declare class DelGroupCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
