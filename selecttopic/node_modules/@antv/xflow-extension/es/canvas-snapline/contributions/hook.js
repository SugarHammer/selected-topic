import { __awaiter, __decorate } from "tslib";
import { DisposableCollection, Disposable } from '@antv/xflow-core';
import { IHookContribution, ManaSyringe } from '@antv/xflow-core';
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
let HookContribution = class HookContribution {
    constructor() {
        this.toDispose = new DisposableCollection();
        // args: registry: IHookService<ICmdHooks>
        this.registerHookHub = () => __awaiter(this, void 0, void 0, function* () {
            return Disposable.create(() => { });
        });
        this.registerHook = (hooks) => __awaiter(this, void 0, void 0, function* () {
            const toDispose = new DisposableCollection();
            const disposables = [
                hooks.graphOptions.registerHook({
                    name: 'add snapline options',
                    handler: (args) => __awaiter(this, void 0, void 0, function* () {
                        // 对齐线配置，辅助移动节点排版（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/snapline）
                        args.snapline = {
                            enabled: true,
                            className: 'xflow-snapline',
                            clean: 5000,
                        };
                    }),
                }),
            ];
            toDispose.pushAll(disposables);
            return Disposable.create(() => { });
        });
    }
};
HookContribution = __decorate([
    ManaSyringe.singleton({ contrib: IHookContribution })
], HookContribution);
export { HookContribution };
//# sourceMappingURL=hook.js.map