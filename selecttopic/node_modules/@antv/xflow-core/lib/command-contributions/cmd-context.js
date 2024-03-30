"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdContext = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var disposable_1 = require("../common/disposable");
var graph_provider_1 = require("../xflow-main/graph/graph-provider");
var model_service_1 = require("../model-service");
var interface_1 = require("../command/interface");
var hooks_1 = require("../hooks");
var CmdContext = /** @class */ (function () {
    function CmdContext() {
        var _this = this;
        /** undos 存在这里 */
        this.toDispose = new disposable_1.DisposableCollection();
        /** command handler的runtimeHook */
        this.runtimeHooks = [];
        /** 获取 x6 实例 */
        this.getX6Graph = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graphInstance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.graph)
                            return [2 /*return*/, this.graph];
                        return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graphInstance = _a.sent();
                        this.graph = graphInstance;
                        return [2 /*return*/, graphInstance];
                }
            });
        }); };
        /** 获取 graph */
        this.getGraphConfig = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.graphProvider.getGraphOptions()];
            });
        }); };
        /** 获取 graphMeta */
        this.getGraphMeta = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var service, meta, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        service = this.getModelService();
                        _a = this.graphMeta;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, model_service_1.MODELS.GRAPH_META.useValue(service)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        meta = _a;
                        return [2 /*return*/, meta];
                }
            });
        }); };
        /** 设置参数 */
        this.setArgs = function (args, runtimeHooks) {
            if (runtimeHooks === void 0) { runtimeHooks = []; }
            _this.args = args;
            _this.runtimeHooks = runtimeHooks;
            return { args: args, hooks: runtimeHooks };
        };
        /** 获取参数 */
        this.getArgs = function () {
            /** 注入graph meta */
            var args = tslib_1.__assign(tslib_1.__assign({}, _this.args), { modelService: _this.getModelService(), commandService: _this.getCommands(), getGraphMeta: _this.getGraphMeta, getX6Graph: _this.getX6Graph, getGraphConfig: _this.getGraphConfig });
            return { args: args, hooks: _this.runtimeHooks };
        };
        /** 设置执行结果 */
        this.setResult = function (result) {
            _this.result = result;
            return _this.result;
        };
        /** 获取执行结果 */
        this.getResult = function () {
            return _this.result;
        };
        /** hooks */
        this.getHooks = function () {
            return _this.hookService.hookProvider();
        };
        /** 获取Command Service */
        this.getCommands = function () {
            return _this.commandService;
        };
        /** 获取Context Service */
        this.getModelService = function () {
            return _this.modelService;
        };
        /** 添加undo */
        this.addUndo = function (disposable) {
            if (!Array.isArray(disposable)) {
                return _this.addUndo([disposable]);
            }
            _this.toDispose.pushAll(disposable);
        };
        /** 执行undo */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toDispose.dispose()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /** 是否可以执行undo */
        this.isUndoable = function () {
            return !_this.toDispose.disposed;
        };
        /** 获取 toDispose */
        this.getDisposables = function () { return _this.toDispose; };
        /** 设置的共享变量 可以在command间共享 */
        this.setGlobal = function (key, value) {
            _this.commandService.setGlobal(key, value);
        };
        /** 获取共享变量 */
        this.getGlobal = function (key) {
            return _this.commandService.getGlobal(key);
        };
    }
    CmdContext.prototype.init = function () {
        var _this = this;
        this.getGraphMeta().then(function (meta) {
            _this.graphMeta = meta;
        });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(graph_provider_1.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], CmdContext.prototype, "graphProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(hooks_1.IHookService),
        tslib_1.__metadata("design:type", Object)
    ], CmdContext.prototype, "hookService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.IGraphCommandService),
        tslib_1.__metadata("design:type", Object)
    ], CmdContext.prototype, "commandService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(model_service_1.IModelService),
        tslib_1.__metadata("design:type", Object)
    ], CmdContext.prototype, "modelService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CmdContext.prototype, "init", null);
    CmdContext = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)()
    ], CmdContext);
    return CmdContext;
}());
exports.CmdContext = CmdContext;
//# sourceMappingURL=cmd-context.js.map