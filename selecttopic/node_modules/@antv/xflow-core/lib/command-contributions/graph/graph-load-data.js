"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphLoadDataCommand = exports.NsGraphLoadData = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var xflow_hook_1 = require("@antv/xflow-hook");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
/** 从服务端获取画布数据命令 */
var NsGraphLoadData;
(function (NsGraphLoadData) {
    /** Command: 用于注册named factory */
    NsGraphLoadData.command = constant_1.XFlowGraphCommands.LOAD_DATA;
    /** hookName */
    NsGraphLoadData.hookKey = 'loadData';
    NsGraphLoadData.createHook = function () {
        return new xflow_hook_1.HookHub();
    };
})(NsGraphLoadData = exports.NsGraphLoadData || (exports.NsGraphLoadData = {}));
var GraphLoadDataCommand = /** @class */ (function () {
    /** 画布数据获取命令 */
    function GraphLoadDataCommand() {
        var _this = this;
        /** 执行cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.loadData.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var loadDataService, graphMeta, graphData;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            loadDataService = handlerArgs.loadDataService;
                                            return [4 /*yield*/, this.ctx.getGraphMeta()];
                                        case 1:
                                            graphMeta = _a.sent();
                                            return [4 /*yield*/, loadDataService(graphMeta)];
                                        case 2:
                                            graphData = _a.sent();
                                            return [2 /*return*/, { graphData: graphData }];
                                    }
                                });
                            }); }, runtimeHook)
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
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
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
    GraphLoadDataCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    GraphLoadDataCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphLoadDataCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphLoadDataCommand.prototype, "init", null);
    GraphLoadDataCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphLoadData.command.id },
        })
        /** 画布数据获取命令 */
    ], GraphLoadDataCommand);
    return GraphLoadDataCommand;
}());
exports.GraphLoadDataCommand = GraphLoadDataCommand;
//# sourceMappingURL=graph-load-data.js.map