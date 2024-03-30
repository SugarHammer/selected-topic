import type { Node as X6Node } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsCenterNode.IArgs, NsCenterNode.IResult, NsCenterNode.ICmdHooks>;
export declare namespace NsCenterNode {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "centerNode";
    interface IArgs extends IArgsBase {
        nodeConfig: NsGraph.INodeConfig;
    }
    interface IResult {
        x6Node: X6Node;
    }
    interface ICmdHooks extends IHooks {
        centerNode: HookHub<IArgs, IResult>;
    }
}
export declare class CenterNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsCenterNode.IArgs, NsCenterNode.IResult, NsCenterNode.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
