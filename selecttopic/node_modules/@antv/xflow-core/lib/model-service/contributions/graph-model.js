"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphModelContribution = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../interface");
var disposable_1 = require("../../common/disposable");
var event_helper_1 = require("../../common/event-helper");
var graph_provider_1 = require("../../xflow-main/graph/graph-provider");
var MODELS = tslib_1.__importStar(require("../constant"));
var GraphModelContribution = /** @class */ (function () {
    function GraphModelContribution() {
        var _this = this;
        /** 获取画布实例 */
        this.getGraphInstance = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graphInstance, graphConfig;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graphInstance = _a.sent();
                        return [4 /*yield*/, this.graphProvider.getGraphOptions()];
                    case 2:
                        graphConfig = _a.sent();
                        return [2 /*return*/, { graph: graphInstance, config: graphConfig }];
                }
            });
        }); };
    }
    GraphModelContribution.prototype.registerModel = function (registry) {
        var _this = this;
        /** X6 GRAPH META */
        registry.registerModel({
            id: MODELS.GRAPH_META.id,
            getInitialValue: function () { return ({
                flowId: '-1',
            }); },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, disposable_1.Disposable.create(function () {
                            self.setValue({ flowId: '-1' });
                        })];
                });
            }); },
        });
        /** Graph 多选状态 */
        registry.registerModel({
            id: MODELS.GRAPH_ENABLE_MULTI_SELECT.id,
            getInitialValue: function () { return ({
                isEnable: false,
            }); },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, disposable_1.Disposable.create(function () {
                            self.setValue({ isEnable: false });
                        })];
                });
            }); },
        });
        /** Graph 全屏 */
        registry.registerModel({
            id: MODELS.GRAPH_FULLSCREEN.id,
            getInitialValue: function () { return false; },
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var handleFullScreenChange;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    handleFullScreenChange = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var fullscreen, fullscreenModel;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fullscreen = !!document.fullscreenElement;
                                    return [4 /*yield*/, MODELS.GRAPH_FULLSCREEN.getModel(modelService)];
                                case 1:
                                    fullscreenModel = _a.sent();
                                    fullscreenModel.setValue(fullscreen);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    document.addEventListener('fullscreenchange', handleFullScreenChange, false);
                    return [2 /*return*/, disposable_1.Disposable.create(function () {
                            document.removeEventListener('fullscreenchange', handleFullScreenChange);
                            self.setValue(false);
                        })];
                });
            }); },
        });
        /** 选中Cells状态 */
        registry.registerModel({
            id: MODELS.SELECTED_CELLS.id,
            getInitialValue: function () { return []; },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var graph, onChange;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            graph = (_a.sent()).graph;
                            onChange = function (e) {
                                var selected = e.selected;
                                self.setValue(selected);
                            };
                            graph.on('selection:changed', onChange);
                            return [2 /*return*/, disposable_1.Disposable.create(function () { return graph.off('selection:changed', onChange); })];
                    }
                });
            }); },
        });
        /** 选中Cell状态 */
        registry.registerModel({
            id: MODELS.SELECTED_CELL.id,
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var cellsModel;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_CELLS.getModel(modelService)];
                        case 1:
                            cellsModel = _a.sent();
                            return [2 /*return*/, cellsModel.watch(function (cells) {
                                    if (cells === void 0) { cells = []; }
                                    self.setValue(tslib_1.__spreadArray([], cells, true).pop() || null);
                                })];
                    }
                });
            }); },
        });
        /** 选中节点列表状态 */
        registry.registerModel({
            id: MODELS.SELECTED_NODES.id,
            getInitialValue: function () { return []; },
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_CELLS.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            return [2 /*return*/, model.watch(function (cells) {
                                    if (cells === void 0) { cells = []; }
                                    var nodes = cells.filter(function (cell) { return cell.isNode(); });
                                    self.setValue(nodes);
                                })];
                    }
                });
            }); },
        });
        /** 选中节点状态 */
        registry.registerModel({
            id: MODELS.SELECTED_NODE.id,
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model, disposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_NODES.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            disposable = model.watch(function (nodes) {
                                self.setValue(tslib_1.__spreadArray([], nodes, true).pop() || null);
                            });
                            return [2 /*return*/, disposable];
                    }
                });
            }); },
        });
        /** 是否选中节点状态 */
        registry.registerModel({
            id: MODELS.IS_NODE_SELECTED.id,
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model, disposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_NODES.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            disposable = model.watch(function (nodes) {
                                self.setValue(nodes.length > 0);
                            });
                            return [2 /*return*/, disposable];
                    }
                });
            }); },
        });
        /** 画布选中节点是否是Group */
        registry.registerModel({
            id: MODELS.IS_GROUP_SELECTED.id,
            getInitialValue: function () { return false; },
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model, disposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_CELLS.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            disposable = model.watch(function (cells) {
                                var isGroup = cells.every(function (cell) {
                                    return cell && cell.getProp('isGroup') === true;
                                });
                                self.setValue(isGroup);
                            });
                            return [2 /*return*/, disposable];
                    }
                });
            }); },
        });
        /** 画布选中节点是否是Group */
        registry.registerModel({
            id: MODELS.SELECTED_GROUPS.id,
            getInitialValue: function () { return []; },
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model, disposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_NODES.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            disposable = model.watch(function (cells) {
                                var groups = cells.filter(function (cell) {
                                    return cell && cell.getProp('isGroup') === true;
                                });
                                self.setValue(groups);
                            });
                            return [2 /*return*/, disposable];
                    }
                });
            }); },
        });
        /** 画布选中节点是否是普通节点 */
        registry.registerModel({
            id: MODELS.IS_NORMAL_NODES_SELECTED.id,
            getInitialValue: function () { return false; },
            watchChange: function (self, modelService) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var model, disposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MODELS.SELECTED_CELLS.getModel(modelService)];
                        case 1:
                            model = _a.sent();
                            disposable = model.watch(function (cells) {
                                var isNormalNodesSelected = cells.every(function (cell) {
                                    var isNotGroup = !(cell && cell.getProp('isGroup'));
                                    var isNotGroupChild = !(cell && cell.getProp('group'));
                                    return isNotGroup && isNotGroupChild;
                                });
                                var isNodeSelected = cells.length > 0 && isNormalNodesSelected;
                                self.setValue(isNodeSelected);
                            });
                            return [2 /*return*/, disposable];
                    }
                });
            }); },
        });
        /** 画布缩放状态 */
        registry.registerModel({
            id: MODELS.GRAPH_SCALE.id,
            getInitialValue: function () { return ({ zoomFactor: -1 }); },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var graph, onChange;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            graph = (_a.sent()).graph;
                            onChange = function (e) {
                                var factor = graph.zoom();
                                self.setValue(tslib_1.__assign(tslib_1.__assign({}, e), { zoomFactor: factor }));
                            };
                            graph.on('scale', onChange);
                            return [2 /*return*/, disposable_1.Disposable.create(function () { return graph.off('scale', onChange); })];
                    }
                });
            }); },
        });
        /** 画布右键菜单状态 */
        registry.registerModel({
            id: MODELS.CONTEXTMENU_TARGET.id,
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, graph, config, onContextMenu, toDispose;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            _a = _b.sent(), graph = _a.graph, config = _a.config;
                            onContextMenu = function (type) {
                                return function (e) {
                                    var x = e.x, y = e.y;
                                    var pagePoint = graph.localToClient({ x: x, y: y });
                                    var clientRect = config.rootContainer.getBoundingClientRect();
                                    var anchor = {
                                        x: pagePoint.x - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.x) || 0),
                                        y: pagePoint.y - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) || 0),
                                    };
                                    self.setValue({
                                        type: type,
                                        anchor: anchor,
                                        data: e,
                                        cell: e.cell,
                                    });
                                };
                            };
                            toDispose = new disposable_1.DisposableCollection();
                            toDispose.pushAll([
                                (0, event_helper_1.disposableSubscribe)(graph, 'node:contextmenu', onContextMenu('node')),
                                (0, event_helper_1.disposableSubscribe)(graph, 'edge:contextmenu', onContextMenu('edge')),
                                (0, event_helper_1.disposableSubscribe)(graph, 'blank:contextmenu', onContextMenu('blank')),
                            ]);
                            return [2 /*return*/, toDispose];
                    }
                });
            }); },
        });
        /** 画布历史Redo */
        registry.registerModel({
            id: MODELS.HISTORY_REDOABLE.id,
            getInitialValue: function () { return false; },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var graph, onChange;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            graph = (_a.sent()).graph;
                            onChange = function () {
                                var canRedo = graph.history.canRedo();
                                self.setValue(canRedo);
                            };
                            if (graph.history) {
                                graph.history.on('change', onChange);
                            }
                            return [2 /*return*/, disposable_1.Disposable.create(function () { return graph.history.off('change', onChange); })];
                    }
                });
            }); },
        });
        /** 画布历史undo */
        registry.registerModel({
            id: MODELS.HISTORY_UNDOABLE.id,
            getInitialValue: function () { return false; },
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var graph, onChange;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            graph = (_a.sent()).graph;
                            onChange = function () {
                                var canUndo = graph.history.canUndo();
                                self.setValue(canUndo);
                            };
                            if (graph.history) {
                                graph.history.on('change', onChange);
                            }
                            return [2 /*return*/, disposable_1.Disposable.create(function () { return graph.history.off('change', onChange); })];
                    }
                });
            }); },
        });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(graph_provider_1.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphModelContribution.prototype, "graphProvider", void 0);
    GraphModelContribution = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: interface_1.IModelContribution })
    ], GraphModelContribution);
    return GraphModelContribution;
}());
exports.GraphModelContribution = GraphModelContribution;
//# sourceMappingURL=graph-model.js.map