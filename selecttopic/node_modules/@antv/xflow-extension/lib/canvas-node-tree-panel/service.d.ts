import type { IModelService, IGraphCommandService } from '@antv/xflow-core';
import type { IProps, ITreeNode } from './interface';
export declare namespace NsNodeTreePanelModel {
    const id = "TREE_PANEL_MODEL";
    interface IState {
        treeNodeList: ITreeNode[];
        treeData: ITreeNode[];
        expandedKeys: string[];
        defaultExpandAll: boolean;
        keyword: string;
        searchList: ITreeNode[];
    }
    const useModel: (model: IModelService) => Promise<import("@antv/xflow-core").NsModel.IModel<IState>>;
}
/** 方便其他组件执行Command改变Panel内部状态 */
export declare const executeNodeDndTreeCommand: (cmds: IGraphCommandService, updateModel: (state: NsNodeTreePanelModel.IState) => Promise<void>) => void;
export declare const useTreePanelData: (props: IProps) => {
    state: NsNodeTreePanelModel.IState;
    setState: import("@antv/xflow-core").NsModel.ISetValue<NsNodeTreePanelModel.IState>;
    onKeywordChange: (keyword: string) => Promise<void>;
    onFolderExpand: (expandedKeys: string[]) => void;
};
export declare function NodeList2Tree(treeNodes?: ITreeNode[]): {
    treeData: ITreeNode[];
    rootNodes: ITreeNode[];
};
