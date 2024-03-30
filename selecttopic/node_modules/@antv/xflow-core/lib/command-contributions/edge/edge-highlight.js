"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightEdgeCommand = exports.NsHighlightEdge = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsHighlightEdge;
(function (NsHighlightEdge) {
    NsHighlightEdge.command = constant_1.XFlowEdgeCommands.HIGHLIGHT_EDGE;
    NsHighlightEdge.hookKey = 'highlightEdge';
})(NsHighlightEdge = exports.NsHighlightEdge || (exports.NsHighlightEdge = {}));
var HighlightEdgeCommand = /** @class */ (function () {
    /** 连线高亮 */
    function HighlightEdgeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.highlightEdge.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, edgeId, strokeColor, strokeWidth, allEdges, highlightEdge, otherEdges, oldAttr_1;
                                var _a, _b;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _c.sent();
                                            edgeId = handlerArgs.edgeId, strokeColor = handlerArgs.strokeColor, strokeWidth = handlerArgs.strokeWidth;
                                            allEdges = x6Graph.getEdges();
                                            highlightEdge = allEdges.find(function (edge) { return edge.id === edgeId; });
                                            otherEdges = allEdges.filter(function (edge) { return edge.id !== edgeId; });
                                            if (!highlightEdge) {
                                                console.error(edgeId, 'this edgeId is not exist');
                                            }
                                            else {
                                                oldAttr_1 = highlightEdge.getAttrs();
                                                if (((_a = oldAttr_1 === null || oldAttr_1 === void 0 ? void 0 : oldAttr_1.line) === null || _a === void 0 ? void 0 : _a.stroke) === strokeColor && ((_b = oldAttr_1 === null || oldAttr_1 === void 0 ? void 0 : oldAttr_1.line) === null || _b === void 0 ? void 0 : _b.strokeWidth) === strokeWidth) {
                                                    /** 连线已经高亮, 不需要重复操作 */
                                                }
                                                else {
                                                    /** 高亮选中的连线 */
                                                    highlightEdge === null || highlightEdge === void 0 ? void 0 : highlightEdge.setAttrs({
                                                        line: {
                                                            stroke: strokeColor,
                                                            strokeWidth: strokeWidth || 2,
                                                        },
                                                    });
                                                    /** 其余连线取消高亮状态 */
                                                    otherEdges.forEach(function (edge) {
                                                        edge.setAttrs({
                                                            line: oldAttr_1 === null || oldAttr_1 === void 0 ? void 0 : oldAttr_1.line,
                                                        });
                                                    });
                                                    /** 高亮的连线默认前置在画布最前方 */
                                                    handlerArgs.commandService.executeCommand(constant_1.XFlowEdgeCommands.FRONT_EDGE.id, {
                                                        edgeId: edgeId,
                                                    });
                                                }
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
    HighlightEdgeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    HighlightEdgeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], HighlightEdgeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], HighlightEdgeCommand.prototype, "init", null);
    HighlightEdgeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsHighlightEdge.command.id },
        })
        /** 连线高亮 */
    ], HighlightEdgeCommand);
    return HighlightEdgeCommand;
}());
exports.HighlightEdgeCommand = HighlightEdgeCommand;
//# sourceMappingURL=edge-highlight.js.map