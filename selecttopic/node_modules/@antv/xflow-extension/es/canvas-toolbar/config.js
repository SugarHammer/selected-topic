import { uuidv4 } from '@antv/xflow-core';
export const CONFIG_TYPE = 'CanvasToolbar';
export class ToolbarConfig {
    /** uuid */
    constructor() {
        /** config type */
        this.CONFIG_TYPE = CONFIG_TYPE;
        /** 设置toolbar id */
        this.setToolbarName = (moduleId) => {
            this.moduleId = CONFIG_TYPE + '__' + moduleId;
        };
        /** 通过订阅 modelService 设置toolbar model */
        this.setToolbarModelService = (service) => {
            this.toolbarModelService = service;
        };
        /** 设置组件的props */
        this.setCustomToolbarRender = (service) => {
            this.customRenderService = service;
        };
        /** 获取Props */
        this.getConfig = () => {
            return {
                CONFIG_TYPE: this.CONFIG_TYPE,
                toolbarCustomRender: this.customRenderService,
                toolbarModelService: this.toolbarModelService,
            };
        };
        this.moduleId = CONFIG_TYPE + '__' + uuidv4();
    }
    /** dispose */
    dispose() { }
}
//# sourceMappingURL=config.js.map