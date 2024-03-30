"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackNodeCommand = exports.NsBackNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsBackNode;
(function (NsBackNode) {
    /** command */
    NsBackNode.command = constant_1.XFlowNodeCommands.BACK_NODE;
    /** hook key */
    NsBackNode.hookKey = 'backNode';
})(NsBackNode = exports.NsBackNode || (exports.NsBackNode = {}));
var BackNodeCommand = /** @class */ (function () {
    /** 节点前置命令(始终在画布最前方) */
    function BackNodeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.backNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, nodeId, x6Node;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            nodeId = handlerArgs.nodeId;
                                            x6Node = x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.getCellById(nodeId);
                                            if (!x6Node) {
                                                console.error(nodeId, 'this nodeId is not exist');
                                            }
                                            else {
                                                x6Node.toBack();
                                                /** backNode undo */
                                                this.ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        handlerArgs.commandService.executeCommand(constant_1.XFlowNodeCommands.FRONT_NODE.id, {
                                                            nodeId: nodeId,
                                                        });
                                                        return [2 /*return*/];
                                                    });
                                                }); }));
                                            }
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
    BackNodeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    BackNodeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], BackNodeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], BackNodeCommand.prototype, "init", null);
    BackNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsBackNode.command.id },
        })
        /** 节点前置命令(始终在画布最前方) */
    ], BackNodeCommand);
    return BackNodeCommand;
}());
exports.BackNodeCommand = BackNodeCommand;
//# sourceMappingURL=node-back.js.map