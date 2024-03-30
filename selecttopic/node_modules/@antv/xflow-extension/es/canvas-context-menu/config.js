import { __awaiter } from "tslib";
import { uuidv4 } from '@antv/xflow-core';
export var NsContextMenu;
(function (NsContextMenu) {
    NsContextMenu.CONFIG_TYPE = 'ContextMenuConfig';
})(NsContextMenu || (NsContextMenu = {}));
export class ContextMenuConfig {
    /** uuid */
    constructor(moduleId) {
        /** config type */
        this.CONFIG_TYPE = NsContextMenu.CONFIG_TYPE;
        /** 设置组件的props */
        this.setMenuModelService = (service) => {
            this.menuModelService = service;
        };
        /** 设置组件的props */
        this.setCustomMenuRender = (service) => {
            this.menuCustomRender = service;
        };
        /** 获取Props */
        this.getConfig = () => __awaiter(this, void 0, void 0, function* () {
            return {
                CONFIG_TYPE: this.CONFIG_TYPE,
                menuCustomRender: this.menuCustomRender,
                menuModelService: this.menuModelService,
            };
        });
        this.moduleId = moduleId || uuidv4();
    }
    /** dispose */
    dispose() { }
}
//# sourceMappingURL=config.js.map