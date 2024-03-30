import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphHistoryRedo.IArgs, NsGraphHistoryRedo.IResult, NsGraphHistoryRedo.ICmdHooks>;
export declare namespace NsGraphHistoryRedo {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "historyRedo";
    /** hook 参数类型 */
    type IArgs = IArgsBase;
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        historyRedo: HookHub<IArgs, IResult>;
    }
}
export declare class GraphHistoryRedoCommand implements ICommand {
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
