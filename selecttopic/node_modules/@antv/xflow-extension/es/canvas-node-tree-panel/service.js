import { __awaiter } from "tslib";
import React from 'react';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import { 
// utils
Disposable, 
// context
useXFlowApp, 
// models
MODELS, createComponentModel, 
// commands
XFlowModelCommands, } from '@antv/xflow-core';
import { TREE_ROOT_ID } from './constants';
export var NsNodeTreePanelModel;
(function (NsNodeTreePanelModel) {
    NsNodeTreePanelModel.id = 'TREE_PANEL_MODEL';
    NsNodeTreePanelModel.useModel = (model) => __awaiter(this, void 0, void 0, function* () {
        return model.awaitModel(NsNodeTreePanelModel.id);
    });
})(NsNodeTreePanelModel || (NsNodeTreePanelModel = {}));
/** 方便其他组件执行Command改变Panel内部状态 */
export const executeNodeDndTreeCommand = (cmds, updateModel) => {
    cmds.executeCommand(XFlowModelCommands.UPDATE_MODEL.id, {
        getModel: (modelService) => __awaiter(void 0, void 0, void 0, function* () {
            return NsNodeTreePanelModel.useModel(modelService);
        }),
        updateModel: updateModel,
    });
};
export const useTreePanelData = (props) => {
    const { treeDataService, searchService } = props;
    const { modelService } = useXFlowApp();
    /** 使用model */
    const [state, setState, panelModel] = createComponentModel({
        treeData: [],
        searchList: [],
        treeNodeList: [],
        expandedKeys: [],
        defaultExpandAll: false,
        keyword: '',
    });
    /** 注册成为全局状态，方便其他组件联动 */
    React.useEffect(() => {
        if (modelService.findDeferredModel(NsNodeTreePanelModel.id)) {
            return;
        }
        modelService.registerModel({
            id: NsNodeTreePanelModel.id,
            modelFactory: () => panelModel,
            watchChange: (self) => __awaiter(void 0, void 0, void 0, function* () {
                const graphMetaModel = yield MODELS.GRAPH_META.getModel(modelService); //useContext(MODELS.GRAPH_META.id)
                const fetch = (meta) => __awaiter(void 0, void 0, void 0, function* () {
                    const listData = yield treeDataService(meta, modelService);
                    const { treeData, rootNodes } = NodeList2Tree(listData);
                    const currentState = yield self.getValidValue();
                    // 设置默认展开的keys
                    const expandedKeys = currentState.expandedKeys.length > 0
                        ? currentState.expandedKeys
                        : rootNodes.map(i => i.id);
                    return { listData, treeData, expandedKeys };
                });
                const graphMetaDisposable = graphMetaModel.watch((meta) => __awaiter(void 0, void 0, void 0, function* () {
                    const data = yield fetch(meta);
                    self.setValue({
                        treeNodeList: data.listData,
                        treeData: data.treeData,
                        expandedKeys: data.expandedKeys,
                        defaultExpandAll: false,
                        keyword: '',
                        searchList: [],
                    });
                }));
                return Disposable.create(() => {
                    graphMetaDisposable.dispose();
                });
            }),
        });
        /* eslint-disable-next-line  */
    }, []);
    /** 折叠文件夹 */
    const onFolderExpand = React.useCallback((expandedKeys) => {
        setState(modelState => {
            modelState.expandedKeys = expandedKeys;
        });
    }, [setState]);
    /** 搜索 */
    const onKeywordChange = React.useCallback((keyword) => __awaiter(void 0, void 0, void 0, function* () {
        if (!searchService) {
            return console.warn('searchService is not defined');
        }
        if (keyword) {
            const list = yield searchService(state.treeNodeList, keyword);
            setState(modelState => {
                modelState.keyword = keyword;
                modelState.searchList = list;
            });
        }
        else {
            setState(modelState => {
                modelState.keyword = '';
                modelState.searchList = [];
            });
        }
    }), 
    // eslint-disable-next-line
    [searchService, state.treeNodeList]);
    return {
        state,
        setState,
        onKeywordChange,
        onFolderExpand,
    };
};
// 将list数据转换为树
export function NodeList2Tree(treeNodes = []) {
    const getGroupByIdMap = (list) => {
        const uniqList = uniqBy(list, 'id');
        const groups = uniqList.reduce((map, node) => {
            const parentId = node.parentId || TREE_ROOT_ID;
            if (!map.has(parentId)) {
                map.set(parentId, []);
            }
            const group = map.get(parentId);
            group.push(node);
            return map;
        }, new Map());
        return groups;
    };
    const groupMap = getGroupByIdMap(cloneDeep(treeNodes));
    function iterator(nodes, groupMapArgs) {
        return nodes.map(node => {
            if (groupMapArgs.has(node.id)) {
                const children = groupMapArgs.get(node.id);
                node.key = node.id;
                node.isDirectory = true;
                node.children = iterator(children, groupMapArgs) || [];
            }
            else {
                node.isLeaf = true;
            }
            return node;
        });
    }
    const rootNodes = groupMap.get(TREE_ROOT_ID) || [];
    const treeData = iterator(rootNodes, groupMap);
    return { treeData, rootNodes };
}
//# sourceMappingURL=service.js.map