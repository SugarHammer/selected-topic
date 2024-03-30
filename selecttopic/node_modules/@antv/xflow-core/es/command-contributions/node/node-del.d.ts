import { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { Model, Node } from '@antv/x6/es';
declare type ICommand = ICommandHandler<NsDelNode.IArgs, NsDelNode.IResult, NsDelNode.ICmdHooks>;
export declare namespace NsDelNode {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hook name */
    const hookKey = "delNode";
    /** 创建 hook */
    const createHook: () => HookHub<IArgs, IResult>;
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** X6 Node Cell */
        x6Node?: Node;
        /** Node元数据 */
        nodeConfig: NsGraph.INodeConfig;
        /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
        options?: Model.RemoveOptions;
        /** 删除Node的服务 */
        deleteNodeService?: IDeleteNodeService;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
        nodeConfig?: NsGraph.INodeConfig;
    }
    /** del node api service 类型, 返回true时删除 */
    interface IDeleteNodeService {
        (args: IArgs): Promise<boolean>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        delNode: HookHub<IArgs, IResult>;
    }
}
export declare class DelNodeCommand implements ICommand {
    /** api */
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
