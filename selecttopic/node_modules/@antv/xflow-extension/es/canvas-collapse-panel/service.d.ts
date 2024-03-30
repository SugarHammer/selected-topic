import type { IGraphCommandService } from '@antv/xflow-core';
import type { IPanelNode, IProps } from './interface';
import { NsCollapsePanelModel } from './interface';
/** 方便其他组件执行Command改变Panel内部状态 */
export declare const executeCollapsePanelCommand: (cmds: IGraphCommandService, updateModel: (state: NsCollapsePanelModel.IState) => Promise<void>) => void;
/** 方便其他组件执行Command改变Panel内部状态 */
export declare const useCollapsePanelData: (props: IProps) => {
    state: NsCollapsePanelModel.IState;
    collapsible: boolean;
    setState: import("@antv/xflow-core").NsModel.ISetValue<NsCollapsePanelModel.IState>;
    onKeywordChange: (keyword: string, panelNodes: IPanelNode[]) => Promise<void>;
    onActiveKeyChange: (activeKey: string) => void;
    onCollapseChange: (isCollapsed: boolean) => void;
};
