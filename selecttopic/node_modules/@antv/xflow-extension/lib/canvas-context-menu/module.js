"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
var xflow_core_1 = require("@antv/xflow-core");
var model_1 = require("./contributions/model");
var config_1 = require("./config");
/** 依赖扩展模块，必须要加载 */
var createModule = function (config) {
    return xflow_core_1.ManaSyringe.Module(function (register) {
        /** 扩展 runtime hook */
        register(model_1.CanvasContextMenuContribution);
        register(config_1.ContextMenuConfig, { useValue: config });
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map