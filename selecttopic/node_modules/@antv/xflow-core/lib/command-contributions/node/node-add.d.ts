import type { Model, Node } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsAddNode.IArgs, NsAddNode.IResult, NsAddNode.ICmdHooks>;
export declare namespace NsAddNode {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "addNode";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 节点的元数据 */
        nodeConfig: NsGraph.INodeConfig;
        /** X6 Model Options：https://x6.antv.vision/zh/docs/api/graph/model/#addnode */
        options?: Model.AddOptions;
        /** 创建X6 Node Cell的工厂方法 */
        cellFactory?: INodeCellFactory;
        /** 创建Node的服务 */
        createNodeService?: ICreateNodeService;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err?: string;
        /** 节点的元数据 */
        nodeConfig?: NsGraph.INodeConfig;
        /** X6的Cell */
        nodeCell?: Node;
    }
    /** add node api service 类型 */
    interface ICreateNodeService {
        (args: IArgs): Promise<NsGraph.INodeConfig | boolean>;
    }
    /** 创建X6 Node Cell的工厂方法 */
    interface INodeCellFactory {
        (args: NsGraph.INodeConfig, self: AddNodeCommand): Promise<Node>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        addNode: HookHub<IArgs, IResult>;
    }
}
export declare class AddNodeCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    /** 执行Cmd */
    execute: () => Promise<this>;
    processNodeConfig: (nodeConfig: NsGraph.INodeConfig) => Promise<NsGraph.INodeConfig>;
    getNodeReactComponent: (nodeConfig: NsGraph.INodeConfig) => Promise<NsGraph.INodeRender<any>>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
