import type { IProps, IFlowchartNode } from './interface';
export declare namespace NsPanelData {
    const id = "NODE_PANEL_DATA";
    interface IState {
        nodeList: IFlowchartNode[];
        defaultExpandAll: boolean;
        keyword: string;
        searchList: IFlowchartNode[];
    }
}
export declare const usePanelData: (props: IProps) => {
    state: NsPanelData.IState;
    setState: import("@antv/xflow-core").NsModel.ISetValue<NsPanelData.IState>;
    onKeywordChange: (keyword: string) => Promise<void>;
};
