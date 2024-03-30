import type { HookHub } from '@antv/xflow-hook';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsHighlightEdge.IArgs, NsHighlightEdge.IResult, NsHighlightEdge.ICmdHooks>;
export declare namespace NsHighlightEdge {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "highlightEdge";
    interface IArgs extends IArgsBase {
        /** 边唯一id */
        edgeId: string;
        /** 边高亮颜色 */
        strokeColor: string;
        /** 边高亮宽度 */
        strokeWidth?: number;
    }
    interface IResult {
    }
    interface ICmdHooks extends IHooks {
        highlightEdge: HookHub<IArgs, IResult>;
    }
}
export declare class HighlightEdgeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsHighlightEdge.IArgs, NsHighlightEdge.IResult, NsHighlightEdge.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
