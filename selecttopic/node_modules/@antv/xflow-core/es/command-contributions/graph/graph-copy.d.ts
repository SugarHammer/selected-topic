import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { Cell } from '@antv/x6';
declare type ICommand = ICommandHandler<NsGraphCopySelection.IArgs, NsGraphCopySelection.IResult, NsGraphCopySelection.ICmdHooks>;
export declare namespace NsGraphCopySelection {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "graphCopySelection";
    /** hook 参数类型 */
    type IArgs = IArgsBase;
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphCopySelection: HookHub<IArgs, IResult>;
    }
}
export declare class GraphCopySelectionCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    parseCells: (cells: Cell[]) => {
        nodes: NsGraph.INodeConfig[];
        edges: NsGraph.IEdgeConfig[];
    };
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
