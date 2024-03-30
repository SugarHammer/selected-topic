"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCopySelectionCommand = exports.NsGraphCopySelection = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var graph_utils_1 = require("../../common/graph-utils");
var constants_1 = require("../../constants");
var NsGraphCopySelection;
(function (NsGraphCopySelection) {
    /** Command: 用于注册named factory */
    NsGraphCopySelection.command = constant_1.XFlowGraphCommands.GRAPH_COPY;
    /** hookName */
    NsGraphCopySelection.hookKey = 'graphCopySelection';
})(NsGraphCopySelection = exports.NsGraphCopySelection || (exports.NsGraphCopySelection = {}));
var GraphCopySelectionCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function GraphCopySelectionCommand() {
        var _this = this;
        this.parseCells = function (cells) {
            // if groupNode add its group children
            cells.forEach(function (cell) {
                var data = cell.getData();
                if (cell.isNode() && data.isGroup) {
                    var children = cell.getChildren();
                    children.forEach(function (child) {
                        cells.push(child);
                    });
                }
            });
            // filter edges target not in selections
            var nodeIds = cells.filter(function (cell) { return cell.isNode(); }).map(function (cell) { return cell.id; });
            var map = cells.reduce(function (acc, cell) {
                if (cell.isEdge()) {
                    var source = cell.getSourceCellId();
                    var target = cell.getTargetCellId();
                    if (source && target) {
                        if (nodeIds.includes(source) && nodeIds.includes(target)) {
                            acc.set(cell.id, cell);
                        }
                    }
                }
                else {
                    acc.set(cell.id, cell);
                }
                return acc;
            }, new Map());
            var uniqeList = Array.from(map.values());
            return (0, graph_utils_1.cellsToJson)(uniqeList);
        };
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
                        return [4 /*yield*/, hooks.graphCopySelection.call(args, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graph, cells, jsonObject, oldJsonString;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            cells = graph.getSelectedCells();
                                            jsonObject = this.parseCells(cells);
                                            oldJsonString = window.localStorage.getItem(constants_1.LOCAL_STORAGE_KEY);
                                            // 写cache
                                            window.localStorage.setItem(constants_1.LOCAL_STORAGE_KEY, JSON.stringify(jsonObject));
                                            // undo 写cache
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    window.localStorage.setItem(constants_1.LOCAL_STORAGE_KEY, oldJsonString);
                                                    return [2 /*return*/];
                                                });
                                            }); }));
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
    GraphCopySelectionCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphCopySelectionCommand.prototype, "contextProvider", void 0);
    GraphCopySelectionCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphCopySelection.command.id },
        })
        /** 创建节点命令 */
    ], GraphCopySelectionCommand);
    return GraphCopySelectionCommand;
}());
exports.GraphCopySelectionCommand = GraphCopySelectionCommand;
//# sourceMappingURL=graph-copy.js.map