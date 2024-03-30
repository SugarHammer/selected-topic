import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
import { HookHub } from '@antv/xflow-hook';
declare type ICommand = ICommandHandler<NsMoveNode.IArgs, NsMoveNode.IResult, NsMoveNode.ICmdHooks>;
export declare namespace NsMoveNode {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "moveNode";
    /** 创建 hook */
    const createHook: () => HookHub<IArgs, IResult>;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        id: string;
        position: {
            x?: number;
            y?: number;
            dx?: number;
            dy?: number;
            duration?: number;
        };
        nodePositionService?: INodePositionService;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
        nextY?: number;
        nextX?: number;
    }
    /** api service 类型 */
    interface INodePositionService {
        (args: IArgs): Promise<boolean>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        moveNode: HookHub<IArgs, IResult>;
    }
}
export declare class MoveNodeCommand implements ICommand {
    /** command api */
    contextProvider: ICommand['contextProvider'];
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
