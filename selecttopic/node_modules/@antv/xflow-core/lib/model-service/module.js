"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = exports.registerModelServiceConfig = exports.modelServiceModule = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
var mana_syringe_1 = require("mana-syringe");
var model_registry_1 = require("./model-registry");
/**  model service 扩展  */
var interface_1 = require("./interface");
var command_model_1 = require("./contributions/command-model");
var graph_model_1 = require("./contributions/graph-model");
/** 模块 */
exports.modelServiceModule = (0, mana_syringe_1.Module)(function (register) {
    /** 注册 IModelService Contribution */
    mana_syringe_1.Contribution.register(register, interface_1.IModelContribution);
    /** 注册 ModelRegistry 到 IFrontendApplicationContribution  */
    /** 注册 ModelRegistry alias IModelService Service */
    register(model_registry_1.ModelRegistry);
    /** 注册 Graph 相关的ModelService  */
    register(graph_model_1.GraphModelContribution);
    /** 注册 Command 相关的ModelService  */
    register(command_model_1.CommandModelContribution);
});
var registerModelServiceConfig = function (register, config) {
    register({
        token: interface_1.IModelOptionProvider,
        useDynamic: function () {
            return {
                getOption: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, config.getConfig()];
                    });
                }); },
            };
        },
        lifecycle: mana_syringe_1.Syringe.Lifecycle.singleton,
    });
};
exports.registerModelServiceConfig = registerModelServiceConfig;
/** 组件的 config 模块，必须要加载 */
var createModule = function (config) {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 绑定 ModelService  配置 */
        (0, exports.registerModelServiceConfig)(register, config);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map