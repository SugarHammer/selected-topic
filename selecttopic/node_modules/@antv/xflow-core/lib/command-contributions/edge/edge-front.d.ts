import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsFrontEdge.IArgs, NsFrontEdge.IResult, NsFrontEdge.ICmdHooks>;
export declare namespace NsFrontEdge {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "frontEdge";
    interface IArgs extends IArgsBase {
        edgeId: string;
    }
    interface IResult {
    }
    interface ICmdHooks extends IHooks {
        frontEdge: HookHub<IArgs, IResult>;
    }
}
export declare class FrontEdgeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsFrontEdge.IArgs, NsFrontEdge.IResult, NsFrontEdge.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
