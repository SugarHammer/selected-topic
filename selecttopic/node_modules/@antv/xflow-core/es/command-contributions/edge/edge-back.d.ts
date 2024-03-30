import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsBackEdge.IArgs, NsBackEdge.IResult, NsBackEdge.ICmdHooks>;
export declare namespace NsBackEdge {
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
export declare class BackEdgeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsBackEdge.IArgs, NsBackEdge.IResult, NsBackEdge.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
