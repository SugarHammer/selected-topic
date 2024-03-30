import { ManaSyringe } from '@antv/xflow-core';
import type { IExtensionModule } from '@antv/xflow-core';
import type { Graph as X6Graph } from '@antv/x6';
/** 画布布局 */
export declare enum LayoutEnum {
    TOP_BOTTOM = "TB",
    LEFT_RIGHT = "LR"
}
/** DAG Props */
export interface IProps {
    layout?: 'TB' | 'LR';
    router?: X6Graph.Options['connecting']['router'];
    connector?: X6Graph.Options['connecting']['connector'];
}
/** Props Config */
export declare const IComponentConfig: ManaSyringe.Syringe.DefinedToken;
export declare type IComponentConfig = IExtensionModule<IProps>['config'];
