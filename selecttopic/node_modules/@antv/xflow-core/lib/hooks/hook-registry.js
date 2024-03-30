"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookRegistry = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var interface_2 = require("./interface");
var HookRegistry = /** @class */ (function () {
    function HookRegistry() {
        var _this = this;
        /** disposables */
        this.toDispose = new disposable_1.DisposableCollection();
        /** hooks */
        this.hookProvider = function () { return _this.hooks; };
        /** 注册hook插件 */
        this.registerHook = function (fn) {
            return fn(_this.hooks);
        };
        /** 注册hook  */
        this.registerHookHub = function (hookName, hook) {
            _this.hooks[hookName] = hook;
            return {
                dispose: function () {
                    delete _this.hooks[hookName];
                },
            };
        };
        /** app启动时，收集hook扩展点的注册项 */
        this.onStart = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var contributions, _i, contributions_1, contribution, _a, contributions_2, contribution;
            return tslib_1.__generator(this, function (_b) {
                contributions = this.contributionProvider.getContributions();
                for (_i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
                    contribution = contributions_1[_i];
                    contribution.registerHookHub(this);
                }
                for (_a = 0, contributions_2 = contributions; _a < contributions_2.length; _a++) {
                    contribution = contributions_2[_a];
                    contribution.registerHook(this.hooks);
                }
                return [2 /*return*/];
            });
        }); };
        this.hooks = (0, interface_2.initHooks)();
    }
    /** app的停止逻辑 */
    HookRegistry.prototype.onStop = function () {
        this.toDispose.dispose();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IHookContribution),
        tslib_1.__metadata("design:type", Object)
    ], HookRegistry.prototype, "contributionProvider", void 0);
    HookRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IFrontendApplicationContribution, interface_2.IHookService] }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HookRegistry);
    return HookRegistry;
}());
exports.HookRegistry = HookRegistry;
//# sourceMappingURL=hook-registry.js.map