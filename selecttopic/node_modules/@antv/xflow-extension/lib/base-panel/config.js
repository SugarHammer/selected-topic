"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelBaseConfig = exports.PropsProxy = void 0;
/** baseConfig */
var PropsProxy = /** @class */ (function () {
    function PropsProxy() {
        /** 设置组件的props */
        this.getValue = function () {
            return {};
        };
    }
    /** dispose */
    PropsProxy.prototype.dispose = function () {
        this.getValue = function () { return null; };
    };
    return PropsProxy;
}());
exports.PropsProxy = PropsProxy;
/** baseConfig */
var PanelBaseConfig = /** @class */ (function () {
    /** uuid */
    function PanelBaseConfig(moduleId) {
        this.moduleId = moduleId;
    }
    /** dispose */
    PanelBaseConfig.prototype.dispose = function () { };
    return PanelBaseConfig;
}());
exports.PanelBaseConfig = PanelBaseConfig;
//# sourceMappingURL=config.js.map