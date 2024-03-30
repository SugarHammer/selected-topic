"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
var hook_1 = require("./contributions/hook");
var interface_1 = require("./interface");
var xflow_core_1 = require("@antv/xflow-core");
/** 依赖扩展模块，必须要加载 */
var createModule = function (config) {
    return xflow_core_1.ManaSyringe.Module(function (register) {
        register(interface_1.IMinimapConfigProvider, { useDynamic: function () { return config; } });
        /** 扩展 runtime hook */
        register(hook_1.HookContribution);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map