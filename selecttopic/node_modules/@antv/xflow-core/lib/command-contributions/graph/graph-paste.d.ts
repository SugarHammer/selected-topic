import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import { GraphMappingHelper } from '../mapping-service';
declare type ICommand = ICommandHandler<NsGraphPasteSelection.IArgs, NsGraphPasteSelection.IResult, NsGraphPasteSelection.ICmdHooks>;
export declare namespace NsGraphPasteSelection {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "graphPasteSelection";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        position?: {
            x: number;
            y: number;
        };
        collapsedSize?: {
            width: number;
            height: number;
        };
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphPasteSelection: HookHub<IArgs, IResult>;
    }
}
export declare class GraphPasteSelectionCommand implements ICommand {
    /** 防止多次执行 */
    static doing: boolean;
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** mapping */
    mappingHelper: GraphMappingHelper;
    updateNodeCopiedProps: (position: {
        x: number;
        y: number;
    }, nodeConfig: NsGraph.INodeConfig) => NsGraph.INodeConfig;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
