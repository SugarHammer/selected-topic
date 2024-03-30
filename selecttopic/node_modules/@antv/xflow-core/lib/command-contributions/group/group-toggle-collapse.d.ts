import type { Cell, Graph, Node as X6Node } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsCollapseGroup.IArgs, NsCollapseGroup.IResult, NsCollapseGroup.ICmdHooks>;
export declare namespace NsCollapseGroup {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "collapseGroup";
    interface IArgs extends IArgsBase {
        /** 折叠的group node id */
        nodeId: string;
        /** 是否折叠 */
        isCollapsed: boolean;
        /** 折叠后的大小 */
        collapsedSize?: {
            width: number;
            height: number;
        };
        /** 间距 */
        gap?: number;
        /** 更新群组是否折叠的状态，返回false时不执行 */
        toggleService?: IToggleGroupCollapseService;
    }
    /** add group api service 类型 */
    interface IToggleGroupCollapseService {
        (args: IArgs): Promise<boolean>;
    }
    interface IResult {
        err: null | string;
    }
    interface ICmdHooks extends IHooks {
        collapseGroup: HookHub<IArgs, IResult>;
    }
}
export declare class CollapseGroupCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsCollapseGroup.IArgs, NsCollapseGroup.IResult, NsCollapseGroup.ICmdHooks>;
    init(): void;
    toggleVisible: (cells: Cell[], visible: boolean, graph: Graph) => void;
    toggleCollapse: (groupNode: X6Node, graph: Graph, args: NsCollapseGroup.IArgs) => void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
