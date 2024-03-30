import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphHistoryReset.IArgs, NsGraphHistoryReset.IResult, NsGraphHistoryReset.ICmdHooks>;
export declare namespace NsGraphHistoryReset {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "historyReset";
    /** hook 参数类型 */
    type IArgs = IArgsBase;
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        historyReset: HookHub<IArgs, IResult>;
    }
}
export declare class GraphHistoryResetCommand implements ICommand {
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
