"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNodeCommand = exports.NsAddNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var context_1 = require("../components/context");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var constants_1 = require("../../constants");
var NsAddNode;
(function (NsAddNode) {
    /** Command: 用于注册named factory */
    NsAddNode.command = constant_1.XFlowNodeCommands.ADD_NODE;
    /** hookName */
    NsAddNode.hookKey = 'addNode';
})(NsAddNode = exports.NsAddNode || (exports.NsAddNode = {}));
var AddNodeCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function AddNodeCommand() {
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
                        return [4 /*yield*/, hooks.addNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var createNodeService, cellFactory, commandService, options, graph, rawNode, res, nodeConfig, x6NodeCell, eventOptions, cell;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            createNodeService = handlerArgs.createNodeService, cellFactory = handlerArgs.cellFactory, commandService = handlerArgs.commandService, options = handlerArgs.options;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            rawNode = handlerArgs.nodeConfig;
                                            if (!createNodeService) return [3 /*break*/, 3];
                                            return [4 /*yield*/, createNodeService(handlerArgs)];
                                        case 2:
                                            res = _a.sent();
                                            if (typeof res === 'boolean') {
                                                return [2 /*return*/, { err: 'createNodeService rejected' }];
                                            }
                                            rawNode = res;
                                            _a.label = 3;
                                        case 3: return [4 /*yield*/, this.processNodeConfig(rawNode)];
                                        case 4:
                                            nodeConfig = _a.sent();
                                            eventOptions = tslib_1.__assign(tslib_1.__assign({}, options), { isCommand: true });
                                            if (!cellFactory) return [3 /*break*/, 6];
                                            return [4 /*yield*/, cellFactory(nodeConfig, this)];
                                        case 5:
                                            cell = _a.sent();
                                            x6NodeCell = graph.addNode(cell, eventOptions);
                                            return [3 /*break*/, 7];
                                        case 6:
                                            x6NodeCell = graph.addNode(nodeConfig, eventOptions);
                                            _a.label = 7;
                                        case 7:
                                            /** add undo: delete node */
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var nodeData;
                                                return tslib_1.__generator(this, function (_a) {
                                                    nodeData = tslib_1.__assign({ id: x6NodeCell.id }, x6NodeCell.getData());
                                                    commandService.executeCommand(constant_1.XFlowNodeCommands.DEL_NODE.id, {
                                                        nodeConfig: nodeData,
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); }));
                                            return [2 /*return*/, { nodeConfig: nodeConfig, nodeCell: x6NodeCell }];
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
        this.processNodeConfig = function (nodeConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, graphConfig, reactComponent, commands, modelService;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = this.contextProvider();
                        /**
                         * 1. react shape node 逻辑
                         * 2. X6不会处理data数据, 仅透传。可以通过x6Node?.getData()方法获取这份数据
                         */
                        nodeConfig.data = tslib_1.__assign({}, nodeConfig);
                        /** 非 react shape */
                        if (nodeConfig.shape) {
                            return [2 /*return*/, nodeConfig];
                        }
                        if (!!nodeConfig.view) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.getGraphConfig()];
                    case 1:
                        graphConfig = _a.sent();
                        nodeConfig.view = graphConfig.graphId;
                        _a.label = 2;
                    case 2:
                        if (!!nodeConfig.component) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getNodeReactComponent(nodeConfig)];
                    case 3:
                        reactComponent = _a.sent();
                        commands = ctx.getCommands();
                        modelService = ctx.getModelService();
                        nodeConfig.shape = 'react-shape';
                        nodeConfig.component = (0, context_1.getNodeReactComponent)(reactComponent, commands, modelService);
                        _a.label = 4;
                    case 4: return [2 /*return*/, nodeConfig];
                }
            });
        }); };
        this.getNodeReactComponent = function (nodeConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, hooks, graphConfig, renderMap, renderKey, reactComponent;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = this.contextProvider();
                        hooks = ctx.getHooks();
                        return [4 /*yield*/, ctx.getGraphConfig()
                            /** 通过hooks获取更多的组件 */
                        ];
                    case 1:
                        graphConfig = _a.sent();
                        return [4 /*yield*/, hooks.reactNodeRender.call(graphConfig.nodeRender)
                            /** 获取renderKey，没有renderKey时使用默认Key */
                        ];
                    case 2:
                        renderMap = _a.sent();
                        renderKey = graphConfig.nodeTypeParser(nodeConfig) || constants_1.XFLOW_DEFAULT_NODE;
                        reactComponent = renderMap.get(renderKey);
                        if (!reactComponent) {
                            console.error('react node component is missing:', graphConfig.nodeRender, renderKey, reactComponent);
                        }
                        return [2 /*return*/, reactComponent];
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
    AddNodeCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], AddNodeCommand.prototype, "contextProvider", void 0);
    AddNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsAddNode.command.id },
        })
        /** 创建节点命令 */
    ], AddNodeCommand);
    return AddNodeCommand;
}());
exports.AddNodeCommand = AddNodeCommand;
//# sourceMappingURL=node-add.js.map