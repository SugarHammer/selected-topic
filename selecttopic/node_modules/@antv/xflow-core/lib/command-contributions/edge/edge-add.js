"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEdgeCommand = exports.NsAddEdge = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var x6_1 = require("@antv/x6");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsAddEdge;
(function (NsAddEdge) {
    /** Command: 用于注册named factory */
    NsAddEdge.command = constant_1.XFlowEdgeCommands.ADD_EDGE;
    /** hookName */
    NsAddEdge.hookKey = 'addEdge';
    /** edge id 类型 */
    NsAddEdge.createEdgeId = function (edge) {
        if (x6_1.StringExt.isString(edge.source)) {
            return "".concat(edge.source, ":").concat(edge.sourcePortId, "-").concat(edge.target, ":").concat(edge.targetPortId);
        }
        if (isX6EdgeConfig(edge)) {
            var x6EdgeConfig = edge;
            return "".concat(x6EdgeConfig.source.cell, ":").concat(x6EdgeConfig.source.port, "-").concat(x6EdgeConfig.target.cell, ":").concat(x6EdgeConfig.target.port);
        }
        if (isX6EdgePlainConfig(edge)) {
            var x6EdgeConfig = edge;
            return "".concat(x6EdgeConfig.sourceCell, ":").concat(x6EdgeConfig.sourcePort, "-").concat(x6EdgeConfig.targetCell, ":").concat(x6EdgeConfig.targetPort);
        }
    };
    function isX6EdgeConfig(edge) {
        return edge.source && edge.source.cell && x6_1.StringExt.isString(edge.source.cell);
    }
    NsAddEdge.isX6EdgeConfig = isX6EdgeConfig;
    function isX6EdgePlainConfig(edge) {
        return edge.sourceCell && x6_1.StringExt.isString(edge.sourceCell);
    }
    NsAddEdge.isX6EdgePlainConfig = isX6EdgePlainConfig;
})(NsAddEdge = exports.NsAddEdge || (exports.NsAddEdge = {}));
var AddEdgeCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function AddEdgeCommand() {
        var _this = this;
        /** 处理edgeConfig的兜底逻辑 */
        this.processEdgeConfig = function (args, edge) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, createIdService, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!edge.id) return [3 /*break*/, 2];
                        _a = args.createIdService, createIdService = _a === void 0 ? NsAddEdge.createEdgeId : _a;
                        _b = edge;
                        return [4 /*yield*/, createIdService(edge)];
                    case 1:
                        _b.id = _c.sent();
                        _c.label = 2;
                    case 2:
                        /** 处理xflow edge 和x6 edge的字段差异  */
                        if (edge.sourcePortId && !edge.sourcePort) {
                            edge.sourcePort = edge.sourcePortId;
                            edge.targetPort = edge.targetPortId;
                        }
                        return [2 /*return*/, edge];
                }
            });
        }); };
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.addEdge.call(
                            /** 执行 hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var cellFactory, createEdgeService, commandService, options, graph, rawEdge, res, edgeConfig, edgeCell, eventOptions, cell, undo;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            cellFactory = handlerArgs.cellFactory, createEdgeService = handlerArgs.createEdgeService, commandService = handlerArgs.commandService, options = handlerArgs.options;
                                            return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            rawEdge = handlerArgs.edgeConfig;
                                            if (!createEdgeService) return [3 /*break*/, 3];
                                            return [4 /*yield*/, createEdgeService(handlerArgs)];
                                        case 2:
                                            res = _a.sent();
                                            if (typeof res === 'boolean') {
                                                return [2 /*return*/, { err: 'createEdgeService rejected' }];
                                            }
                                            rawEdge = res;
                                            _a.label = 3;
                                        case 3: return [4 /*yield*/, this.processEdgeConfig(handlerArgs, rawEdge)];
                                        case 4:
                                            edgeConfig = _a.sent();
                                            eventOptions = tslib_1.__assign(tslib_1.__assign({}, options), { isCommand: true });
                                            if (!cellFactory) return [3 /*break*/, 6];
                                            return [4 /*yield*/, cellFactory(edgeConfig, this)];
                                        case 5:
                                            cell = _a.sent();
                                            edgeCell = graph.addEdge(cell, eventOptions);
                                            return [3 /*break*/, 7];
                                        case 6:
                                            edgeCell = graph.addEdge(tslib_1.__assign(tslib_1.__assign({}, edgeConfig), { 
                                                /** 由于X6的实现是React节点挂在label上的, 所以必须要给label设置值 */
                                                label: (edgeConfig === null || edgeConfig === void 0 ? void 0 : edgeConfig.label) || edgeConfig, data: tslib_1.__assign({}, edgeConfig) }), eventOptions);
                                            _a.label = 7;
                                        case 7:
                                            undo = disposable_1.Disposable.create(function () {
                                                commandService.executeCommand(constant_1.XFlowEdgeCommands.DEL_EDGE.id, {
                                                    x6Edge: edgeCell,
                                                });
                                            });
                                            /** add undo */
                                            this.ctx.addUndo(undo);
                                            return [2 /*return*/, { edgeConfig: edgeConfig, edgeCell: edgeCell }];
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
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
        this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isUndoable) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        }); };
    }
    AddEdgeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    AddEdgeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], AddEdgeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], AddEdgeCommand.prototype, "init", null);
    AddEdgeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsAddEdge.command.id },
        })
        /** 创建节点命令 */
    ], AddEdgeCommand);
    return AddEdgeCommand;
}());
exports.AddEdgeCommand = AddEdgeCommand;
//# sourceMappingURL=edge-add.js.map