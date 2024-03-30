import type { HookHub } from '@antv/xflow-hook';
import type { NsGraph } from '../../interface';
import type { IHooks } from '../../hooks/interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
declare type ICommand = ICommandHandler<NsGraphRender.IArgs, NsGraphRender.IResult, NsGraphRender.ICmdHooks>;
export declare namespace NsGraphUtils {
    function isNodeEqual(curNodeConfig: NsGraph.INodeConfig, nextNodeConfig: NsGraph.INodeConfig): boolean;
    function isEdgeEqual(curEdgeConfig: NsGraph.IEdgeConfig, nextEdgeConfig: NsGraph.IEdgeConfig): boolean;
}
export declare namespace NsGraphRender {
    /** Command: 用于注册named factory */
    const command: import("../../command/interface").IGraphCommand;
    /** hookName */
    const hookKey = "graphRender";
    interface IArgs extends IArgsBase {
        /** 画布渲染之前的钩子(比如从服务端获取数据、对数据做布局处理等) */
        beforeRender?: (graphMeta?: NsGraph.IGraphMeta) => Promise<NsGraph.IGraphData>;
        /** 画布渲染完成之后的钩子 */
        afterRender?: (graphData: NsGraph.IGraphData, graphMeta?: NsGraph.IGraphMeta) => Promise<any> | undefined;
        /** 画布渲染数据(nodes、edges) */
        graphData: NsGraph.IGraphData;
        /** 用户自定义方法判断节点内容是否相等 */
        isNodeEqual?: (curNodeConfig: NsGraph.INodeConfig, nextNodeConfig: NsGraph.INodeConfig) => boolean;
        /** 用户自定义方法判断边内容是否相等 */
        isEdgeEqual?: (curEdgeConfig: NsGraph.IEdgeConfig, nextEdgeConfig: NsGraph.IEdgeConfig) => boolean;
    }
    interface IResult {
    }
    /** hooks 类型 */
    interface ICmdHooks extends IHooks {
        graphRender: HookHub<IArgs, IResult>;
    }
}
export declare class GraphRenderCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsGraphRender.IArgs, NsGraphRender.IResult, NsGraphRender.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
    private doLoadGraph;
    /**
     * 画布内容Diff
     * @param x6Graph x6画布实例
     * @param graphData 画布数据
     * @param isNodeEqual 允许用户自定义判断节点是否相等
     * @param isEdgeEqual 允许用户自定义判断边是否相等
     */
    private graphDataDiff;
}
export {};
