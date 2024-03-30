"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = exports.ToolbarRegistry = exports.IToolbarContribution = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
/** Toolbar扩展点依赖 */
var toolbar_registry_1 = require("./toolbar-registry");
Object.defineProperty(exports, "ToolbarRegistry", { enumerable: true, get: function () { return toolbar_registry_1.ToolbarRegistry; } });
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("./interface");
Object.defineProperty(exports, "IToolbarContribution", { enumerable: true, get: function () { return interface_1.IToolbarContribution; } });
/** 依赖扩展模块，必须要加载 */
var createModule = function () {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 注册 IToolbarContribution扩展点 */
        mana_syringe_1.Contribution.register(register, interface_1.IToolbarContribution);
        /** 注册 ToolbarRegistry 到 IFrontendApplicationContribution */
        /** 注册 ToolbarRegistry */
        register(toolbar_registry_1.ToolbarRegistry);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map