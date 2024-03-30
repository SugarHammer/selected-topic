import type { NsGraph } from '../../interface';
import type { IArgsBase, IContext } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsRedoCmd.IArgs, NsRedoCmd.IResult, NsRedoCmd.ICmdHooks>;
export declare namespace NsRedoCmd {
    /** Command Id: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "redoCommand";
    /** hook 参数类型 */
    type IArgs = IArgsBase;
    /** hook handler 返回类型 */
    interface IResult {
    }
    /** api service 类型 */
    interface ICreateNodeService {
        (node: NsGraph.INodeConfig): Promise<NsGraph.INodeConfig>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        redoCommand: HookHub<IArgs, IResult>;
    }
}
export declare class GraphRedoCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsRedoCmd.IArgs, NsRedoCmd.IResult, NsRedoCmd.ICmdHooks>;
    init(): void;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    /** isUndoable */
    isUndoable(): boolean;
}
export {};
