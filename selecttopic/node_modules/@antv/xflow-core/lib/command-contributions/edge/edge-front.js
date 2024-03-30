"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontEdgeCommand = exports.NsFrontEdge = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsFrontEdge;
(function (NsFrontEdge) {
    NsFrontEdge.command = constant_1.XFlowEdgeCommands.FRONT_EDGE;
    NsFrontEdge.hookKey = 'frontEdge';
})(NsFrontEdge = exports.NsFrontEdge || (exports.NsFrontEdge = {}));
var FrontEdgeCommand = /** @class */ (function () {
    /** 边前置命令(始终在画布最前方) */
    function FrontEdgeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.frontEdge.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, edgeId, x6Edge;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            edgeId = handlerArgs.edgeId;
                                            x6Edge = x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.getCellById(edgeId);
                                            if (!x6Edge) {
                                                console.error(edgeId, 'this edgeId is not exist');
                                            }
                                            else {
                                                x6Edge.toFront();
                                                /** frontEdge undo */
                                                this.ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        handlerArgs.commandService.executeCommand(constant_1.XFlowEdgeCommands.BACK_EDGE.id, {
                                                            edgeId: edgeId,
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
    FrontEdgeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    FrontEdgeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], FrontEdgeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], FrontEdgeCommand.prototype, "init", null);
    FrontEdgeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsFrontEdge.command.id },
        })
        /** 边前置命令(始终在画布最前方) */
    ], FrontEdgeCommand);
    return FrontEdgeCommand;
}());
exports.FrontEdgeCommand = FrontEdgeCommand;
//# sourceMappingURL=edge-front.js.map