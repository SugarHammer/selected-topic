"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphPasteSelectionCommand = exports.NsGraphPasteSelection = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var constants_1 = require("../../constants");
var safe_json_1 = require("../../common/safe-json");
var mapping_service_1 = require("../mapping-service");
var NsGraphPasteSelection;
(function (NsGraphPasteSelection) {
    /** Command: 用于注册named factory */
    NsGraphPasteSelection.command = constant_1.XFlowGraphCommands.GRAPH_PASTE;
    /** hookName */
    NsGraphPasteSelection.hookKey = 'graphPasteSelection';
})(NsGraphPasteSelection = exports.NsGraphPasteSelection || (exports.NsGraphPasteSelection = {}));
function randomNumber(max, min) {
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min) + min);
}
var GraphPasteSelectionCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function GraphPasteSelectionCommand() {
        var _this = this;
        this.updateNodeCopiedProps = function (position, nodeConfig) {
            var dx = randomNumber(100);
            var dy = randomNumber(100);
            if (position) {
                dx = nodeConfig.x - position.x + randomNumber(30);
                dy = nodeConfig.y - position.y + randomNumber(30);
            }
            // 修改坐标
            nodeConfig.x += dx;
            nodeConfig.y += dy;
            // 删除 id
            nodeConfig.originId = nodeConfig.id;
            delete nodeConfig.id;
            // 修改label
            nodeConfig.label = "".concat(nodeConfig.label, "_copied");
            nodeConfig.isCollapsed = false;
            return nodeConfig;
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
                        if (GraphPasteSelectionCommand_1.doing) {
                            return [2 /*return*/, this];
                        }
                        GraphPasteSelectionCommand_1.doing = true;
                        return [4 /*yield*/, hooks.graphPasteSelection.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var commandService, position, jsonString, plainObject, _a, nodes, _b, edges, _c, normalNodes, groupNodes;
                                var _this = this;
                                return tslib_1.__generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            commandService = handlerArgs.commandService, position = handlerArgs.position;
                                            jsonString = window.localStorage.getItem(constants_1.LOCAL_STORAGE_KEY);
                                            plainObject = (0, safe_json_1.safeJson)(jsonString, {
                                                nodes: [],
                                                edges: [],
                                            });
                                            _a = plainObject.nodes, nodes = _a === void 0 ? [] : _a, _b = plainObject.edges, edges = _b === void 0 ? [] : _b;
                                            _c = this.mappingHelper.getNodesByType(nodes), normalNodes = _c.normalNodes, groupNodes = _c.groupNodes;
                                            this.mappingHelper.addNodes(nodes);
                                            // 添加普通节点
                                            return [4 /*yield*/, Promise.all(normalNodes.map(function (nodeConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var res, context, cmdResult;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowNodeCommands.ADD_NODE.id, {
                                                                    nodeConfig: this.updateNodeCopiedProps(position, nodeConfig),
                                                                })];
                                                            case 1:
                                                                res = _a.sent();
                                                                context = res.contextProvider();
                                                                cmdResult = context.getResult();
                                                                this.mappingHelper.buildNodeMapping(nodeConfig, cmdResult.nodeConfig);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))
                                                // 处理group
                                            ];
                                        case 1:
                                            // 添加普通节点
                                            _d.sent();
                                            // 处理group
                                            return [4 /*yield*/, Promise.all(groupNodes.map(function (group) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var groupNodeConfig;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                groupNodeConfig = this.mappingHelper.buildGroupRelations(group);
                                                                return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowGroupCommands.ADD_GROUP.id, {
                                                                        nodeConfig: this.updateNodeCopiedProps(position, groupNodeConfig),
                                                                    })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))
                                                // 处理连线
                                            ];
                                        case 2:
                                            // 处理group
                                            _d.sent();
                                            // 处理连线
                                            return [4 /*yield*/, Promise.all(edges.map(function (edgeConfig) {
                                                    var newEdge = _this.mappingHelper.createEdgeBetweenNodes(edgeConfig);
                                                    return commandService.executeCommand(constant_1.XFlowEdgeCommands.ADD_EDGE.id, {
                                                        edgeConfig: newEdge,
                                                    });
                                                }))];
                                        case 3:
                                            // 处理连线
                                            _d.sent();
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    window.localStorage.setItem(constants_1.LOCAL_STORAGE_KEY, null);
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
                        GraphPasteSelectionCommand_1.doing = false;
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
    GraphPasteSelectionCommand_1 = GraphPasteSelectionCommand;
    GraphPasteSelectionCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    var GraphPasteSelectionCommand_1;
    /** 防止多次执行 */
    GraphPasteSelectionCommand.doing = false;
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphPasteSelectionCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(mapping_service_1.GraphMappingHelper),
        tslib_1.__metadata("design:type", mapping_service_1.GraphMappingHelper)
    ], GraphPasteSelectionCommand.prototype, "mappingHelper", void 0);
    GraphPasteSelectionCommand = GraphPasteSelectionCommand_1 = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphPasteSelection.command.id },
        })
        /** 创建节点命令 */
    ], GraphPasteSelectionCommand);
    return GraphPasteSelectionCommand;
}());
exports.GraphPasteSelectionCommand = GraphPasteSelectionCommand;
//# sourceMappingURL=graph-paste.js.map