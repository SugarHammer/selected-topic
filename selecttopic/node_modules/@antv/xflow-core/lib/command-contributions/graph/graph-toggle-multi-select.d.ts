import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsGraphToggleMultiSelect.IArgs, NsGraphToggleMultiSelect.IResult, NsGraphToggleMultiSelect.ICmdHooks>;
export declare namespace NsGraphToggleMultiSelect {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "toggleMultiSelect";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        isEnable?: boolean;
    }
    /** hook handler 返回类型 */
    interface IResult {
        isEnable: boolean;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        toggleMultiSelect: HookHub<IArgs, IResult>;
    }
}
export declare class GraphToggleMultiSelectCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphToggleMultiSelect.IArgs, NsGraphToggleMultiSelect.IResult, NsGraphToggleMultiSelect.ICmdHooks>;
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
