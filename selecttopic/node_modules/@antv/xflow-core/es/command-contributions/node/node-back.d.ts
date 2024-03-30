import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsBackNode.IArgs, NsBackNode.IResult, NsBackNode.ICmdHooks>;
export declare namespace NsBackNode {
    /** command */
    const command: import("../../command/interface").IGraphCommand;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        nodeId: string;
    }
    /** hook handler 返回类型 */
    interface IResult {
    }
    /** hook key */
    const hookKey = "backNode";
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        backNode: HookHub<IArgs, IResult>;
    }
}
export declare class BackNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsBackNode.IArgs, NsBackNode.IResult, NsBackNode.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
