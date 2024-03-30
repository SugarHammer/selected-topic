import type { IToolbarGroupOptions } from '@antv/xflow-core';
export declare namespace CANVAS_SCALE_TOOLBAR_CONFIG {
    const ZOOM_IN: string;
    const ZOOM_OUT: string;
    const SCALE_TO_ONE: string;
    const SCALE_TO_FIT: string;
    const FULLSCREEN: string;
    const MAX_SCALE = 1.5;
    const MIN_SCALE = 0.05;
    const zoomOptions: {
        maxScale: number;
        minScale: number;
    };
    const getToolbarConfig: ({ zoomFactor, fullscreen, }: {
        zoomFactor?: number;
        fullscreen?: boolean;
    }) => IToolbarGroupOptions[];
}
export declare const TOOLBAR_TYPE = "CANVAS_SCALE_TOOLBAR";
export declare const useConfig: (value?: any) => import("../canvas-toolbar/config").ToolbarConfig;
