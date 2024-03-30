import { __awaiter } from "tslib";
import { Syringe } from 'mana-syringe';
import { IHookContribution } from '../hooks/interface';
import { disposableNoop } from '../common/utils';
export const CONFIG_TYPE = 'CommandConfig';
export const getDefaultContributions = () => {
    return [];
};
export class CommandConfig {
    constructor() {
        this.setCommandContributions = (fn) => {
            this.getContributions = fn;
        };
        this.getCommandContributions = () => {
            return this.getContributions();
        };
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            if (this.registerHookFn) {
                return this.registerHookFn(hooks);
            }
            return disposableNoop;
        });
        this.registerHookHub = (registry) => __awaiter(this, void 0, void 0, function* () {
            if (this.registerHookHubFn) {
                return this.registerHookHubFn(registry);
            }
            return disposableNoop;
        });
        /** 设置CONFIG类型 */
        this.CONFIG_TYPE = CONFIG_TYPE;
        /** set command hook fn */
        this.setRegisterHookFn = (fn) => {
            this.registerHookFn = fn;
        };
        /** 注册 command hook hub */
        this.setRegisterHookHubFn = (fn) => {
            this.registerHookHubFn = fn;
        };
        /** 获取config的所有配置*/
        this.getConfig = () => __awaiter(this, void 0, void 0, function* () {
            return {
                registerHookFn: this.registerHookFn,
                getContributions: this.getContributions,
                CONFIG_TYPE: this.CONFIG_TYPE,
            };
        });
        this.getContributions = getDefaultContributions;
    }
}
/** 提供一个工厂方法 */
export const createCommandConfig = () => {
    return new CommandConfig();
};
export const registerCommandConfig = (register, commandConfig) => {
    register({
        token: CommandConfig,
        contrib: [IHookContribution],
        lifecycle: Syringe.Lifecycle.singleton,
        useDynamic: () => {
            return commandConfig;
        },
    });
};
//# sourceMappingURL=config.js.map