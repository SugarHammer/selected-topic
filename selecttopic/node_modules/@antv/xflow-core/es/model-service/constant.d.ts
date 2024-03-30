import type { Node, Edge, CellView, Cell } from '@antv/x6';
import type { NsGraph } from '../interface';
import type { Token } from '../common/types';
import type { IModelService } from './interface';
/** existModel的Utils */
export declare const isModelExistUtil: <T>(token: Token<T>) => (modelService: IModelService) => boolean;
/** useModel的Utils */
export declare const getModelUtil: <T>(token: Token<T>) => (modelService: IModelService) => Promise<import("..").NsModel.IModel<T>>;
/** useModel的Utils */
export declare const useModelValueUtil: <T>(token: Token<T>) => (modelService: IModelService) => Promise<T>;
/** 画布是否已开启多选 */
export declare namespace GRAPH_ENABLE_MULTI_SELECT {
    const id = "GRAPH_ENABLE_MULTI_SELECT";
    type IState = {
        isEnable: boolean;
    };
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** 画布是否全屏 */
export declare namespace GRAPH_FULLSCREEN {
    const id = "GRAPH_FULLSCREEN";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** 画布已选中节点 */
export declare namespace IS_NODE_SELECTED {
    const id = "IS_NODE_SELECTED";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** 画布选中节点是Group */
export declare namespace IS_GROUP_SELECTED {
    const id = "IS_GROUP_SELECTED";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** 画布选中节点是Group */
export declare namespace IS_NORMAL_NODES_SELECTED {
    const id = "IS_NORMAL_NODES_SELECTED";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** 画布选中Cell状态，保存最后一个选中的节点 */
export declare namespace SELECTED_CELL {
    const id = "LAST_SELECTED_CELL";
    type IState = Cell | null;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<Cell<Cell.Properties>>>;
    const useValue: (modelService: IModelService) => Promise<Cell<Cell.Properties>>;
}
/** 画布选中CellS状态 */
export declare namespace SELECTED_CELLS {
    const id = "SELECTED_CELLS";
    type IState = Cell[];
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** 画布选中节点状态， 如有多个节点则保存最后一个选中的节点 */
export declare namespace SELECTED_NODE {
    const id = "LAST_SELECTED_NODE";
    type IState = Node<Node.Properties> | null;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<Node<Node.Properties>>>;
    const useValue: (modelService: IModelService) => Promise<Node<Node.Properties>>;
}
/** 画布选中节点状态 */
export declare namespace SELECTED_NODES {
    const id = "SELECTED_NODES";
    type IState = Node<Node.Properties>[];
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** 画布选中边状态 */
export declare namespace SELECTED_EDGES {
    const id = "SELECTED_EDGES";
    type IState = Edge<Edge.Properties>[];
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** 画布选中GROUP List */
export declare namespace SELECTED_GROUPS {
    const id = "SELECTED_GROUPS";
    type IState = Node<Node.Properties>[];
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** 画布节点右键菜单状态 */
export declare namespace CONTEXTMENU_NODE {
    const id = "CONTEXTMENU_NODE";
    type IState = Node<Node.Properties> | null;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<Node<Node.Properties>>>;
    const useValue: (modelService: IModelService) => Promise<Node<Node.Properties>>;
}
/** 画布边右键菜单状态 */
export declare namespace CONTEXTMENU_EDGE {
    const id = "CONTEXTMENU_EDGE";
    type IState = Edge<Edge.Properties> | null;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<Edge<Edge.Properties>>>;
    const useValue: (modelService: IModelService) => Promise<Edge<Edge.Properties>>;
}
/** 画布右键菜单状态 */
export declare namespace CONTEXTMENU_TARGET {
    const id = "CONTEXTMENU_TARGET";
    type IState = ContextMenuInfo | null;
    interface ContextMenuInfo {
        type: TargetType;
        data: CellView.EventArgs['cell:contextmenu'];
        anchor: {
            x: number;
            y: number;
        };
        cell: Cell;
    }
    type TargetType = 'node' | 'edge' | 'blank' | 'null';
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<ContextMenuInfo>>;
    const useValue: (modelService: IModelService) => Promise<ContextMenuInfo>;
}
/** 画布元数据状态 */
export declare namespace GRAPH_META {
    const id = "GRAPH_META";
    type IState = NsGraph.IGraphMeta;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<NsGraph.IGraphMeta>>;
    const useValue: (modelService: IModelService) => Promise<NsGraph.IGraphMeta>;
}
/** 画布缩放状态 */
export declare namespace GRAPH_SCALE {
    const id = "GRAPH_SCALE";
    type IState = {
        zoomFactor: number;
        sx?: number;
        sy?: number;
        ox?: number;
        oy?: number;
    };
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** COMMAND REDO STACK的状态*/
export declare namespace COMMAND_REDOABLE {
    const id = "COMMAND_REDOABLE";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** COMMAND UNDO STACK的状态*/
export declare namespace COMMAND_UNDOABLE {
    const id = "COMMAND_UNDOABLE";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
/** COMMAND 执行结果的状态*/
export declare namespace COMMAND_GLOBALS {
    const id = "COMMAND_GLOBALS";
    type IState = Map<string, any>;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<IState>>;
    const useValue: (modelService: IModelService) => Promise<IState>;
}
/** History Undo Redo */
export declare namespace HISTORY_UNDOABLE {
    const id = "HISTORY_UNDOABLE";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
export declare namespace HISTORY_REDOABLE {
    const id = "HISTORY_REDOABLE";
    type IState = boolean;
    const getModel: (modelService: IModelService) => Promise<import("..").NsModel.IModel<boolean>>;
    const useValue: (modelService: IModelService) => Promise<boolean>;
}
