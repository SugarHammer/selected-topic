import type { ILayout } from '@antv/layout/es/layout/types';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphLayout.IArgs, NsGraphLayout.IResult, NsGraphLayout.ICmdHooks>;
/** 画布图数据执行布局算法命令 */
export declare namespace NsGraphLayout {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "graphLayout";
    interface IArgs extends IArgsBase {
        /** XFlow自带AntV布局类型 */
        layoutType?: ILayout.LayoutTypes;
        /** XFlow自带AntV布局对应参数 */
        layoutOptions?: ILayout.LayoutOptions;
        /** 需要执行布局算法的数据 */
        graphData?: NsGraph.IGraphData;
        /** 用户自定义布局 */
        customLayout?: (graphData: NsGraph.IGraphData) => Promise<NsGraph.IGraphData>;
    }
    interface IResult {
        /** 执行完布局算法后的画布图数据(每一个节点拥有x,y) */
        graphData: NsGraph.IGraphData;
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphLayout: HookHub<IArgs, IResult>;
    }
}
export declare class GraphLayoutCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphLayout.IArgs, NsGraphLayout.IResult, NsGraphLayout.ICmdHooks>;
    init(): void;
    /** 执行cmd */
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
