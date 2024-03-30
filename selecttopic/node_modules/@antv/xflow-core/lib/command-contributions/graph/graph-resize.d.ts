import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsGraphResize.IArgs, NsGraphResize.IResult, NsGraphResize.ICmdHooks>;
export declare namespace NsGraphResize {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 宽度 */
        width?: number;
        /** 高度 */
        height?: number;
    }
    /** hook handler 返回类型 */
    interface IResult {
    }
    /** hookName */
    const hookKey = "graphResize";
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphResize: HookHub<IArgs, IResult>;
    }
}
export declare class GraphResizeCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphResize.IArgs, NsGraphResize.IResult, NsGraphResize.ICmdHooks>;
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
