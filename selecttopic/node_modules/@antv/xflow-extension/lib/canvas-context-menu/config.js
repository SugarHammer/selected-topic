"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuConfig = exports.NsContextMenu = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var NsContextMenu;
(function (NsContextMenu) {
    NsContextMenu.CONFIG_TYPE = 'ContextMenuConfig';
})(NsContextMenu = exports.NsContextMenu || (exports.NsContextMenu = {}));
var ContextMenuConfig = /** @class */ (function () {
    /** uuid */
    function ContextMenuConfig(moduleId) {
        var _this = this;
        /** config type */
        this.CONFIG_TYPE = NsContextMenu.CONFIG_TYPE;
        /** 设置组件的props */
        this.setMenuModelService = function (service) {
            _this.menuModelService = service;
        };
        /** 设置组件的props */
        this.setCustomMenuRender = function (service) {
            _this.menuCustomRender = service;
        };
        /** 获取Props */
        this.getConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        CONFIG_TYPE: this.CONFIG_TYPE,
                        menuCustomRender: this.menuCustomRender,
                        menuModelService: this.menuModelService,
                    }];
            });
        }); };
        this.moduleId = moduleId || (0, xflow_core_1.uuidv4)();
    }
    /** dispose */
    ContextMenuConfig.prototype.dispose = function () { };
    return ContextMenuConfig;
}());
exports.ContextMenuConfig = ContextMenuConfig;
//# sourceMappingURL=config.js.map