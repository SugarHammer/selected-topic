var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createToolbarConfig, uuidv4, XFlowGroupCommands, XFlowNodeCommands, XFlowGraphCommands, IconStore, MODELS, } from '@antv/xflow';
import { getProps, Log, getGraphHistory, getGraphInstance } from '../../util';
import { UngroupOutlined, SaveOutlined, GroupOutlined, GatewayOutlined, UndoOutlined, RedoOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, CopyOutlined, SnippetsOutlined, } from '@ant-design/icons';
import { CommandPool } from './constants';
export var TOOLBAR_ITEMS;
(function (TOOLBAR_ITEMS) {
    TOOLBAR_ITEMS.BACK_NODE = XFlowNodeCommands.BACK_NODE.id;
    TOOLBAR_ITEMS.FRONT_NODE = XFlowNodeCommands.FRONT_NODE.id;
    TOOLBAR_ITEMS.SAVE_GRAPH_DATA = XFlowGraphCommands.SAVE_GRAPH_DATA.id;
    TOOLBAR_ITEMS.REDO_CMD = "".concat(XFlowGraphCommands.REDO_CMD.id);
    TOOLBAR_ITEMS.UNDO_CMD = "".concat(XFlowGraphCommands.UNDO_CMD.id);
    TOOLBAR_ITEMS.MULTI_SELECT = "".concat(XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id);
    TOOLBAR_ITEMS.ADD_GROUP = "".concat(XFlowGroupCommands.ADD_GROUP.id);
    TOOLBAR_ITEMS.DEL_GROUP = "".concat(XFlowGroupCommands.DEL_GROUP.id);
    TOOLBAR_ITEMS.COPY = "".concat(XFlowGraphCommands.GRAPH_COPY.id);
    TOOLBAR_ITEMS.PASTE = "".concat(XFlowGraphCommands.GRAPH_PASTE.id);
})(TOOLBAR_ITEMS || (TOOLBAR_ITEMS = {}));
var NSToolbarConfig;
(function (NSToolbarConfig) {
    var _this = this;
    NSToolbarConfig.getDependencies = function (modelService) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, MODELS.SELECTED_NODES.getModel(modelService)];
                case 1:
                    _a = [
                        _b.sent()
                    ];
                    return [4 /*yield*/, MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService)];
                case 2: return [2 /*return*/, _a.concat([
                        _b.sent()
                    ])];
            }
        });
    }); };
    /** toolbar依赖的状态 */
    NSToolbarConfig.getToolbarState = function (modelService) { return __awaiter(_this, void 0, void 0, function () {
        var isMultiSelctionActive, isGroupSelected, isNormalNodesSelected, isUndoable, isRedoable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MODELS.GRAPH_ENABLE_MULTI_SELECT.useValue(modelService)];
                case 1:
                    isMultiSelctionActive = (_a.sent()).isEnable;
                    return [4 /*yield*/, MODELS.IS_GROUP_SELECTED.useValue(modelService)];
                case 2:
                    isGroupSelected = _a.sent();
                    return [4 /*yield*/, MODELS.IS_NORMAL_NODES_SELECTED.useValue(modelService)];
                case 3:
                    isNormalNodesSelected = _a.sent();
                    return [4 /*yield*/, MODELS.COMMAND_UNDOABLE.useValue(modelService)];
                case 4:
                    isUndoable = _a.sent();
                    return [4 /*yield*/, MODELS.COMMAND_REDOABLE.useValue(modelService)];
                case 5:
                    isRedoable = _a.sent();
                    return [2 /*return*/, {
                            isUndoable: isUndoable,
                            isRedoable: isRedoable,
                            isNodeSelected: isNormalNodesSelected,
                            isGroupSelected: isGroupSelected,
                            isMultiSelctionActive: isMultiSelctionActive,
                        }];
            }
        });
    }); };
    NSToolbarConfig.getToolbarItems = function (state, getIconConfig, commands, flowchartId) { return __awaiter(_this, void 0, void 0, function () {
        var toolbarGroup, history, graph, selectedCells;
        var _this = this;
        return __generator(this, function (_a) {
            toolbarGroup = [];
            history = getGraphHistory(flowchartId);
            graph = getGraphInstance(flowchartId);
            selectedCells = graph.getSelectedCells();
            /** 撤销 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.UNDO_CMD)), { id: TOOLBAR_ITEMS.UNDO_CMD, isEnabled: history.canUndo(), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        history.undo();
                        return [2 /*return*/];
                    });
                }); } }));
            /** 重做 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.REDO_CMD)), { id: TOOLBAR_ITEMS.REDO_CMD, isEnabled: history.canRedo(), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        history.redo();
                        return [2 /*return*/];
                    });
                }); } }));
            /** FRONT_NODE */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.FRONT_NODE)), { id: TOOLBAR_ITEMS.FRONT_NODE, isEnabled: state.isNodeSelected, onClick: function (_a) {
                    var commandService = _a.commandService, modelService = _a.modelService;
                    return __awaiter(_this, void 0, void 0, function () {
                        var node;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, MODELS.SELECTED_NODE.useValue(modelService)];
                                case 1:
                                    node = _b.sent();
                                    commandService.executeCommand(TOOLBAR_ITEMS.FRONT_NODE, {
                                        nodeId: node === null || node === void 0 ? void 0 : node.id,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }));
            /** BACK_NODE */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.BACK_NODE)), { id: TOOLBAR_ITEMS.BACK_NODE, isEnabled: state.isNodeSelected, onClick: function (_a) {
                    var commandService = _a.commandService, modelService = _a.modelService;
                    return __awaiter(_this, void 0, void 0, function () {
                        var node;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, MODELS.SELECTED_NODE.useValue(modelService)];
                                case 1:
                                    node = _b.sent();
                                    commandService.executeCommand(TOOLBAR_ITEMS.BACK_NODE, {
                                        nodeId: node === null || node === void 0 ? void 0 : node.id,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }));
            /** 开启框选 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.MULTI_SELECT)), { id: TOOLBAR_ITEMS.MULTI_SELECT, active: state.isMultiSelctionActive, onClick: function (_a) {
                    var commandService = _a.commandService;
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            commandService.executeCommand(TOOLBAR_ITEMS.MULTI_SELECT, {});
                            return [2 /*return*/];
                        });
                    });
                } }));
            /** 新建群组 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.ADD_GROUP)), { id: TOOLBAR_ITEMS.ADD_GROUP, isEnabled: state.isNodeSelected, onClick: function (_a) {
                    var commandService = _a.commandService, modelService = _a.modelService;
                    return __awaiter(_this, void 0, void 0, function () {
                        var cells, groupChildren;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, MODELS.SELECTED_CELLS.useValue(modelService)];
                                case 1:
                                    cells = _b.sent();
                                    groupChildren = cells.map(function (cell) { return cell.id; });
                                    commandService.executeCommand(TOOLBAR_ITEMS.ADD_GROUP, {
                                        nodeConfig: {
                                            id: uuidv4(),
                                            renderKey: 'GROUP_NODE_RENDER_ID',
                                            groupChildren: groupChildren,
                                            groupCollapsedSize: { width: 200, height: 40 },
                                            label: '新建群组',
                                        },
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }));
            /** 解散群组 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.DEL_GROUP)), { id: TOOLBAR_ITEMS.DEL_GROUP, isEnabled: state.isGroupSelected, onClick: function (_a) {
                    var commandService = _a.commandService, modelService = _a.modelService;
                    return __awaiter(_this, void 0, void 0, function () {
                        var cell, nodeConfig;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, MODELS.SELECTED_NODE.useValue(modelService)];
                                case 1:
                                    cell = _b.sent();
                                    nodeConfig = cell.getData();
                                    commandService.executeCommand(XFlowGroupCommands.DEL_GROUP.id, {
                                        nodeConfig: nodeConfig,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }));
            /** copy */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.COPY)), { id: TOOLBAR_ITEMS.COPY, isEnabled: !!(selectedCells === null || selectedCells === void 0 ? void 0 : selectedCells.length), onClick: function (_a) {
                    var commandService = _a.commandService;
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_COPY.id, {});
                            return [2 /*return*/];
                        });
                    });
                } }));
            /** paste */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.PASTE)), { id: CommandPool.PASTE, isEnabled: true, onClick: function (_a) {
                    var commandService = _a.commandService;
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            commandService.executeCommand(XFlowGraphCommands.GRAPH_PASTE.id, {});
                            return [2 /*return*/];
                        });
                    });
                } }));
            /** 保存数据 */
            toolbarGroup.push(__assign(__assign({}, getIconConfig(CommandPool.SAVE_GRAPH_DATA)), { id: TOOLBAR_ITEMS.SAVE_GRAPH_DATA, onClick: function (_a) {
                    var commandService = _a.commandService;
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            commandService.executeCommand(TOOLBAR_ITEMS.SAVE_GRAPH_DATA, {
                                saveGraphDataService: function (meta, graphData) {
                                    var onSave = getProps(flowchartId, 'onSave');
                                    if (onSave) {
                                        return onSave(graphData);
                                    }
                                },
                            });
                            return [2 /*return*/];
                        });
                    });
                } }));
            return [2 /*return*/, [
                    {
                        name: 'graphData',
                        items: toolbarGroup
                            .filter(function (item) { return !!(item === null || item === void 0 ? void 0 : item.iconName); })
                            .sort(function (pre, next) {
                            return (commands.findIndex(function (item) { return item.command === pre.command; }) -
                                commands.findIndex(function (item) { return item.command === next.command; }));
                        }),
                    },
                ]];
        });
    }); };
})(NSToolbarConfig || (NSToolbarConfig = {}));
/** 注册icon 类型 */
var registerIcon = function () {
    IconStore.set('SaveOutlined', SaveOutlined);
    IconStore.set('UndoOutlined', UndoOutlined);
    IconStore.set('RedoOutlined', RedoOutlined);
    IconStore.set('VerticalAlignTopOutlined', VerticalAlignTopOutlined);
    IconStore.set('VerticalAlignBottomOutlined', VerticalAlignBottomOutlined);
    IconStore.set('GatewayOutlined', GatewayOutlined);
    IconStore.set('GroupOutlined', GroupOutlined);
    IconStore.set('UngroupOutlined', UngroupOutlined);
    IconStore.set('CopyOutlined', CopyOutlined);
    IconStore.set('SnippetsOutlined', SnippetsOutlined);
};
export var useToolbarConfig = createToolbarConfig(function (toolbarConfig, proxy) {
    var _a;
    var flowchartId = proxy.getValue().flowchartId;
    var toolbarPanelProps = (_a = getProps(flowchartId, 'toolbarPanelProps')) !== null && _a !== void 0 ? _a : {};
    registerIcon();
    var _b = toolbarPanelProps.commands, commands = _b === void 0 ? [
        {
            command: CommandPool.REDO_CMD,
            tooltip: '重做',
            iconName: 'RedoOutlined',
        },
        {
            command: CommandPool.UNDO_CMD,
            tooltip: '撤销',
            iconName: 'UndoOutlined',
        },
        {
            command: CommandPool.FRONT_NODE,
            tooltip: '置前',
            iconName: 'VerticalAlignTopOutlined',
        },
        {
            command: CommandPool.BACK_NODE,
            tooltip: '置后',
            iconName: 'VerticalAlignBottomOutlined',
        },
        {
            command: CommandPool.MULTI_SELECT,
            tooltip: '开启框选',
            iconName: 'GatewayOutlined',
        },
        {
            command: CommandPool.ADD_GROUP,
            tooltip: '新建群组',
            iconName: 'GroupOutlined',
        },
        {
            command: CommandPool.DEL_GROUP,
            tooltip: '解散群组',
            iconName: 'UngroupOutlined',
        },
        {
            command: CommandPool.COPY,
            tooltip: '复制',
            iconName: 'CopyOutlined',
        },
        {
            command: CommandPool.PASTE,
            tooltip: '粘贴',
            iconName: 'SnippetsOutlined',
        },
        {
            command: CommandPool.SAVE_GRAPH_DATA,
            tooltip: '保存',
            iconName: 'SaveOutlined',
        },
    ] : _b;
    var getIconConfig = function (commandName) {
        if (!Object.values(CommandPool).includes(commandName)) {
            Log.warn("unknown command: ".concat(commandName));
            return {};
        }
        /** 暂时不支持自定义 icon，感觉使用上并不方便，后续再考虑接入 */
        return commands.find(function (item) { return item.command === commandName; });
    };
    /** 生产 toolbar item */
    toolbarConfig.setToolbarModelService(function (toolbarModel, modelService, toDispose) { return __awaiter(void 0, void 0, void 0, function () {
        var updateToolbarModel, models, subscriptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateToolbarModel = function () { return __awaiter(void 0, void 0, void 0, function () {
                        var state, toolbarItems;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, NSToolbarConfig.getToolbarState(modelService)];
                                case 1:
                                    state = _a.sent();
                                    return [4 /*yield*/, NSToolbarConfig.getToolbarItems(state, getIconConfig, commands, flowchartId)];
                                case 2:
                                    toolbarItems = _a.sent();
                                    toolbarModel.setValue(function (toolbar) {
                                        toolbar.mainGroups = toolbarItems;
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, NSToolbarConfig.getDependencies(modelService)];
                case 1:
                    models = _a.sent();
                    subscriptions = models.map(function (model) {
                        return model.watch(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                updateToolbarModel();
                                return [2 /*return*/];
                            });
                        }); });
                    });
                    toDispose.pushAll(subscriptions);
                    return [2 /*return*/];
            }
        });
    }); });
});
