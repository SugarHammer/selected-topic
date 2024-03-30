"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphHistoryResetCommand = exports.NsGraphHistoryReset = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsGraphHistoryReset;
(function (NsGraphHistoryReset) {
    /** Command: 用于注册named factory */
    NsGraphHistoryReset.command = constant_1.XFlowGraphCommands.GRAPH_HISTORY_RESET;
    /** hookName */
    NsGraphHistoryReset.hookKey = 'historyReset';
})(NsGraphHistoryReset = exports.NsGraphHistoryReset || (exports.NsGraphHistoryReset = {}));
var GraphHistoryResetCommand = /** @class */ (function () {
    /** 创建清理History命令 */
    function GraphHistoryResetCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = this.contextProvider();
                        _a = ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = ctx.getHooks();
                        return [4 /*yield*/, hooks.historyReset.call(args, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graph;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            graph.cleanHistory();
                                            return [2 /*return*/, { err: null }];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 1:
                        result = _b.sent();
                        ctx.setResult(result);
                        return [2 /*return*/, this];
                }
            });
        }); };
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx;
            return tslib_1.__generator(this, function (_a) {
                ctx = this.contextProvider();
                if (this.isUndoable()) {
                    ctx.undo();
                }
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
        this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isUndoable()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        }); };
    }
    GraphHistoryResetCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphHistoryResetCommand.prototype, "contextProvider", void 0);
    GraphHistoryResetCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphHistoryReset.command.id },
        })
        /** 创建清理History命令 */
    ], GraphHistoryResetCommand);
    return GraphHistoryResetCommand;
}());
exports.GraphHistoryResetCommand = GraphHistoryResetCommand;
//# sourceMappingURL=graph-history-reset.js.map