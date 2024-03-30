import { __awaiter } from "tslib";
import { useXFlowApp, createComponentModel, DisposableCollection } from '@antv/xflow-core';
import React from 'react';
export const useToolbarModel = (props) => {
    const { config } = props;
    const modelId = config.moduleId;
    const app = useXFlowApp();
    const [state, setState, toolbarModel, isModelReady] = createComponentModel({
        name: modelId,
        layout: props.layout,
        mainGroups: [],
        extraGroups: [],
        customRender: null,
    });
    /** 注册全局的model */
    React.useEffect(() => {
        const toDispose = new DisposableCollection();
        const deferredModel = app.modelService.findDeferredModel(modelId);
        if (!deferredModel) {
            const { toolbarCustomRender, toolbarModelService } = config.getConfig();
            const d = app.modelService.registerModel({
                id: modelId,
                modelFactory: () => toolbarModel,
                watchChange: (self) => __awaiter(void 0, void 0, void 0, function* () {
                    if (toolbarModelService) {
                        yield toolbarModelService(self, app.modelService, toDispose);
                    }
                    if (toolbarCustomRender) {
                        const updateCustomRender = customRender => {
                            self.setValue(m => (m.customRender = customRender));
                        };
                        yield toolbarCustomRender(app.modelService, updateCustomRender);
                    }
                    return toDispose;
                }),
            });
            toDispose.push(d);
        }
        return () => {
            toDispose.dispose();
        };
        /* eslint-disable-next-line  */
    }, []);
    return { isModelReady, state, setState, toolbarModel };
};
//# sourceMappingURL=service.js.map