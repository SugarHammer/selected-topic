import type { IToolbarModelService, IToolbarCustomRenderService } from './interface';
export declare const CONFIG_TYPE = "CanvasToolbar";
export declare class ToolbarConfig {
    /** config type */
    readonly CONFIG_TYPE = "CanvasToolbar";
    /** toolbar model service */
    private toolbarModelService;
    /** toolbar toolbarRender */
    private customRenderService;
    /** instance id */
    moduleId: string;
    /** uuid */
    constructor();
    /** 设置toolbar id */
    setToolbarName: (moduleId: string) => void;
    /** 通过订阅 modelService 设置toolbar model */
    setToolbarModelService: (service: IToolbarModelService) => void;
    /** 设置组件的props */
    setCustomToolbarRender: (service: IToolbarCustomRenderService) => void;
    /** 获取Props */
    getConfig: () => {
        CONFIG_TYPE: string;
        toolbarCustomRender: IToolbarCustomRenderService;
        toolbarModelService: IToolbarModelService;
    };
    /** dispose */
    dispose(): void;
}
