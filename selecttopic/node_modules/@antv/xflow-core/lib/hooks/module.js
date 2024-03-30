"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowHookConfig = exports.IHookContribution = exports.createModule = exports.HookRegistry = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
var config_1 = require("./config");
Object.defineProperty(exports, "XFlowHookConfig", { enumerable: true, get: function () { return config_1.HookConfig; } });
var hook_registry_1 = require("./hook-registry");
Object.defineProperty(exports, "HookRegistry", { enumerable: true, get: function () { return hook_registry_1.HookRegistry; } });
var mana_syringe_1 = require("mana-syringe");
var default_1 = require("./contributions/default");
var graph_1 = require("./contributions/graph");
var interface_1 = require("./interface");
Object.defineProperty(exports, "IHookContribution", { enumerable: true, get: function () { return interface_1.IHookContribution; } });
/** 依赖扩展模块，必须要加载 */
var createModule = function (config) {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 注册 IGraphHookContribution 成为一个新扩展点 */
        mana_syringe_1.Contribution.register(register, interface_1.IHookContribution);
        /** 扩展 runtime hook */
        register(default_1.RuntimeContribution);
        /** 扩展 graph event hook */
        register(graph_1.GraphEventContribution);
        /** 注册 HookRegistry 到 IFrontendApplicationContribution */
        /** 注册 HookRegistry */
        register(hook_registry_1.HookRegistry);
        /** 注册 XFlowHookConfig */
        register(config_1.HookConfig, { useValue: config });
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map