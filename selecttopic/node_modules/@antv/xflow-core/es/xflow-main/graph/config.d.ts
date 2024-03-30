import React from 'react';
import { Syringe } from 'mana-syringe';
import type { Graph as X6Graph } from '@antv/x6';
import type { NsGraph } from '../../interface';
export declare namespace NsGraphConfig {
    const CONFIG_TYPE = "GraphConfig";
    /** 默认的Node解析函数 */
    const defaultNodeTypeParser: (nodeConfig: NsGraph.INodeConfig) => string;
    /** 构造的Edge解析函数 */
    const defaultEdgeTypeParser: (edgeConfig: NsGraph.IEdgeConfig) => string;
    /** XFlow默认的React组件 */
    const defaultNodeMapValue: [string, NsGraph.INodeRender<any>][];
}
export declare class GraphConfig {
    /** 配置类型 */
    readonly CONFIG_TYPE = "GraphConfig";
    /**
     * xflow app instance id, 用来标记app的实例
     * 一个app instance 可以包含多个graphId
     */
    xflowInstanceId: string;
    /**
     * Graph的配置id：
     * 1. 和画布的 html container 一一对应，
     * 2. 作为X6的 react portal view Id
     */
    graphId: string;
    /** 构造函数 */
    constructor();
    /** 画布的属性 */
    private x6Options;
    /** app 的 root 节点 */
    private appContainer;
    /** 画布的root节点 */
    private rootContainer;
    /** 画布的dom节点 */
    private graphContainer;
    /** 自定义节点 */
    private nodeRender;
    /** 自定义边 */
    private edgeRender;
    /** 解析node渲染类型的parser */
    private nodeTypeParser;
    /** 解析edge渲染类型的parser  */
    private edgeTypeParser;
    /** 自定义事件 */
    private events;
    mergeX6Config: (config: Partial<X6Graph.Options>) => Promise<X6Graph.Options & Partial<X6Graph.Options>>;
    getX6Config: () => Promise<X6Graph.Options>;
    setX6Config: (options?: X6Graph.Options) => void;
    setAppContainer: (ele: HTMLElement | null) => void;
    setRootContainer: (ele: HTMLElement | null) => void;
    setGraphContainer: (ele: HTMLElement | null) => void;
    setEvents: (events: NsGraph.IEvent[]) => void;
    setDefaultNodeRender: (component: NsGraph.INodeRender) => void;
    setDefaultEdgeRender: (component: NsGraph.IEdgeRender) => void;
    setNodeRender: (renderKey: string, component: NsGraph.INodeRender) => void;
    setEdgeRender: (renderKey: string, component: NsGraph.IEdgeRender) => void;
    /** 设置解析node render key的 parser */
    setNodeTypeParser: (parser: (nodeConfig: NsGraph.INodeConfig) => string) => void;
    /** 设置解析edge render key的 parser */
    setEdgeTypeParser: (parser: (edgeConfig: NsGraph.INodeConfig) => string) => void;
    /** 获取Graph参数 */
    getConfig: () => Promise<IGraphConfig>;
    private getDefaultGraphOptions;
    dispose: () => void;
}
export interface IGraphConfig {
    /** xflow实例id */
    xflowInstanceId: string;
    /** 画布实例id */
    graphId: string;
    nodeViewId: string;
    /** 画布的options */
    x6Options: X6Graph.Options;
    /** app 的 root 节点 */
    appContainer: HTMLElement;
    /** 画布的root节点 */
    rootContainer: HTMLElement;
    /** 画布的dom节点 */
    graphContainer: HTMLElement;
    /** 自定节点的渲染 */
    nodeRender: Map<string, React.ComponentType<any>>;
    /** 自定义边label的渲染 */
    edgeRender: Map<string, React.ComponentType<any>>;
    /** 自定义X6事件 */
    events: NsGraph.IEvent[];
    /** 解析node类型：从nodeConfig 中解析 ReactComponent类型 */
    nodeTypeParser: (nodeConfig: NsGraph.INodeConfig) => string;
    /** 解析edge类型：从edgeConfig 中解析 ReactComponent类型 */
    edgeTypeParser: (edgeConfig: NsGraph.IEdgeConfig) => string;
}
export interface IGraphOptionProvider {
    getOptions: () => Promise<IGraphConfig>;
}
export declare const IGraphOptionProvider: unique symbol;
export declare const registerGraphConfig: (register: Syringe.Register, graphConfig: GraphConfig) => void;
interface IValueProxy<T> {
    getValue: () => T;
}
export declare const createGraphConfig: <T = any>(addOptions: (config: GraphConfig, proxy: IValueProxy<T>) => void) => (props?: T) => GraphConfig;
export {};
