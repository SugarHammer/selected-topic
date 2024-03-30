import type { IArgsBase, IContext } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsUndoCmd.IArgs, NsUndoCmd.IResult, NsUndoCmd.ICmdHooks>;
export declare namespace NsUndoCmd {
    /** Command Id: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "undoCommand";
    /** hook 参数类型 */
    type IArgs = IArgsBase;
    /** hook handler 返回类型 */
    interface IResult {
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        undoCommand: HookHub<IArgs, IResult>;
    }
}
export declare class GraphUndoCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** api */
    ctx: IContext<NsUndoCmd.IArgs, NsUndoCmd.IResult, NsUndoCmd.ICmdHooks>;
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
