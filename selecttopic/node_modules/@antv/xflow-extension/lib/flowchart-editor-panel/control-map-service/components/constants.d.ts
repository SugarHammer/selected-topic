export declare const PREFIX = "flowchart-editor";
export declare const FormItemHeight = 24;
/** 边默认配置 */
export declare const DefaultEdgeConfig: {
    attrs: {
        line: {
            stroke: string;
            strokeWidth: number;
        };
        text: {
            fill: string;
            fontSize: number;
            textAnchor: string;
            textVerticalAnchor: string;
        };
    };
};
export declare const ArrowConfig: {
    width: number;
    height: number;
    name: string;
};
export declare const DisableArrowConfig: {
    width: number;
    height: number;
    name: string;
};
export declare const ArrowMaps: {
    target: {
        sourceMarker: {
            width: number;
            height: number;
            name: string;
        };
        targetMarker: {
            width: number;
            height: number;
            name: string;
        };
    };
    source: {
        sourceMarker: {
            width: number;
            height: number;
            name: string;
        };
        targetMarker: {
            width: number;
            height: number;
            name: string;
        };
    };
    all: {
        sourceMarker: {
            width: number;
            height: number;
            name: string;
        };
        targetMarker: {
            width: number;
            height: number;
            name: string;
        };
    };
    none: {
        sourceMarker: {
            width: number;
            height: number;
            name: string;
        };
        targetMarker: {
            width: number;
            height: number;
            name: string;
        };
    };
};
export declare const ArrowStrokeMaps: {
    solid: number[];
    dash: number[];
};
