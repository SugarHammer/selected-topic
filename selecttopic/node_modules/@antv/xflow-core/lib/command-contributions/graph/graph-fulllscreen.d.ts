import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
declare type ICommand = ICommandHandler<NsGraphFullscreen.IArgs, NsGraphFullscreen.IResult, NsGraphFullscreen.ICmdHooks>;
export declare namespace NsGraphFullscreen {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
    }
    /** hook handler 返回类型 */
    interface IResult {
        fulllscreen: boolean;
    }
    /** hookName */
    const hookKey = "graphFullscreen";
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphFullscreen: HookHub<IArgs, IResult>;
    }
}
export declare class GraphFullscreenCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphFullscreen.IArgs, NsGraphFullscreen.IResult, NsGraphFullscreen.ICmdHooks>;
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
