"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGraphDnd = exports.defaultNodeFactory = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var x6_1 = require("@antv/x6");
var node_1 = require("../../canvas-dag-extension/x6-extension/node");
var defaultNodeFactory = function (args) {
    return new node_1.XFlowNode(args);
};
exports.defaultNodeFactory = defaultNodeFactory;
var useGraphDnd = function (props) {
    var x6NodeFactory = props.x6NodeFactory, dndOptions = props.dndOptions, onNodeDrop = props.onNodeDrop;
    var _a = (0, xflow_core_1.useXFlowApp)(), graphProvider = _a.graphProvider, modelService = _a.modelService, commandService = _a.commandService;
    var _b = react_1.default.useState(), graphConfig = _b[0], setConfig = _b[1];
    var _c = react_1.default.useState(), dnd = _c[0], setDnd = _c[1];
    var _d = react_1.default.useState(), graph = _d[0], setGraph = _d[1];
    /** 引用 graph 配置 */
    react_1.default.useEffect(function () {
        graphProvider.getGraphInstance().then(function (x6Graph) {
            setGraph(x6Graph);
        });
        graphProvider.getGraphOptions().then(function (x6GraphConfig) {
            setConfig(x6GraphConfig);
        });
    }, [graphProvider, setGraph, setConfig]);
    /** 初始化 Dnd 实例 */
    react_1.default.useEffect(function () {
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
        return function () {
            dndInstance.dispose();
        };
    }, [commandService, modelService, dndOptions, graph, onNodeDrop]);
    /** 开始拖拽 */
    var onMouseDown = react_1.default.useCallback(function (nodeConfig) { return function (e) {
        if (!graph || !dnd || !graphConfig) {
            return;
        }
        if (nodeConfig.isDisabled) {
            return;
        }
        // 获取节点组件
        var renderKey = graphConfig.nodeTypeParser(nodeConfig);
        var reactComponent = nodeConfig.renderComponent
            ? nodeConfig.renderComponent
            : graphConfig.nodeRender.get(renderKey);
        // 包裹节点组件
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
    return { graphConfig: graphConfig, onMouseDown: onMouseDown, modelService: modelService, commandService: commandService };
};
exports.useGraphDnd = useGraphDnd;
//# sourceMappingURL=dnd-hook.js.map