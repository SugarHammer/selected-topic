"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFormWrapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var utils_1 = require("../flowchart-canvas/utils");
var canvas_json_schema_form_1 = require("../canvas-json-schema-form");
var context_1 = require("../base-panel/context");
var useAsync_1 = tslib_1.__importDefault(require("./useAsync"));
var FlowchartFormWrapper = function (props) {
    var controlSchema = props.controlSchema, children = props.children, _a = props.type, formType = _a === void 0 ? 'node' : _a;
    var _b = (0, context_1.usePanelContext)(), commandService = _b.commandService, modelService = _b.modelService;
    var getSelectNode = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, xflow_core_1.MODELS.SELECTED_NODE.useValue(modelService)];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    }); }, [modelService]);
    var getSelectEdge = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var cell, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, xflow_core_1.MODELS.SELECTED_CELL.useValue(modelService)];
                case 1:
                    cell = _a.sent();
                    data = cell.getData();
                    return [2 /*return*/, tslib_1.__assign({ id: cell.id }, data)];
            }
        });
    }); }, [modelService]);
    var _c = (0, useAsync_1.default)(formType === 'edge' ? getSelectEdge : getSelectNode), data = _c.data, loading = _c.loading;
    react_1.default.useEffect(function () {
        commandService.executeCommand(xflow_core_1.XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
            saveGraphDataService: function (meta, graph) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, { err: null, data: graph, meta: meta }];
                });
            }); },
        });
    }, [commandService]);
    var updateNode = function (value) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var currentNodeData, nodeConfig;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSelectNode()];
                case 1:
                    currentNodeData = _a.sent();
                    nodeConfig = tslib_1.__assign(tslib_1.__assign({}, currentNodeData), value);
                    return [4 /*yield*/, commandService.executeCommand(xflow_core_1.XFlowNodeCommands.UPDATE_NODE.id, {
                            nodeConfig: nodeConfig,
                        })];
                case 2:
                    _a.sent();
                    (0, utils_1.onConfigChange)({ type: 'update:node', config: nodeConfig });
                    return [2 /*return*/];
            }
        });
    }); };
    var updateEdge = function (value, type, key) {
        if (type === void 0) { type = 'line'; }
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var currentEdgeData, edgeConfig;
            var _a;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getSelectEdge()
                        // 更新线、文本样式
                    ];
                    case 1:
                        currentEdgeData = _c.sent();
                        edgeConfig = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, currentEdgeData), (key ? value[key] : value)), { attrs: tslib_1.__assign(tslib_1.__assign({}, currentEdgeData.attrs), (_a = {}, _a[type] = tslib_1.__assign(tslib_1.__assign({}, (_b = currentEdgeData.attrs) === null || _b === void 0 ? void 0 : _b[type]), (key ? value[key] : value)), _a)) });
                        return [4 /*yield*/, commandService.executeCommand(xflow_core_1.XFlowEdgeCommands.UPDATE_EDGE.id, { edgeConfig: edgeConfig })];
                    case 2:
                        _c.sent();
                        (0, utils_1.onConfigChange)({ type: 'update:edge', config: edgeConfig });
                        return [2 /*return*/];
                }
            });
        });
    };
    var updateGroup = function (value) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var currentGroupData, nodeConfig;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSelectNode()];
                case 1:
                    currentGroupData = _a.sent();
                    nodeConfig = tslib_1.__assign(tslib_1.__assign({}, currentGroupData), value);
                    return [4 /*yield*/, commandService.executeCommand(xflow_core_1.XFlowNodeCommands.UPDATE_NODE.id, {
                            nodeConfig: nodeConfig,
                        })];
                case 2:
                    _a.sent();
                    (0, utils_1.onConfigChange)({ type: 'update:group', config: nodeConfig });
                    return [2 /*return*/];
            }
        });
    }); };
    if (loading) {
        return null;
    }
    return (react_1.default.createElement(canvas_json_schema_form_1.FormItemWrapper, { schema: controlSchema }, function () {
        return children(tslib_1.__assign({}, data), { updateNode: updateNode, updateEdge: updateEdge, updateGroup: updateGroup });
    }));
};
exports.FlowchartFormWrapper = FlowchartFormWrapper;
//# sourceMappingURL=form-wrapper.js.map