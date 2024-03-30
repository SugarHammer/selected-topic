"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelNodeCommand = exports.NsDelNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var xflow_hook_1 = require("@antv/xflow-hook");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsDelNode;
(function (NsDelNode) {
    /** Command: 用于注册named factory */
    NsDelNode.command = constant_1.XFlowNodeCommands.DEL_NODE;
    /** hook name */
    NsDelNode.hookKey = 'delNode';
    /** 创建 hook */
    NsDelNode.createHook = function () {
        return new xflow_hook_1.HookHub();
    };
})(NsDelNode = exports.NsDelNode || (exports.NsDelNode = {}));
var DelNodeCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function DelNodeCommand() {
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
                        return [4 /*yield*/, hooks.delNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var commandService, deleteNodeService, options, graph, canDel, nodeId, nodeCell, edges, nodeConfig_1;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            commandService = handlerArgs.commandService, deleteNodeService = handlerArgs.deleteNodeService, options = handlerArgs.options;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            if (!deleteNodeService) return [3 /*break*/, 3];
                                            return [4 /*yield*/, deleteNodeService(handlerArgs)];
                                        case 2:
                                            canDel = _a.sent();
                                            if (!canDel)
                                                return [2 /*return*/, { err: ' service rejected' }];
                                            _a.label = 3;
                                        case 3:
                                            nodeId = (handlerArgs.x6Node || handlerArgs.nodeConfig).id;
                                            nodeCell = graph.getCellById(nodeId);
                                            if (!(nodeCell && nodeCell.isNode())) return [3 /*break*/, 5];
                                            edges = tslib_1.__spreadArray(tslib_1.__spreadArray([], (graph.getIncomingEdges(nodeCell) || []), true), (graph.getOutgoingEdges(nodeCell) || []), true);
                                            return [4 /*yield*/, Promise.all(edges.map(function (edge) {
                                                    return commandService.executeCommand(constant_1.XFlowEdgeCommands.DEL_EDGE.id, {
                                                        x6Edge: edge,
                                                    });
                                                }))
                                                /** 再清理节点 */
                                            ];
                                        case 4:
                                            _a.sent();
                                            nodeConfig_1 = nodeCell.getData();
                                            nodeCell.remove(tslib_1.__assign(tslib_1.__assign({}, options), { isCommand: true }));
                                            /** add undo: delete node */
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowNodeCommands.ADD_NODE.id, {
                                                                nodeConfig: nodeConfig_1,
                                                            })
                                                            // TODO: 支持线和节点的undo
                                                            // 通过 sequence mapping 出新的port id
                                                            // const nodeCtx = nodeCmd.contextProvider()
                                                            // const { nodeCell } = nodeCtx.getResult()
                                                            // edgeCmds.forEach(async cmd => {
                                                            //   const c = cmd.contextProvider()
                                                            //   const { edgeConfig } = c.getResult()
                                                            // })
                                                        ];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }));
                                            return [2 /*return*/, { err: null, nodeConfig: nodeConfig_1 }];
                                        case 5: return [2 /*return*/, { err: 'node is not exist' }];
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
                if (this.isUndoable()) {
                    ctx = this.contextProvider();
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
    DelNodeCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], DelNodeCommand.prototype, "contextProvider", void 0);
    DelNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsDelNode.command.id },
        })
        /** 创建节点命令 */
    ], DelNodeCommand);
    return DelNodeCommand;
}());
exports.DelNodeCommand = DelNodeCommand;
//# sourceMappingURL=node-del.js.map