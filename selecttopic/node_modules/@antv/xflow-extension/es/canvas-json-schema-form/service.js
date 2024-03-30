import { __awaiter } from "tslib";
import React from 'react';
import { useXFlowApp, DisposableCollection, createComponentModel } from '@antv/xflow-core';
import { XFlowModelCommands, Disposable, MODELS } from '@antv/xflow-core';
export var NsJsonSchemaFormModel;
(function (NsJsonSchemaFormModel) {
    NsJsonSchemaFormModel.id = 'XFLOW_JSON_SCHEMA_FORM';
    NsJsonSchemaFormModel.useModel = (model) => __awaiter(this, void 0, void 0, function* () {
        return model.awaitModel(NsJsonSchemaFormModel.id);
    });
})(NsJsonSchemaFormModel || (NsJsonSchemaFormModel = {}));
/** 方便其他组件执行Command改变Panel内部状态 */
export const executeJsonSchemaFormCommand = (cmds, updateModel) => {
    cmds.executeCommand(XFlowModelCommands.UPDATE_MODEL.id, {
        getModel: (modelService) => __awaiter(void 0, void 0, void 0, function* () {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return NsJsonSchemaFormModel.useModel(modelService);
        }),
        updateModel: updateModel,
    });
};
export const useJsonSchemaFormModel = (props) => {
    const app = useXFlowApp();
    const { commandService, modelService, getGraphInstance } = app;
    const { formSchemaService } = props;
    const [state, setState, model, isModelReady] = createComponentModel({
        schema: { tabs: [] },
        targetType: null,
        targetData: null,
        targetCell: null,
        loading: false,
    });
    /** 注册全局的model */
    React.useEffect(() => {
        if (!app || !app.modelService) {
            return;
        }
        const toDispose = new DisposableCollection();
        const deferredModel = app.modelService.findDeferredModel(NsJsonSchemaFormModel.id);
        if (!deferredModel) {
            const d = app.modelService.registerModel({
                id: NsJsonSchemaFormModel.id,
                modelFactory: () => model,
                /** 监听SELECTED_CELL的变化 */
                watchChange: (self, modelSerccie) => __awaiter(void 0, void 0, void 0, function* () {
                    const selectedCellModel = yield MODELS.SELECTED_CELL.getModel(modelSerccie);
                    const nodeDisposable = selectedCellModel.watch((cell) => __awaiter(void 0, void 0, void 0, function* () {
                        const updateState = (targetCell, type) => __awaiter(void 0, void 0, void 0, function* () {
                            self.setValue(m => {
                                m.loading = true;
                                m.schema = { tabs: [] };
                                m.targetType = null;
                                m.targetData = null;
                                m.targetCell = null;
                            });
                            const targetData = targetCell ? targetCell.getData() : null;
                            if (!formSchemaService) {
                                return;
                            }
                            const graph = yield getGraphInstance();
                            const schema = yield formSchemaService({
                                commandService,
                                modelService,
                                targetData,
                                cell: targetCell,
                                targetType: type,
                                graph,
                            });
                            self.setValue({
                                loading: false,
                                schema: schema,
                                targetType: type,
                                targetCell: targetCell,
                                targetData: targetData,
                            });
                        });
                        const getCellType = (targetCell) => {
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
                        const targetCellType = getCellType(cell);
                        if ((props.targetType || ['node', 'canvas']).includes(targetCellType)) {
                            yield updateState(cell, targetCellType);
                        }
                    }));
                    return Disposable.create(() => {
                        nodeDisposable.dispose();
                        toDispose.push(nodeDisposable);
                    });
                }),
            });
            toDispose.push(d);
        }
        return () => {
            toDispose.dispose();
        };
        /* eslint-disable-next-line  */
    }, []);
    return { commandService, modelService, state, setState, model, isModelReady };
};
//# sourceMappingURL=service.js.map