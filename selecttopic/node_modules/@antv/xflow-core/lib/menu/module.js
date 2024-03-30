"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
/** 扩展 menu 注册 */
var menu_registry_1 = require("./menu-registry");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("./interface");
/** 依赖扩展模块，必须要加载 */
var createModule = function () {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 注册 IMenuContribution 成为一个扩展点 */
        mana_syringe_1.Contribution.register(register, interface_1.IMenuContribution);
        /** 注册 MenuModelRegistry 到 IFrontendApplicationContribution */
        /** 注册 MenuModelRegistry */
        register(menu_registry_1.MenuRegistry);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map