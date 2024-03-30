"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookContribution = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var interface_1 = require("../interface");
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
var HookContribution = /** @class */ (function () {
    function HookContribution() {
        var _this = this;
        this.toDispose = new xflow_core_1.DisposableCollection();
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
                        name: 'add minimap options',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var minimapOptions;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.minimapConfig.getConfig()];
                                    case 1:
                                        minimapOptions = _a.sent();
                                        args.minimap = tslib_1.__assign({}, minimapOptions);
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    }),
                ];
                toDispose.pushAll(disposables);
                return [2 /*return*/, xflow_core_1.Disposable.create(function () { })];
            });
        }); };
    }
    tslib_1.__decorate([
        xflow_core_2.ManaSyringe.inject(interface_1.IMinimapConfigProvider),
        tslib_1.__metadata("design:type", Object)
    ], HookContribution.prototype, "minimapConfig", void 0);
    HookContribution = tslib_1.__decorate([
        xflow_core_2.ManaSyringe.singleton({ contrib: xflow_core_2.IHookContribution })
    ], HookContribution);
    return HookContribution;
}());
exports.HookContribution = HookContribution;
//# sourceMappingURL=hook.js.map