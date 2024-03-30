"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeContribution = exports.NsGraphEventPlugin = void 0;
var tslib_1 = require("tslib");
var disposable_1 = require("../../common/disposable");
var config_1 = require("../config");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../interface");
var NsGraphEventPlugin;
(function (NsGraphEventPlugin) {
    NsGraphEventPlugin.pluginId = 'GraphEventPlugin';
})(NsGraphEventPlugin = exports.NsGraphEventPlugin || (exports.NsGraphEventPlugin = {}));
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
var RuntimeContribution = /** @class */ (function () {
    function RuntimeContribution() {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var hookRegisterFn, d;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hookConfig.getConfig()];
                    case 1:
                        hookRegisterFn = (_a.sent()).hookRegisterFn;
                        d = hookRegisterFn(hooks);
                        return [2 /*return*/, disposable_1.Disposable.create(function () {
                                d.dispose();
                            })];
                }
            });
        }); };
        this.registerHookHub = function (registry) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var hookhubRegisterFn, d;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hookConfig.getConfig()];
                    case 1:
                        hookhubRegisterFn = (_a.sent()).hookhubRegisterFn;
                        d = hookhubRegisterFn(registry);
                        return [2 /*return*/, disposable_1.Disposable.create(function () {
                                d.dispose();
                            })];
                }
            });
        }); };
    }
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(config_1.HookConfig),
        tslib_1.__metadata("design:type", config_1.HookConfig)
    ], RuntimeContribution.prototype, "hookConfig", void 0);
    RuntimeContribution = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: interface_1.IHookContribution })
    ], RuntimeContribution);
    return RuntimeContribution;
}());
exports.RuntimeContribution = RuntimeContribution;
//# sourceMappingURL=default.js.map