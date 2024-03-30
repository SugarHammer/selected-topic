"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = exports.registerKeybindingConfig = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
/** Toolbar扩展点依赖 */
var keybinding_registry_1 = require("./keybinding-registry");
var interface_1 = require("./interface");
var mana_syringe_1 = require("mana-syringe");
var registerKeybindingConfig = function (register, config) {
    register(interface_1.IKeyBindingOptionProvider, {
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
exports.registerKeybindingConfig = registerKeybindingConfig;
/** 依赖扩展模块，必须要加载 */
var createModule = function (keyBindingConfig) {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 绑定 context 配置 */
        (0, exports.registerKeybindingConfig)(register, keyBindingConfig);
        /** 注册 IContextContribution */
        mana_syringe_1.Contribution.register(register, interface_1.IKeyBindingContribution);
        /** 注册 KeyBindingRegistry 到 IFrontendApplicationContribution  */
        /** 注册 KeyBindingRegistry */
        /** 注册 KeyBindingRegistry alias  IKeybindingService */
        register(keybinding_registry_1.KeyBindingRegistry);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map