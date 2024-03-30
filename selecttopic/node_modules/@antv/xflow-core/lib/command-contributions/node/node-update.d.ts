import type { Graph as X6Graph } from '@antv/x6';
import { Node as X6Node } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsUpdateNode.IArgs, NsUpdateNode.IResult, NsUpdateNode.ICmdHooks>;
export declare namespace NsUpdateNode {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "updateNode";
    interface IArgs extends IArgsBase {
        /** 节点的新元数据 */
        nodeConfig?: NsGraph.INodeConfig;
        /** 更新节点元数据 */
        setNodeConfig?: ISetNodeConfig;
        /** setOptions:https://x6.antv.vision/zh/docs/api/model/cell/#setdata */
        options?: X6Node.SetOptions;
        /** 更新节点的服务 */
        updateNodeService?: IUpdateNodeService;
    }
    const XFlowNodeSetOptions: X6Node.SetOptions;
    interface ISetNodeConfig {
        node: string | X6Node;
        callback: (node: NsGraph.INodeConfig) => Promise<NsGraph.INodeConfig>;
    }
    interface IResult {
        nodeConfig: NsGraph.INodeConfig;
        nodeCell: X6Node;
    }
    interface IUpdateNodeService {
        (args: IArgs): Promise<NsGraph.INodeConfig>;
    }
    interface ICmdHooks extends IHooks {
        updateNode: HookHub<IArgs, IResult>;
    }
    const NODE_WIDTH = 200;
    const NODE_HEIGHT = 40;
}
export declare class UpdateNodeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsUpdateNode.IArgs, NsUpdateNode.IResult, NsUpdateNode.ICmdHooks>;
    init(): void;
    setNodeConfig: (x6Node: X6Node, nodeConfig: NsGraph.INodeConfig, options: X6Node.SetOptions) => void;
    getNodeConfig: (x6Node: X6Node) => any;
    getNodeCell: (x6Graph: X6Graph, handlerArgs: NsUpdateNode.IArgs) => X6Node<X6Node.Properties>;
    getNextNodeConfig: (handlerArgs: NsUpdateNode.IArgs, x6Node: X6Node) => Promise<NsGraph.INodeConfig>;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
