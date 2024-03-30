import type { Cell, Node } from '@antv/x6';
import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphAddTool.IArgs, NsGraphAddTool.IResult, NsGraphAddTool.ICmdHooks>;
export declare namespace NsGraphAddTool {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "addTool";
    /** hook 参数类型 */
    interface IArgs extends IArgsBase {
        cellId: string;
        toolConfig: {
            items: Cell.ToolItem | Cell.ToolItem[];
            options?: Cell.AddToolOptions;
        };
    }
    /** hook handler 返回类型 */
    interface IResult {
        err: null | string;
    }
    /** add node api service 类型 */
    interface ICreateNodeService {
        (args: IArgs): Promise<NsGraph.INodeConfig>;
    }
    /** 创建X6 Node Cell的工厂方法 */
    interface INodeCellFactory {
        (args: NsGraph.INodeConfig, self: GraphAddToolCommand): Promise<Node>;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        addTool: HookHub<IArgs, IResult>;
    }
}
export declare class GraphAddToolCommand implements ICommand {
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
