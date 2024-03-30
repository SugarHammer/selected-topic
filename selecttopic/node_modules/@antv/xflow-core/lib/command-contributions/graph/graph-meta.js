"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphMetaCommand = exports.NsGraphMeta = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var model_service_1 = require("../../model-service");
var NsGraphMeta;
(function (NsGraphMeta) {
    /** Command Id: 用于注册named factory */
    NsGraphMeta.command = constant_1.XFlowGraphCommands.LOAD_META;
    /** hookName */
    NsGraphMeta.hookKey = 'graphMeta';
})(NsGraphMeta = exports.NsGraphMeta || (exports.NsGraphMeta = {}));
var GraphMetaCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function GraphMetaCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result, modelService, model;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.graphMeta.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graphMetaService, meta, _a;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            graphMetaService = handlerArgs.graphMetaService;
                                            if (!graphMetaService) return [3 /*break*/, 2];
                                            return [4 /*yield*/, graphMetaService(handlerArgs)];
                                        case 1:
                                            _a = _b.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _a = tslib_1.__assign({}, handlerArgs === null || handlerArgs === void 0 ? void 0 : handlerArgs.meta);
                                            _b.label = 3;
                                        case 3:
                                            meta = _a;
                                            return [2 /*return*/, tslib_1.__assign({ flowId: meta === null || meta === void 0 ? void 0 : meta.flowId }, meta)];
                                    }
                                });
                            }); }, 
                            /** 外部的 hook */
                            runtimeHook)];
                    case 1:
                        result = _b.sent();
                        modelService = this.ctx.getModelService();
                        return [4 /*yield*/, model_service_1.MODELS.GRAPH_META.getModel(modelService)];
                    case 2:
                        model = _b.sent();
                        model.setValue(result);
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
    GraphMetaCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphMetaCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphMetaCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphMetaCommand.prototype, "init", null);
    GraphMetaCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphMeta.command.id },
        })
        /** 创建节点命令 */
    ], GraphMetaCommand);
    return GraphMetaCommand;
}());
exports.GraphMetaCommand = GraphMetaCommand;
//# sourceMappingURL=graph-meta.js.map