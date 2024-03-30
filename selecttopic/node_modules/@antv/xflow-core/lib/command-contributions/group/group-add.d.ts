import type { Node, Graph } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsAddGroup.IArgs, NsAddGroup.IResult, NsAddGroup.ICmdHooks>;
export declare namespace NsAddGroup {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "addGroup";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        /** 群组节点的元数据 */
        nodeConfig: NsGraph.IGroupConfig;
        /** 创建X6 Group Cell的工厂方法 */
        cellFactory?: IGroupCellFactory;
        /** 返回群组节点的元数据的异步方法 */
        createService?: ICreateGroupService;
    }
    /** hook handler 返回类型 */
    interface IResult {
        /** group 的配置数据 */
        nodeConfig: NsGraph.IGroupConfig;
        /** Group Cell */
        nodeCell: Node;
    }
    /** add group api service 类型 */
    interface ICreateGroupService {
        (args: IArgs): Promise<NsGraph.IGroupConfig>;
    }
    /** 创建X6 Node Cell的工厂方法 */
    interface IGroupCellFactory {
        (args: NsGraph.IGroupConfig, self: AddGroupCommand): Promise<Node>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        addGroup: HookHub<IArgs, IResult>;
    }
    const GROUP_PADDING = 12;
    const GROUP_HEADER_HEIGHT = 40;
}
export declare class AddGroupCommand implements ICommand {
    /** api */
    contextProvider: ICommand['contextProvider'];
    getBBox: (node: Node, nodeConfig: NsGraph.INodeConfig, graph: Graph) => import("@antv/x6").Rectangle;
    /** 执行Cmd */
    execute: () => Promise<this>;
    /** undo cmd */
    undo: () => Promise<this>;
    /** redo cmd */
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
