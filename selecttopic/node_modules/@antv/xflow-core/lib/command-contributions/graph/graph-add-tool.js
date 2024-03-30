"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphAddToolCommand = exports.NsGraphAddTool = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsGraphAddTool;
(function (NsGraphAddTool) {
    /** Command: 用于注册named factory */
    NsGraphAddTool.command = constant_1.XFlowGraphCommands.GRAPH_ADD_TOOL;
    /** hookName */
    NsGraphAddTool.hookKey = 'addTool';
})(NsGraphAddTool = exports.NsGraphAddTool || (exports.NsGraphAddTool = {}));
var GraphAddToolCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function GraphAddToolCommand() {
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
                        return [4 /*yield*/, hooks.addTool.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var cellId, toolConfig, commandService, graph, cell;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            cellId = handlerArgs.cellId, toolConfig = handlerArgs.toolConfig, commandService = handlerArgs.commandService;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            cell = graph.getCellById(cellId);
                                            if (cell) {
                                                cell.addTools(toolConfig.items, toolConfig.options);
                                                ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        if (Array.isArray(toolConfig.items)) {
                                                            toolConfig.items.forEach(function (item) {
                                                                commandService.executeCommand(constant_1.XFlowGraphCommands.GRAPH_DEL_TOOL.id, {
                                                                    cellId: cellId,
                                                                    toolname: item,
                                                                });
                                                            });
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); }));
                                            }
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
    GraphAddToolCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphAddToolCommand.prototype, "contextProvider", void 0);
    GraphAddToolCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphAddTool.command.id },
        })
        /** 创建节点命令 */
    ], GraphAddToolCommand);
    return GraphAddToolCommand;
}());
exports.GraphAddToolCommand = GraphAddToolCommand;
//# sourceMappingURL=graph-add-tool.js.map