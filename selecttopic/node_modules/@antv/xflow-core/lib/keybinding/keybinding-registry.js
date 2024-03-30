"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyBindingRegistry = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var graph_provider_1 = require("../xflow-main/graph/graph-provider");
var interface_2 = require("./interface");
var interface_3 = require("../command/interface");
var interface_4 = require("../model-service/interface");
var KeyBindingRegistry = /** @class */ (function () {
    function KeyBindingRegistry() {
        var _this = this;
        /** disposables */
        this.toDispose = new disposable_1.DisposableCollection();
        /** disposables */
        this.keyBindingMap = new Map();
        /** disposables */
        this.enabledKeyBindingMap = new Map();
        /** 注册用户定义在config中的keybinding */
        this.registerExternalKeybindings = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var registerKeybindingFunc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.optionProvider.getOption()];
                    case 1:
                        registerKeybindingFunc = (_a.sent()).registerKeybindingFunc;
                        return [2 /*return*/, registerKeybindingFunc(this)];
                }
            });
        }); };
        /** 注册可Dispose的Keybinding */
        this.registerKeybinding = function (keybindings) {
            if (keybindings === void 0) { keybindings = []; }
            var toDispose = new disposable_1.DisposableCollection();
            keybindings.forEach(function (keybinding) {
                /** 注册 Keybinding config */
                _this.keyBindingMap.set(keybinding.id, keybinding);
                /** enable Keybinding */
                _this.enableKeyBindings(keybinding.id).then(function (d) {
                    toDispose.push(disposable_1.Disposable.create(function () {
                        d.dispose();
                        _this.keyBindingMap.delete(keybinding.id);
                    }));
                });
            });
            _this.toDispose.push(toDispose);
            return toDispose;
        };
        /**
         * 启用keybinding, 用于触发command
         * @param id contextId
         */
        this.enableKeyBindings = function (keybindingId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var keybinding, graph, handler, toDispose;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /** 清理同样的键盘事件 */
                        this.disableKeyBindings([keybindingId]);
                        keybinding = this.keyBindingMap.get(keybindingId);
                        return [4 /*yield*/, this.getX6Graph()
                            /**
                             * x6文档：https://x6.antv.vision/zh/docs/api/graph/keyboard
                             * x6源码：packages/x6/src/graph/keyboard.ts
                             */
                        ];
                    case 1:
                        graph = _a.sent();
                        handler = this.runCommand(keybinding);
                        graph.bindKey(keybinding.keybinding, handler);
                        toDispose = disposable_1.Disposable.create(function () {
                            graph.unbindKey(keybinding.keybinding);
                            _this.enabledKeyBindingMap.delete(keybinding.id);
                        });
                        /** 注册disposable */
                        this.enabledKeyBindingMap.set(keybinding.id, toDispose);
                        return [2 /*return*/, toDispose];
                }
            });
        }); };
        /**
         * 禁用keybinding
         */
        this.disableKeyBindings = function (ids) {
            ids.forEach(function (id) {
                var disposable = _this.enabledKeyBindingMap.get(id);
                if (disposable) {
                    disposable.dispose();
                }
            });
        };
        /**
         * 执行command
         */
        this.runCommand = function (keybinding) { return function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, keybinding.callback(keybinding, this.modelService, this.commandService, e)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }; };
        /**
         * 获取画布实例
         */
        this.getX6Graph = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graphInstance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graphInstance = _a.sent();
                        return [2 /*return*/, graphInstance];
                }
            });
        }); };
    }
    /**
     *  app启动时, 注册keybinding的扩展
     */
    KeyBindingRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        for (var _i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
            var contribution = contributions_1[_i];
            contribution.registerKeybinding(this);
        }
        this.registerExternalKeybindings();
    };
    /**
     * app停止的逻辑
     */
    KeyBindingRegistry.prototype.onStop = function () {
        this.toDispose.dispose();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_2.IKeyBindingOptionProvider),
        tslib_1.__metadata("design:type", Object)
    ], KeyBindingRegistry.prototype, "optionProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_3.IGraphCommandService),
        tslib_1.__metadata("design:type", Object)
    ], KeyBindingRegistry.prototype, "commandService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_4.IModelService),
        tslib_1.__metadata("design:type", Object)
    ], KeyBindingRegistry.prototype, "modelService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IKeyBindingContribution),
        tslib_1.__metadata("design:type", Object)
    ], KeyBindingRegistry.prototype, "contributionProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(graph_provider_1.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], KeyBindingRegistry.prototype, "graphProvider", void 0);
    KeyBindingRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IFrontendApplicationContribution, interface_2.IKeyBindingService] })
    ], KeyBindingRegistry);
    return KeyBindingRegistry;
}());
exports.KeyBindingRegistry = KeyBindingRegistry;
//# sourceMappingURL=keybinding-registry.js.map