import type { HookHub } from '@antv/xflow-hook';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsHighlightNode.IArgs, NsHighlightNode.IResult, NsHighlightNode.ICmdHooks>;
export declare namespace NsHighlightNode {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "highlightNode";
    interface IArgs extends IArgsBase {
        /** 节点唯一id */
        nodeId: string;
        /** 节点高亮边框颜色 */
        stroke: string;
        /** 节点高亮边框宽度 */
        strokeWidth?: number;
        /** 是否联动高亮节点的关联边 */
        isHighlightRelatedLines?: boolean;
        /** 边高亮颜色 */
        edgeStroke?: string;
        /** 边高亮宽度 */
        edgeStrokeWidth?: number;
    }
    interface IResult {
        err: string | null;
    }
    interface ICmdHooks extends IHooks {
        highlightNode: HookHub<IArgs, IResult>;
    }
}
export declare class HighlightNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsHighlightNode.IArgs, NsHighlightNode.IResult, NsHighlightNode.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
