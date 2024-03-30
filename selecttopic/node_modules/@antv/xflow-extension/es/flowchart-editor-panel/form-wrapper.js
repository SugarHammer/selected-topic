import { __awaiter } from "tslib";
import React, { useCallback } from 'react';
import { XFlowGraphCommands, MODELS, XFlowNodeCommands, XFlowEdgeCommands } from '@antv/xflow-core';
import { onConfigChange } from '../flowchart-canvas/utils';
import { FormItemWrapper } from '../canvas-json-schema-form';
import { usePanelContext } from '../base-panel/context';
import useAsync from './useAsync';
export const FlowchartFormWrapper = props => {
    const { controlSchema, children, type: formType = 'node' } = props;
    const { commandService, modelService } = usePanelContext();
    const getSelectNode = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield MODELS.SELECTED_NODE.useValue(modelService);
        return data;
    }), [modelService]);
    const getSelectEdge = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const cell = yield MODELS.SELECTED_CELL.useValue(modelService);
        const data = cell.getData();
        return Object.assign({ id: cell.id }, data);
    }), [modelService]);
    const { data, loading } = useAsync(formType === 'edge' ? getSelectEdge : getSelectNode);
    React.useEffect(() => {
        commandService.executeCommand(XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
            saveGraphDataService: (meta, graph) => __awaiter(void 0, void 0, void 0, function* () {
                return { err: null, data: graph, meta };
            }),
        });
    }, [commandService]);
    const updateNode = (value) => __awaiter(void 0, void 0, void 0, function* () {
        const currentNodeData = yield getSelectNode();
        const nodeConfig = Object.assign(Object.assign({}, currentNodeData), value);
        yield commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
            nodeConfig,
        });
        onConfigChange({ type: 'update:node', config: nodeConfig });
    });
    const updateEdge = (value, type = 'line', key) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const currentEdgeData = yield getSelectEdge();
        // 更新线、文本样式
        const edgeConfig = Object.assign(Object.assign(Object.assign({}, currentEdgeData), (key ? value[key] : value)), { attrs: Object.assign(Object.assign({}, currentEdgeData.attrs), { [type]: Object.assign(Object.assign({}, (_a = currentEdgeData.attrs) === null || _a === void 0 ? void 0 : _a[type]), (key ? value[key] : value)) }) });
        yield commandService.executeCommand(XFlowEdgeCommands.UPDATE_EDGE.id, { edgeConfig });
        onConfigChange({ type: 'update:edge', config: edgeConfig });
    });
    const updateGroup = (value) => __awaiter(void 0, void 0, void 0, function* () {
        const currentGroupData = yield getSelectNode();
        const nodeConfig = Object.assign(Object.assign({}, currentGroupData), value);
        yield commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
            nodeConfig,
        });
        onConfigChange({ type: 'update:group', config: nodeConfig });
    });
    if (loading) {
        return null;
    }
    return (React.createElement(FormItemWrapper, { schema: controlSchema }, () => {
        return children(Object.assign({}, data), { updateNode, updateEdge, updateGroup });
    }));
};
//# sourceMappingURL=form-wrapper.js.map