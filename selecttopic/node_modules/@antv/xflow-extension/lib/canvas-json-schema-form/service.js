"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonSchemaFormModel = exports.executeJsonSchemaFormCommand = exports.NsJsonSchemaFormModel = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var NsJsonSchemaFormModel;
(function (NsJsonSchemaFormModel) {
    var _this = this;
    NsJsonSchemaFormModel.id = 'XFLOW_JSON_SCHEMA_FORM';
    NsJsonSchemaFormModel.useModel = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, model.awaitModel(NsJsonSchemaFormModel.id)];
        });
    }); };
})(NsJsonSchemaFormModel = exports.NsJsonSchemaFormModel || (exports.NsJsonSchemaFormModel = {}));
/** 方便其他组件执行Command改变Panel内部状态 */
var executeJsonSchemaFormCommand = function (cmds, updateModel) {
    cmds.executeCommand(xflow_core_2.XFlowModelCommands.UPDATE_MODEL.id, {
        getModel: function (modelService) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                return [2 /*return*/, NsJsonSchemaFormModel.useModel(modelService)];
            });
        }); },
        updateModel: updateModel,
    });
};
exports.executeJsonSchemaFormCommand = executeJsonSchemaFormCommand;
var useJsonSchemaFormModel = function (props) {
    var app = (0, xflow_core_1.useXFlowApp)();
    var commandService = app.commandService, modelService = app.modelService, getGraphInstance = app.getGraphInstance;
    var formSchemaService = props.formSchemaService;
    var _a = (0, xflow_core_1.createComponentModel)({
        schema: { tabs: [] },
        targetType: null,
        targetData: null,
        targetCell: null,
        loading: false,
    }), state = _a[0], setState = _a[1], model = _a[2], isModelReady = _a[3];
    /** 注册全局的model */
    react_1.default.useEffect(function () {
        if (!app || !app.modelService) {
            return;
        }
        var toDispose = new xflow_core_1.DisposableCollection();
        var deferredModel = app.modelService.findDeferredModel(NsJsonSchemaFormModel.id);
        if (!deferredModel) {
            var d = app.modelService.registerModel({
                id: NsJsonSchemaFormModel.id,
                modelFactory: function () { return model; },
                /** 监听SELECTED_CELL的变化 */
                watchChange: function (self, modelSerccie) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var selectedCellModel, nodeDisposable;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, xflow_core_2.MODELS.SELECTED_CELL.getModel(modelSerccie)];
                            case 1:
                                selectedCellModel = _a.sent();
                                nodeDisposable = selectedCellModel.watch(function (cell) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                    var updateState, getCellType, targetCellType;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                updateState = function (targetCell, type) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                                    var targetData, graph, schema;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                self.setValue(function (m) {
                                                                    m.loading = true;
                                                                    m.schema = { tabs: [] };
                                                                    m.targetType = null;
                                                                    m.targetData = null;
                                                                    m.targetCell = null;
                                                                });
                                                                targetData = targetCell ? targetCell.getData() : null;
                                                                if (!formSchemaService) {
                                                                    return [2 /*return*/];
                                                                }
                                                                return [4 /*yield*/, getGraphInstance()];
                                                            case 1:
                                                                graph = _a.sent();
                                                                return [4 /*yield*/, formSchemaService({
                                                                        commandService: commandService,
                                                                        modelService: modelService,
                                                                        targetData: targetData,
                                                                        cell: targetCell,
                                                                        targetType: type,
                                                                        graph: graph,
                                                                    })];
                                                            case 2:
                                                                schema = _a.sent();
                                                                self.setValue({
                                                                    loading: false,
                                                                    schema: schema,
                                                                    targetType: type,
                                                                    targetCell: targetCell,
                                                                    targetData: targetData,
                                                                });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                getCellType = function (targetCell) {
                                                    if (!targetCell) {
                                                        return 'canvas';
                                                    }
                                                    else if (targetCell.isNode &&
                                                        targetCell.isNode() &&
                                                        targetCell.getProp('isGroup')) {
                                                        return 'group';
                                                    }
                                                    else if (targetCell.isNode && targetCell.isNode()) {
                                                        return 'node';
                                                    }
                                                    else if (targetCell.isEdge && targetCell.isEdge()) {
                                                        return 'edge';
                                                    }
                                                    else {
                                                        return 'canvas';
                                                    }
                                                };
                                                targetCellType = getCellType(cell);
                                                if (!(props.targetType || ['node', 'canvas']).includes(targetCellType)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, updateState(cell, targetCellType)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/, xflow_core_2.Disposable.create(function () {
                                        nodeDisposable.dispose();
                                        toDispose.push(nodeDisposable);
                                    })];
                        }
                    });
                }); },
            });
            toDispose.push(d);
        }
        return function () {
            toDispose.dispose();
        };
        /* eslint-disable-next-line  */
    }, []);
    return { commandService: commandService, modelService: modelService, state: state, setState: setState, model: model, isModelReady: isModelReady };
};
exports.useJsonSchemaFormModel = useJsonSchemaFormModel;
//# sourceMappingURL=service.js.map