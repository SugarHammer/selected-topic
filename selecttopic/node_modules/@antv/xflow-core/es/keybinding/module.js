import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-redeclare */
import 'reflect-metadata';
/** Toolbar扩展点依赖 */
import { KeyBindingRegistry } from './keybinding-registry';
import { IKeyBindingContribution, IKeyBindingOptionProvider } from './interface';
import { Contribution, Module, Syringe } from 'mana-syringe';
export const registerKeybindingConfig = (register, config) => {
    register(IKeyBindingOptionProvider, {
        useDynamic: () => {
            return {
                getOption: () => __awaiter(void 0, void 0, void 0, function* () {
                    return config.getConfig();
                }),
            };
        },
        lifecycle: Syringe.Lifecycle.singleton,
    });
};
/** 依赖扩展模块，必须要加载 */
export const createModule = (keyBindingConfig) => {
    return Module(register => {
        /** 绑定 context 配置 */
        registerKeybindingConfig(register, keyBindingConfig);
        /** 注册 IContextContribution */
        Contribution.register(register, IKeyBindingContribution);
        /** 注册 KeyBindingRegistry 到 IFrontendApplicationContribution  */
        /** 注册 KeyBindingRegistry */
        /** 注册 KeyBindingRegistry alias  IKeybindingService */
        register(KeyBindingRegistry);
    });
};
//# sourceMappingURL=module.js.map