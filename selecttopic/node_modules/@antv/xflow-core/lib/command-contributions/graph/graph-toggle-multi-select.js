"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphToggleMultiSelectCommand = exports.NsGraphToggleMultiSelect = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var model_service_1 = require("../../model-service");
var constant_1 = require("../constant");
var NsGraphToggleMultiSelect;
(function (NsGraphToggleMultiSelect) {
    /** Command: 用于注册named factory */
    NsGraphToggleMultiSelect.command = constant_1.XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT;
    /** hookName */
    NsGraphToggleMultiSelect.hookKey = 'toggleMultiSelect';
})(NsGraphToggleMultiSelect = exports.NsGraphToggleMultiSelect || (exports.NsGraphToggleMultiSelect = {}));
var GraphToggleMultiSelectCommand = /** @class */ (function () {
    /** 画布缩放命令 */
    function GraphToggleMultiSelectCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.toggleMultiSelect.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, config, isEnable, modelService, graphEnableMultiSelectModel, needEnableRubberBand;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            return [4 /*yield*/, this.ctx.getGraphConfig()];
                                        case 2:
                                            config = _a.sent();
                                            isEnable = handlerArgs.isEnable, modelService = handlerArgs.modelService;
                                            return [4 /*yield*/, model_service_1.MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService)];
                                        case 3:
                                            graphEnableMultiSelectModel = _a.sent();
                                            needEnableRubberBand = typeof isEnable === 'boolean' ? isEnable : !x6Graph.isRubberbandEnabled();
                                            if (needEnableRubberBand) {
                                                x6Graph.enableRubberband();
                                                if (x6Graph.scroller && x6Graph.scroller.widget) {
                                                    x6Graph.scroller.disablePanning();
                                                }
                                                else {
                                                    x6Graph.disablePanning();
                                                }
                                                config.graphContainer.style.cursor = 'crosshair';
                                            }
                                            else {
                                                x6Graph.disableRubberband();
                                                if (x6Graph.scroller && x6Graph.scroller.widget) {
                                                    x6Graph.scroller.enablePanning();
                                                }
                                                else {
                                                    x6Graph.enablePanning();
                                                }
                                                config.graphContainer.style.cursor = 'grab';
                                            }
                                            graphEnableMultiSelectModel.setValue({ isEnable: needEnableRubberBand });
                                            return [2 /*return*/, { isEnable: needEnableRubberBand }];
                                    }
                                });
                            }); }, 
                            /** execute command 时创建的hook */
                            runtimeHook)
                            /** 设置结果 */
                        ];
                    case 1:
                        result = _b.sent();
                        /** 设置结果 */
                        this.ctx.setResult(result);
                        return [2 /*return*/, this];
                }
            });
        }); };
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
        this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.ctx.isUndoable) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        }); };
    }
    GraphToggleMultiSelectCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphToggleMultiSelectCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphToggleMultiSelectCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphToggleMultiSelectCommand.prototype, "init", null);
    GraphToggleMultiSelectCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphToggleMultiSelect.command.id },
        })
        /** 画布缩放命令 */
    ], GraphToggleMultiSelectCommand);
    return GraphToggleMultiSelectCommand;
}());
exports.GraphToggleMultiSelectCommand = GraphToggleMultiSelectCommand;
//# sourceMappingURL=graph-toggle-multi-select.js.map