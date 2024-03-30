import { __awaiter, __decorate, __metadata } from "tslib";
import { singleton, Contribution, contrib } from 'mana-syringe';
import { DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { initHooks, IHookService, IHookContribution } from './interface';
let HookRegistry = class HookRegistry {
    constructor() {
        /** disposables */
        this.toDispose = new DisposableCollection();
        /** hooks */
        this.hookProvider = () => this.hooks;
        /** 注册hook插件 */
        this.registerHook = (fn) => {
            return fn(this.hooks);
        };
        /** 注册hook  */
        this.registerHookHub = (hookName, hook) => {
            this.hooks[hookName] = hook;
            return {
                dispose: () => {
                    delete this.hooks[hookName];
                },
            };
        };
        /** app启动时，收集hook扩展点的注册项 */
        this.onStart = () => __awaiter(this, void 0, void 0, function* () {
            const contributions = this.contributionProvider.getContributions();
            for (const contribution of contributions) {
                contribution.registerHookHub(this);
            }
            for (const contribution of contributions) {
                contribution.registerHook(this.hooks);
            }
        });
        this.hooks = initHooks();
    }
    /** app的停止逻辑 */
    onStop() {
        this.toDispose.dispose();
    }
};
__decorate([
    contrib(IHookContribution),
    __metadata("design:type", Object)
], HookRegistry.prototype, "contributionProvider", void 0);
HookRegistry = __decorate([
    singleton({ contrib: [IFrontendApplicationContribution, IHookService] }),
    __metadata("design:paramtypes", [])
], HookRegistry);
export { HookRegistry };
//# sourceMappingURL=hook-registry.js.map