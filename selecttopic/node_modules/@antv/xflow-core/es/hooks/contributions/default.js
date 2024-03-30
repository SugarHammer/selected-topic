import { __awaiter, __decorate, __metadata } from "tslib";
import { DisposableCollection, Disposable } from '../../common/disposable';
import { HookConfig } from '../config';
import { singleton, inject } from 'mana-syringe';
import { IHookContribution } from '../interface';
export var NsGraphEventPlugin;
(function (NsGraphEventPlugin) {
    NsGraphEventPlugin.pluginId = 'GraphEventPlugin';
})(NsGraphEventPlugin || (NsGraphEventPlugin = {}));
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
let RuntimeContribution = class RuntimeContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const { hookRegisterFn } = yield this.hookConfig.getConfig();
            const d = hookRegisterFn(hooks);
            return Disposable.create(() => {
                d.dispose();
            });
        });
        this.registerHookHub = (registry) => __awaiter(this, void 0, void 0, function* () {
            const { hookhubRegisterFn } = yield this.hookConfig.getConfig();
            const d = hookhubRegisterFn(registry);
            return Disposable.create(() => {
                d.dispose();
            });
        });
    }
};
__decorate([
    inject(HookConfig),
    __metadata("design:type", HookConfig)
], RuntimeContribution.prototype, "hookConfig", void 0);
RuntimeContribution = __decorate([
    singleton({ contrib: IHookContribution })
], RuntimeContribution);
export { RuntimeContribution };
//# sourceMappingURL=default.js.map