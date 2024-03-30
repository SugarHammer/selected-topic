"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRegistry = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var interface_2 = require("./interface");
var MenuRegistry = /** @class */ (function () {
    function MenuRegistry() {
        var _this = this;
        /** disposables */
        this.toDispose = new disposable_1.DisposableCollection();
        /** menuMap */
        this.menuMap = new Map();
        /**
         * 获取 menu
         * @param menuId menuId
         */
        this.getMenu = function (menuId) {
            return _this.menuMap.get(menuId);
        };
        /**
         * 注册一批可单独dispose的扩展项目
         * @param externalRegisterFn IRegisterMenuFunction
         */
        this.registerDisposableMenu = function (externalRegisterFn) {
            var toDispose = new disposable_1.DisposableCollection();
            var disposableRegistry = {
                registerMenu: function (config) {
                    var disposable = _this.registerMenu(config);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            _this.toDispose.push(toDispose);
            return toDispose;
        };
    }
    /** app启动时，收集menu扩展点的注册项 */
    MenuRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        for (var _i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
            var contribution = contributions_1[_i];
            contribution.registerMenu(this);
        }
    };
    /** app的停止逻辑 */
    MenuRegistry.prototype.onStop = function () {
        this.toDispose.dispose();
    };
    /**
     * 注册 menu 类型
     * @param config IMenu
     */
    MenuRegistry.prototype.registerMenu = function (config) {
        var _this = this;
        this.menuMap.set(config.id, config);
        return disposable_1.Disposable.create(function () { return _this.menuMap.delete(config.id); });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IMenuContribution),
        tslib_1.__metadata("design:type", Object)
    ], MenuRegistry.prototype, "contributionProvider", void 0);
    MenuRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IFrontendApplicationContribution, interface_2.IMenuService] })
    ], MenuRegistry);
    return MenuRegistry;
}());
exports.MenuRegistry = MenuRegistry;
//# sourceMappingURL=menu-registry.js.map