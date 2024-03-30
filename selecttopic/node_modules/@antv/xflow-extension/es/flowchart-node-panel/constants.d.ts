export declare const PANEL_HEADER_HEIGHT = 40;
export declare const CONTAINER_CLASS = "xflow-node-panel-collpase";
/** 组群 ID */
export declare const GROUP_NODE_RENDER_ID = "GROUP_NODE_RENDER_ID";
export declare const NODE_WIDTH = 60;
export declare const NODE_HEIGHT = 40;
export declare const NODE_PADDING = 1;
export declare const DefaultNodeConfig: {
    stroke: string;
    fill: string;
    fontFill: string;
    fontSize: number;
    label: string;
};
export declare const NODEPOOL: ({
    name: string;
    width?: undefined;
    height?: undefined;
    ports?: undefined;
    label?: undefined;
} | {
    name: string;
    width: number;
    height: number;
    ports?: undefined;
    label?: undefined;
} | {
    name: string;
    ports: string[];
    width?: undefined;
    height?: undefined;
    label?: undefined;
} | {
    name: string;
    label: string;
    width?: undefined;
    height?: undefined;
    ports?: undefined;
})[];
export declare const ASPECTRATIONODE: string[];
