"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = exports.ExtensionRegistry = void 0;
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
/** Application */
var application_1 = require("./application");
/** Command 模块 */
var module_1 = require("../command/module");
var module_2 = require("../model-service/module");
/** Extension 注册中心 */
var extension_registry_1 = require("./components/extension-registry");
Object.defineProperty(exports, "ExtensionRegistry", { enumerable: true, get: function () { return extension_registry_1.ExtensionRegistry; } });
/** 类型定义 */
var mana_syringe_1 = require("mana-syringe");
/** application */
var appMainModule = (0, mana_syringe_1.Module)(function (register) {
    /** 声明IFrontendApplicationContribution扩展点*/
    mana_syringe_1.Contribution.register(register, application_1.IFrontendApplicationContribution);
    /** 声明 FrontendApplication */
    register(application_1.FrontendApplication);
});
var initApp = function (moduleRegistry) {
    var extensions = moduleRegistry.getAllExtensions();
    var container = new mana_syringe_1.Container();
    /** command */
    /** react renderer */
    /** 批量创建 extension module */
    var modules = extensions.map(function (module) {
        var createModule = module.createModule, config = module.config;
        return createModule(config);
    });
    /** 单独加载 appMainModule */
    container.load(appMainModule);
    /** 单独加载 commandRegistryModule */
    container.load(module_1.commandRegistryModule);
    // /** 单独加载 modelServiceModule */
    container.load(module_2.modelServiceModule);
    /**
     * 批量加载 extension module
     * 包括：menu/toolbar/keybinding/graph
     */
    modules.forEach(function (module) {
        container.load(module);
    });
    var app = container.get(application_1.FrontendApplication);
    return app;
};
exports.initApp = initApp;
//# sourceMappingURL=application-module.js.map