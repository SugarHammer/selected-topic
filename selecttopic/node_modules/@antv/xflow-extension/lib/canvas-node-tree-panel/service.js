"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeList2Tree = exports.useTreePanelData = exports.executeNodeDndTreeCommand = exports.NsNodeTreePanelModel = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uniqBy_1 = tslib_1.__importDefault(require("lodash/uniqBy"));
var cloneDeep_1 = tslib_1.__importDefault(require("lodash/cloneDeep"));
var xflow_core_1 = require("@antv/xflow-core");
var constants_1 = require("./constants");
var NsNodeTreePanelModel;
(function (NsNodeTreePanelModel) {
    var _this = this;
    NsNodeTreePanelModel.id = 'TREE_PANEL_MODEL';
    NsNodeTreePanelModel.useModel = function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, model.awaitModel(NsNodeTreePanelModel.id)];
        });
    }); };
})(NsNodeTreePanelModel = exports.NsNodeTreePanelModel || (exports.NsNodeTreePanelModel = {}));
/** 方便其他组件执行Command改变Panel内部状态 */
var executeNodeDndTreeCommand = function (cmds, updateModel) {
    cmds.executeCommand(xflow_core_1.XFlowModelCommands.UPDATE_MODEL.id, {
        getModel: function (modelService) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, NsNodeTreePanelModel.useModel(modelService)];
            });
        }); },
        updateModel: updateModel,
    });
};
exports.executeNodeDndTreeCommand = executeNodeDndTreeCommand;
var useTreePanelData = function (props) {
    var treeDataService = props.treeDataService, searchService = props.searchService;
    var modelService = (0, xflow_core_1.useXFlowApp)().modelService;
    /** 使用model */
    var _a = (0, xflow_core_1.createComponentModel)({
        treeData: [],
        searchList: [],
        treeNodeList: [],
        expandedKeys: [],
        defaultExpandAll: false,
        keyword: '',
    }), state = _a[0], setState = _a[1], panelModel = _a[2];
    /** 注册成为全局状态，方便其他组件联动 */
    react_1.default.useEffect(function () {
        if (modelService.findDeferredModel(NsNodeTreePanelModel.id)) {
            return;
        }
        modelService.registerModel({
            id: NsNodeTreePanelModel.id,
            modelFactory: function () { return panelModel; },
            watchChange: function (self) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var graphMetaModel, fetch, graphMetaDisposable;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, xflow_core_1.MODELS.GRAPH_META.getModel(modelService)]; //useContext(MODELS.GRAPH_META.id)
                        case 1:
                            graphMetaModel = _a.sent() //useContext(MODELS.GRAPH_META.id)
                            ;
                            fetch = function (meta) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var listData, _a, treeData, rootNodes, currentState, expandedKeys;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, treeDataService(meta, modelService)];
                                        case 1:
                                            listData = _b.sent();
                                            _a = NodeList2Tree(listData), treeData = _a.treeData, rootNodes = _a.rootNodes;
                                            return [4 /*yield*/, self.getValidValue()
                                                // 设置默认展开的keys
                                            ];
                                        case 2:
                                            currentState = _b.sent();
                                            expandedKeys = currentState.expandedKeys.length > 0
                                                ? currentState.expandedKeys
                                                : rootNodes.map(function (i) { return i.id; });
                                            return [2 /*return*/, { listData: listData, treeData: treeData, expandedKeys: expandedKeys }];
                                    }
                                });
                            }); };
                            graphMetaDisposable = graphMetaModel.watch(function (meta) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var data;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, fetch(meta)];
                                        case 1:
                                            data = _a.sent();
                                            self.setValue({
                                                treeNodeList: data.listData,
                                                treeData: data.treeData,
                                                expandedKeys: data.expandedKeys,
                                                defaultExpandAll: false,
                                                keyword: '',
                                                searchList: [],
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/, xflow_core_1.Disposable.create(function () {
                                    graphMetaDisposable.dispose();
                                })];
                    }
                });
            }); },
        });
        /* eslint-disable-next-line  */
    }, []);
    /** 折叠文件夹 */
    var onFolderExpand = react_1.default.useCallback(function (expandedKeys) {
        setState(function (modelState) {
            modelState.expandedKeys = expandedKeys;
        });
    }, [setState]);
    /** 搜索 */
    var onKeywordChange = react_1.default.useCallback(function (keyword) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var list_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!searchService) {
                        return [2 /*return*/, console.warn('searchService is not defined')];
                    }
                    if (!keyword) return [3 /*break*/, 2];
                    return [4 /*yield*/, searchService(state.treeNodeList, keyword)];
                case 1:
                    list_1 = _a.sent();
                    setState(function (modelState) {
                        modelState.keyword = keyword;
                        modelState.searchList = list_1;
                    });
                    return [3 /*break*/, 3];
                case 2:
                    setState(function (modelState) {
                        modelState.keyword = '';
                        modelState.searchList = [];
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, 
    // eslint-disable-next-line
    [searchService, state.treeNodeList]);
    return {
        state: state,
        setState: setState,
        onKeywordChange: onKeywordChange,
        onFolderExpand: onFolderExpand,
    };
};
exports.useTreePanelData = useTreePanelData;
// 将list数据转换为树
function NodeList2Tree(treeNodes) {
    if (treeNodes === void 0) { treeNodes = []; }
    var getGroupByIdMap = function (list) {
        var uniqList = (0, uniqBy_1.default)(list, 'id');
        var groups = uniqList.reduce(function (map, node) {
            var parentId = node.parentId || constants_1.TREE_ROOT_ID;
            if (!map.has(parentId)) {
                map.set(parentId, []);
            }
            var group = map.get(parentId);
            group.push(node);
            return map;
        }, new Map());
        return groups;
    };
    var groupMap = getGroupByIdMap((0, cloneDeep_1.default)(treeNodes));
    function iterator(nodes, groupMapArgs) {
        return nodes.map(function (node) {
            if (groupMapArgs.has(node.id)) {
                var children = groupMapArgs.get(node.id);
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
    var rootNodes = groupMap.get(constants_1.TREE_ROOT_ID) || [];
    var treeData = iterator(rootNodes, groupMap);
    return { treeData: treeData, rootNodes: rootNodes };
}
exports.NodeList2Tree = NodeList2Tree;
//# sourceMappingURL=service.js.map