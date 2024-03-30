import { __awaiter, __decorate, __metadata } from "tslib";
import { DisposableCollection, Disposable } from '@antv/xflow-core';
import { IHookContribution, ManaSyringe } from '@antv/xflow-core';
import { IMinimapConfigProvider } from '../interface';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
let HookContribution = class HookContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        this.registerHookHub = () => __awaiter(this, void 0, void 0, function* () {
            return Disposable.create(() => { });
        });
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const toDispose = new DisposableCollection();
            const disposables = [
                hooks.graphOptions.registerHook({
                    name: 'add minimap options',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        // 对齐线配置，辅助移动节点排版（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/snapline）
                        const minimapOptions = yield this.minimapConfig.getConfig();
                        args.minimap = Object.assign({}, minimapOptions);
                    }),
                }),
            ];
            toDispose.pushAll(disposables);
            return Disposable.create(() => { });
        });
    }
};
__decorate([
    ManaSyringe.inject(IMinimapConfigProvider),
    __metadata("design:type", Object)
], HookContribution.prototype, "minimapConfig", void 0);
HookContribution = __decorate([
    ManaSyringe.singleton({ contrib: IHookContribution })
], HookContribution);
export { HookContribution };
//# sourceMappingURL=hook.js.map