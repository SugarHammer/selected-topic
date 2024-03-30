/// <reference types="react" />
import { EditorPanels } from './components/fields';
/** 默认支持修改标签和重命名功能 */
export declare const defaultControlMapService: (controlMap: any) => any;
export { EditorPanels };
export declare const FlowchartService: {
    NodeService: import("react").FC<any>;
    EdgeService: import("react").FC<any>;
    GroupService: import("react").FC<any>;
    CanvasService: import("react").FC<{}>;
};
