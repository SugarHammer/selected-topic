"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePanelBody = exports.NodeTitle = exports.renderNode = exports.defaultNodeFactory = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var x6_1 = require("@antv/x6");
var xflow_core_1 = require("@antv/xflow-core");
var node_1 = require("../canvas-dag-extension/x6-extension/node");
var DirectoryTree = antd_1.Tree.DirectoryTree, TreeNode = antd_1.Tree.TreeNode;
var FolderIcon = function (_a) {
    var expanded = _a.expanded;
    return expanded ? react_1.default.createElement(icons_1.FolderOpenFilled, null) : react_1.default.createElement(icons_1.FolderFilled, null);
};
var defaultNodeFactory = function (args) {
    return new node_1.XFlowNode(args);
};
exports.defaultNodeFactory = defaultNodeFactory;
var renderNode = function (props) {
    var nodeConfig = props.nodeConfig, onMouseDown = props.onMouseDown, graphConfig = props.graphConfig, modelService = props.modelService, commandService = props.commandService;
    if (!graphConfig) {
        return react_1.default.createElement("div", null);
    }
    if (nodeConfig.renderComponent) {
        return (react_1.default.createElement("div", { onMouseDown: onMouseDown }, react_1.default.createElement(nodeConfig.renderComponent, {
            data: nodeConfig,
            isNodeTreePanel: true,
        })));
    }
    var renderKey = graphConfig.nodeTypeParser(nodeConfig) || xflow_core_1.XFlowConstants.XFLOW_DEFAULT_NODE;
    var reactComponent = graphConfig.nodeRender.get(renderKey);
    return (react_1.default.createElement("div", { onMouseDown: onMouseDown }, react_1.default.createElement(reactComponent, {
        commandService: commandService,
        modelService: modelService,
        data: nodeConfig,
        isNodeTreePanel: true,
    })));
};
exports.renderNode = renderNode;
var NodeTitle = function (props) {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)(), appContainer = _b[0], setAppContainer = _b[1];
    var getGraphConfig = (0, xflow_core_1.useXFlowApp)().getGraphConfig;
    getGraphConfig().then(function (graphConfig) {
        setAppContainer(graphConfig.appContainer);
    });
    var prefixClz = props.prefixClz, graphConfig = props.graphConfig, commandService = props.commandService, modelService = props.modelService, popoverContent = props.popoverContent, onMouseDown = props.onMouseDown, item = props.item;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        popoverContent && (react_1.default.createElement(antd_1.Popover, { placement: "right", destroyTooltipOnHide: true, content: popoverContent, visible: isVisible, onVisibleChange: function (val) {
                setVisible(val);
            }, getPopupContainer: function () { return appContainer || document.body; } },
            react_1.default.createElement("div", { className: "".concat(prefixClz, "-node-wrapper"), onMouseEnter: function () {
                    setVisible(true);
                } }, (0, exports.renderNode)({
                graphConfig: graphConfig,
                commandService: commandService,
                onMouseDown: onMouseDown,
                modelService: modelService,
                nodeConfig: item,
            })))),
        !popoverContent && (react_1.default.createElement("div", { className: "".concat(prefixClz, "-node-wrapper"), onMouseEnter: function () {
                setVisible(true);
            } }, (0, exports.renderNode)({
            graphConfig: graphConfig,
            commandService: commandService,
            onMouseDown: onMouseDown,
            modelService: modelService,
            nodeConfig: item,
        })))));
};
exports.NodeTitle = NodeTitle;
var NodePanelBody = function (props) {
    var x6NodeFactory = props.x6NodeFactory, dndOptions = props.dndOptions, onNodeDrop = props.onNodeDrop, state = props.state, onFolderExpand = props.onFolderExpand, prefixClz = props.prefixClz;
    var _a = (0, xflow_core_1.useXFlowApp)(), graphProvider = _a.graphProvider, modelService = _a.modelService, commandService = _a.commandService;
    var _b = react_1.default.useState(), graphConfig = _b[0], setConfig = _b[1];
    var _c = react_1.default.useState(), dnd = _c[0], setDnd = _c[1];
    var _d = react_1.default.useState(), graph = _d[0], setGraph = _d[1];
    graphProvider.getGraphInstance().then(function (x6Graph) {
        setGraph(x6Graph);
    });
    react_1.default.useEffect(function () {
        graphProvider.getGraphOptions().then(function (x6GraphConfig) {
            setConfig(x6GraphConfig);
        });
        if (!graph) {
            return;
        }
        var dndInstance = new x6_1.Addon.Dnd(tslib_1.__assign(tslib_1.__assign({ scaled: false, animation: false }, dndOptions), { target: graph, 
            /** 这里考虑到需要新增群组的需求，不使用x6的getDropNod方法
             * 在validateNode时调用command添加
             */
            validateNode: function (droppingNode) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var nodeConfig;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nodeConfig = tslib_1.__assign(tslib_1.__assign({}, droppingNode.getData()), droppingNode.getPosition());
                            if (!onNodeDrop) return [3 /*break*/, 2];
                            return [4 /*yield*/, onNodeDrop(nodeConfig, commandService, modelService)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            console.error('onNodeDrop method is required in NodeTree Panel');
                            _a.label = 3;
                        case 3: return [2 /*return*/, false];
                    }
                });
            }); } }));
        setDnd(dndInstance);
    }, [commandService, dndOptions, graph, graphProvider, modelService, onNodeDrop]);
    var onMouseDown = react_1.default.useCallback(function (nodeConfig) { return function (e) {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        var renderKey = graphConfig.nodeTypeParser(nodeConfig);
        var reactComponent = nodeConfig.renderComponent
            ? nodeConfig.renderComponent
            : graphConfig.nodeRender.get(renderKey);
        var wrappedComponent = (0, xflow_core_1.getNodeReactComponent)(reactComponent, commandService, modelService);
        var nodeData = {
            data: nodeConfig,
            width: nodeConfig.width || 180,
            height: nodeConfig.height || 40,
            view: graphConfig.graphId,
            component: wrappedComponent,
        };
        var x6Node = x6NodeFactory ? x6NodeFactory(nodeData) : (0, exports.defaultNodeFactory)(nodeData);
        dnd.start(x6Node, e.nativeEvent);
    }; }, [commandService, dnd, graph, graphConfig, modelService, x6NodeFactory]);
    var renderTree = react_1.default.useCallback(function (treeList) {
        if (treeList === void 0) { treeList = []; }
        return treeList.map(function (item) {
            var isDirectory = item.isDirectory, children = item.children, popoverContent = item.popoverContent;
            if (isDirectory) {
                return (react_1.default.createElement(TreeNode, { icon: FolderIcon, key: item.id, title: item.label, className: "".concat(prefixClz, "-tree-folder") }, renderTree(children)));
            }
            return (react_1.default.createElement(TreeNode, { isLeaf: true, key: item.id, className: "".concat(prefixClz, "-tree-leaf"), icon: react_1.default.createElement("span", null), title: react_1.default.createElement(exports.NodeTitle, { item: item, onMouseDown: onMouseDown(item), popoverContent: popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }) }));
        });
    }, [commandService, graphConfig, modelService, onMouseDown, prefixClz]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-body"), style: props.style },
            !state.keyword && (react_1.default.createElement(DirectoryTree, { showIcon: true, selectable: false, autoExpandParent: false, onExpand: onFolderExpand, expandedKeys: state.expandedKeys, className: "".concat(prefixClz, "-tree") }, renderTree(state.treeData))),
            state.searchList.length > 0 && (react_1.default.createElement("ul", { className: "".concat(prefixClz, "-body-list") }, state.searchList.map(function (treeNode) { return (react_1.default.createElement("li", { className: "".concat(prefixClz, "-body-list-item") },
                react_1.default.createElement(exports.NodeTitle, { item: treeNode, onMouseDown: onMouseDown(treeNode), popoverContent: treeNode.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }))); }))),
            state.keyword && state.searchList.length === 0 && react_1.default.createElement(antd_1.Empty, { style: { marginTop: '48px' } }))));
};
exports.NodePanelBody = NodePanelBody;
//# sourceMappingURL=panel-body.js.map