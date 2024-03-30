import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphHistoryUndo.IArgs, NsGraphHistoryUndo.IResult, NsGraphHistoryUndo.ICmdHooks>;
export declare namespace NsGraphHistoryUndo {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "historyUndo";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        enabled?: boolean;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        historyUndo: HookHub<IArgs, IResult>;
    }
}
export declare class GraphHistoryUndoCommand implements ICommand {
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
