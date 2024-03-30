"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightNodeCommand = exports.NsHighlightNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsHighlightNode;
(function (NsHighlightNode) {
    NsHighlightNode.command = constant_1.XFlowNodeCommands.HIGHLIGHT_NODE;
    NsHighlightNode.hookKey = 'highlightNode';
})(NsHighlightNode = exports.NsHighlightNode || (exports.NsHighlightNode = {}));
var HighlightNodeCommand = /** @class */ (function () {
    /** 节点高亮 */
    function HighlightNodeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.highlightNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, nodeId, stroke, strokeWidth, x6Node, edgeStroke_1, edgeStrokeWidth_1, allEdges;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            nodeId = handlerArgs.nodeId, stroke = handlerArgs.stroke, strokeWidth = handlerArgs.strokeWidth;
                                            x6Node = x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.getCellById(nodeId);
                                            if (!x6Node) {
                                                console.error(nodeId, 'this nodeId is not exist');
                                                return [2 /*return*/, { err: 'this nodeId is not exist' }];
                                            }
                                            else {
                                                /** 高亮节点 */
                                                x6Node === null || x6Node === void 0 ? void 0 : x6Node.setAttrs({
                                                    body: {
                                                        stroke: stroke || '#7c68fc',
                                                        strokeWidth: strokeWidth || 2,
                                                    },
                                                });
                                                /** 节点关联的连线, 联动高亮 */
                                                if (handlerArgs === null || handlerArgs === void 0 ? void 0 : handlerArgs.isHighlightRelatedLines) {
                                                    edgeStroke_1 = handlerArgs.edgeStroke, edgeStrokeWidth_1 = handlerArgs.edgeStrokeWidth;
                                                    allEdges = x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.getEdges();
                                                    allEdges.forEach(function (x6Edge) {
                                                        var x6EdgeData = x6Edge === null || x6Edge === void 0 ? void 0 : x6Edge.getData();
                                                        handlerArgs === null || handlerArgs === void 0 ? void 0 : handlerArgs.commandService.executeCommand(constant_1.XFlowEdgeCommands.HIGHLIGHT_EDGE.id, {
                                                            edgeId: x6EdgeData === null || x6EdgeData === void 0 ? void 0 : x6EdgeData.id,
                                                            strokeColor: edgeStroke_1,
                                                            strokeWidth: edgeStrokeWidth_1,
                                                        });
                                                    });
                                                }
                                            }
                                            return [2 /*return*/, { err: null }];
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
    HighlightNodeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    HighlightNodeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], HighlightNodeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], HighlightNodeCommand.prototype, "init", null);
    HighlightNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsHighlightNode.command.id },
        })
        /** 节点高亮 */
    ], HighlightNodeCommand);
    return HighlightNodeCommand;
}());
exports.HighlightNodeCommand = HighlightNodeCommand;
//# sourceMappingURL=node-highlight.js.map