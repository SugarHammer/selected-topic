"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarConfig = exports.CONFIG_TYPE = void 0;
var xflow_core_1 = require("@antv/xflow-core");
exports.CONFIG_TYPE = 'CanvasToolbar';
var ToolbarConfig = /** @class */ (function () {
    /** uuid */
    function ToolbarConfig() {
        var _this = this;
        /** config type */
        this.CONFIG_TYPE = exports.CONFIG_TYPE;
        /** 设置toolbar id */
        this.setToolbarName = function (moduleId) {
            _this.moduleId = exports.CONFIG_TYPE + '__' + moduleId;
        };
        /** 通过订阅 modelService 设置toolbar model */
        this.setToolbarModelService = function (service) {
            _this.toolbarModelService = service;
        };
        /** 设置组件的props */
        this.setCustomToolbarRender = function (service) {
            _this.customRenderService = service;
        };
        /** 获取Props */
        this.getConfig = function () {
            return {
                CONFIG_TYPE: _this.CONFIG_TYPE,
                toolbarCustomRender: _this.customRenderService,
                toolbarModelService: _this.toolbarModelService,
            };
        };
        this.moduleId = exports.CONFIG_TYPE + '__' + (0, xflow_core_1.uuidv4)();
    }
    /** dispose */
    ToolbarConfig.prototype.dispose = function () { };
    return ToolbarConfig;
}());
exports.ToolbarConfig = ToolbarConfig;
//# sourceMappingURL=config.js.map