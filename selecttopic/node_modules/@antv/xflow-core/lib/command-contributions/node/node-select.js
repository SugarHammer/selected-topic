"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectNodeCommand = exports.NsSelectNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsSelectNode;
(function (NsSelectNode) {
    NsSelectNode.command = constant_1.XFlowNodeCommands.SELECT_NODE;
    NsSelectNode.hookKey = 'selectNode';
})(NsSelectNode = exports.NsSelectNode || (exports.NsSelectNode = {}));
var SelectNodeCommand = /** @class */ (function () {
    /** 节点更新命令 */
    function SelectNodeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.selectNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, currentSelectionIds, nodeIds, resetSelection, commandService;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            currentSelectionIds = x6Graph.getSelectedCells().map(function (node) { return node.id; });
                                            nodeIds = handlerArgs.nodeIds, resetSelection = handlerArgs.resetSelection, commandService = handlerArgs.commandService;
                                            if (resetSelection) {
                                                x6Graph.resetSelection(nodeIds);
                                            }
                                            else {
                                                x6Graph.select(nodeIds);
                                            }
                                            this.ctx.addUndo({
                                                dispose: function () {
                                                    commandService.executeUndoCommand(constant_1.XFlowNodeCommands.SELECT_NODE.id, {
                                                        nodeIds: currentSelectionIds,
                                                        resetSelection: true,
                                                    });
                                                },
                                            });
                                            return [2 /*return*/, {}];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 1:
                        result = _b.sent();
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
    SelectNodeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    SelectNodeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], SelectNodeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], SelectNodeCommand.prototype, "init", null);
    SelectNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsSelectNode.command.id },
        })
        /** 节点更新命令 */
    ], SelectNodeCommand);
    return SelectNodeCommand;
}());
exports.SelectNodeCommand = SelectNodeCommand;
//# sourceMappingURL=node-select.js.map