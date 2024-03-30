import type { Edge as X6Edge } from '@antv/x6';
import type { NsGraph } from '../../interface';
import type { IContext, IArgsBase } from '../../command/interface';
import { ICommandHandler } from '../../command/interface';
import type { IHooks } from '../../hooks/interface';
import type { HookHub } from '@antv/xflow-hook';
declare type ICommand = ICommandHandler<NsUpdateEdge.IArgs, NsUpdateEdge.IResult, NsUpdateEdge.ICmdHooks>;
export declare namespace NsUpdateEdge {
    const command: import("../../command/interface").IGraphCommand;
    const hookKey = "updateEdge";
    const XFlowEdgeSetOptions: X6Edge.SetOptions;
    interface IArgs extends IArgsBase {
        /** edgeConfig */
        edgeConfig: NsGraph.IEdgeConfig;
        /** options */
        options: X6Edge.SetOptions;
        /** 更新的Service */
        updateEdgeService?: IUpdateEdgeService;
        /** 更新Label的Service */
        updateEdgeLabelService?: IUpdateEdgeLabelService;
    }
    const XFlowUpdateLabelService: (edge: X6Edge, edgeConfig: NsGraph.IEdgeConfig, options?: X6Edge.SetOptions) => Promise<void>;
    interface IResult {
        edgeConfig: NsGraph.IEdgeConfig;
        edgeCell: X6Edge;
    }
    interface IUpdateEdgeService {
        (args: IArgs): Promise<NsGraph.IEdgeConfig>;
    }
    interface IUpdateEdgeLabelService {
        (edge: X6Edge, edgeConfig: NsGraph.IEdgeConfig, options: X6Edge.SetOptions): Promise<NsGraph.IEdgeConfig>;
    }
    interface ICmdHooks extends IHooks {
        updateEdge: HookHub<IArgs, IResult>;
    }
}
export declare class UpdateEdgeCommand implements ICommand {
    contextProvider: ICommand['contextProvider'];
    ctx: IContext<NsUpdateEdge.IArgs, NsUpdateEdge.IResult, NsUpdateEdge.ICmdHooks>;
    init(): void;
    execute: () => Promise<this>;
    undo: () => Promise<this>;
    redo: () => Promise<this>;
    isUndoable(): boolean;
}
export {};
