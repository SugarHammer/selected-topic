import type { Node as X6Node, Graph as X6Graph } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import type { PortManager } from '@antv/x6/es/model/port';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsUpdateNodePort.IArgs, NsUpdateNodePort.IResult, NsUpdateNodePort.ICmdHooks>;
export declare namespace NsUpdateNodePort {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "updateNodePort";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        node: X6Node | string;
        options?: X6Node.SetOptions;
        updatePorts: (ports: PortManager.PortMetadata[], node: X6Node, graph: X6Graph) => Promise<PortManager.PortMetadata[] | false>;
    }
    /** hook handler 返回类型 */
    interface IResult {
        err?: string;
        ports?: PortManager.PortMetadata[];
    }
    /** add node api service 类型 */
    interface ICreateNodeService {
        (args: IArgs): Promise<NsGraph.INodeConfig | boolean>;
    }
    /** 创建X6 Node Cell的工厂方法 */
    interface INodeCellFactory {
        (args: NsGraph.INodeConfig, self: UpdateNodePort): Promise<Node>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        updateNodePort: HookHub<IArgs, IResult>;
    }
}
export declare class UpdateNodePort implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    getCell: (graph: X6Graph, node: string | X6Node) => X6Node<X6Node.Properties> | import("@antv/x6").Cell<import("@antv/x6").Cell.Properties>;
    getNodeConfig: (x6Node: X6Node) => NsGraph.INodeConfig;
    isNodeAnchors(ports: any): ports is NsGraph.INodeAnchor;
    isPortMetaData(ports: any): ports is NsGraph.INodePortMeta;
    updatePortsOfNodeConfig: (cell: X6Node, ports: NsGraph.INodeAnchor[], options: X6Node.SetOptions) => void;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
