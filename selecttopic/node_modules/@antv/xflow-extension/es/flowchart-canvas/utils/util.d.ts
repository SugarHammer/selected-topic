/// <reference types="lodash" />
import type { IApplication } from '@antv/xflow-core';
import type { Graph } from '@antv/x6';
export declare const globalProps: {
    config: {};
};
export declare const setProps: (props: any) => void;
export declare const getProps: (key: string) => any;
export declare const setInstance: (app?: IApplication) => Promise<void>;
export declare const getGraphInstance: () => Graph;
export declare const getAppInstance: () => IApplication;
export declare const getGraphData: () => Promise<{
    nodes: import("@antv/xflow-core").NsGraph.INodeConfig[];
    edges: import("@antv/xflow-core").NsGraph.IEdgeConfig[];
}>;
/** 更新配置时通知上传执行保存 */
export declare const onConfigChange: import("lodash").DebouncedFunc<(config: any) => any>;
