import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsFrontNode.IArgs, NsFrontNode.IResult, NsFrontNode.ICmdHooks>;
export declare namespace NsFrontNode {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "frontNode";
    interface IArgs extends IArgsBase {
        nodeId: string;
    }
    interface IResult {
    }
    interface ICmdHooks extends IHooks {
        frontNode: HookHub<IArgs, IResult>;
    }
}
export declare class FrontNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsFrontNode.IArgs, NsFrontNode.IResult, NsFrontNode.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
