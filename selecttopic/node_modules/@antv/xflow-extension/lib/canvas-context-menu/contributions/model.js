"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasContextMenuContribution = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var interface_1 = require("../interface");
var config_1 = require("../config");
var inject = xflow_core_1.ManaSyringe.inject, singleton = xflow_core_1.ManaSyringe.singleton;
/**
 * IModelContribution
 */
var CanvasContextMenuContribution = /** @class */ (function () {
    function CanvasContextMenuContribution() {
        var _this = this;
        /** 注册 model */
        this.toDispose = new xflow_core_1.DisposableCollection();
        /** 获取 MenuModel */
        this.getMenuModelValue = function (contextMenuInfo) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var config, anchor, type, cell, toDispose, data, menuModel, renderProps, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.menuConfig.getConfig()
                        /** 获取坐标 */
                    ];
                    case 1:
                        config = _b.sent();
                        anchor = contextMenuInfo.anchor, type = contextMenuInfo.type, cell = contextMenuInfo.cell;
                        toDispose = new xflow_core_1.DisposableCollection();
                        this.toDispose.push(toDispose);
                        data = cell ? cell.getData() : null;
                        menuModel = new xflow_core_1.RxModel({
                            id: 'menuroot',
                            type: xflow_core_1.MenuItemType.Root,
                            submenu: [],
                        });
                        toDispose.push(xflow_core_1.Disposable.create(function () {
                            menuModel.dispose();
                        }));
                        renderProps = {
                            toDispose: toDispose,
                            anchor: anchor,
                            target: { data: data, type: type },
                            customRender: null,
                            menuModel: menuModel,
                        };
                        if (!config.menuCustomRender) return [3 /*break*/, 3];
                        _a = renderProps;
                        return [4 /*yield*/, config.menuCustomRender(contextMenuInfo, this.modelService)];
                    case 2:
                        _a.customRender = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!config.menuModelService) return [3 /*break*/, 5];
                        return [4 /*yield*/, config.menuModelService(contextMenuInfo, renderProps.menuModel, this.modelService, toDispose)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, renderProps];
                }
            });
        }); };
    }
    /** 注册 MenuModel */
    CanvasContextMenuContribution.prototype.registerModel = function (registry) {
        var _this = this;
        var toDispose = [
            registry.registerModel({
                id: interface_1.CONTEXT_MENU_MODEL.id,
                getInitialValue: function () { return null; },
                watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var contextMenuModel;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xflow_core_2.MODELS.CONTEXTMENU_TARGET.getModel(modelService)];
                            case 1:
                                contextMenuModel = _a.sent();
                                return [2 /*return*/, contextMenuModel.watch(function (contextMenuInfo) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var contextMenuValue;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.getMenuModelValue(contextMenuInfo)];
                                                case 1:
                                                    contextMenuValue = _a.sent();
                                                    self.setValue(contextMenuValue);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                        }
                    });
                }); },
            }),
        ];
        this.toDispose.pushAll(toDispose);
    };
    tslib_1.__decorate([
        inject(config_1.ContextMenuConfig),
        tslib_1.__metadata("design:type", config_1.ContextMenuConfig)
    ], CanvasContextMenuContribution.prototype, "menuConfig", void 0);
    tslib_1.__decorate([
        inject(xflow_core_1.IModelService),
        tslib_1.__metadata("design:type", Object)
    ], CanvasContextMenuContribution.prototype, "modelService", void 0);
    CanvasContextMenuContribution = tslib_1.__decorate([
        singleton({ contrib: [xflow_core_1.IModelContribution] })
    ], CanvasContextMenuContribution);
    return CanvasContextMenuContribution;
}());
exports.CanvasContextMenuContribution = CanvasContextMenuContribution;
//# sourceMappingURL=model.js.map