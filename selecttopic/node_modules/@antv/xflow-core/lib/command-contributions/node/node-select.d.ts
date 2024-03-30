import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsSelectNode.IArgs, NsSelectNode.IResult, NsSelectNode.ICmdHooks>;
export declare namespace NsSelectNode {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "selectNode";
    interface IArgs extends IArgsBase {
        /** 选中的节点id */
        nodeIds: string[];
        /** 取消所有节点的选中状态 */
        resetSelection?: boolean;
    }
    interface IResult {
    }
    interface ICmdHooks extends IHooks {
        selectNode: HookHub<IArgs, IResult>;
    }
}
export declare class SelectNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsSelectNode.IArgs, NsSelectNode.IResult, NsSelectNode.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
