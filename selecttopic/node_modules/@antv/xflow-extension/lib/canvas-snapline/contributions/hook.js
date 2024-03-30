"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookContribution = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
var HookContribution = /** @class */ (function () {
    function HookContribution() {
        var _this = this;
        this.toDispose = new xflow_core_1.DisposableCollection();
        // args: registry: IHookService<ICmdHooks>
        this.registerHookHub = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, xflow_core_1.Disposable.create(function () { })];
            });
        }); };
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toDispose, disposables;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                toDispose = new xflow_core_1.DisposableCollection();
                disposables = [
                    hooks.graphOptions.registerHook({
                        name: 'add snapline options',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                // 对齐线配置，辅助移动节点排版（详细文档：https://X6.antv.vision/zh/docs/tutorial/basic/snapline）
                                args.snapline = {
                                    enabled: true,
                                    className: 'xflow-snapline',
                                    clean: 5000,
                                };
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                ];
                toDispose.pushAll(disposables);
                return [2 /*return*/, xflow_core_1.Disposable.create(function () { })];
            });
        }); };
    }
    HookContribution = tslib_1.__decorate([
        xflow_core_2.ManaSyringe.singleton({ contrib: xflow_core_2.IHookContribution })
    ], HookContribution);
    return HookContribution;
}());
exports.HookContribution = HookContribution;
//# sourceMappingURL=hook.js.map