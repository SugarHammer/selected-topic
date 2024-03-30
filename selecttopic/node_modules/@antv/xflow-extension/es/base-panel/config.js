/** baseConfig */
export class PropsProxy {
    constructor() {
        /** 设置组件的props */
        this.getValue = () => {
            return {};
        };
    }
    /** dispose */
    dispose() {
        this.getValue = () => null;
    }
}
/** baseConfig */
export class PanelBaseConfig {
    /** uuid */
    constructor(moduleId) {
        this.moduleId = moduleId;
    }
    /** dispose */
    dispose() { }
}
//# sourceMappingURL=config.js.map