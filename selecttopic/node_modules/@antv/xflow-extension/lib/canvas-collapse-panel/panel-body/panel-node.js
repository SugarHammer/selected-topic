"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelNode = exports.renderNode = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var antd_1 = require("antd");
var renderNode = function (props) {
    var nodeConfig = props.nodeConfig, onMouseDown = props.onMouseDown, graphConfig = props.graphConfig, modelService = props.modelService, commandService = props.commandService;
    if (!graphConfig) {
        return react_1.default.createElement("div", null);
    }
    if (nodeConfig.renderComponent) {
        return (react_1.default.createElement("div", { onMouseDown: onMouseDown }, react_1.default.createElement(nodeConfig.renderComponent, {
            data: nodeConfig,
            isNodePanel: true,
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
var PanelNode = function (props) {
    var _a = react_1.default.useState(false), isVisible = _a[0], setVisible = _a[1];
    var prefixClz = props.prefixClz, graphConfig = props.graphConfig, commandService = props.commandService, modelService = props.modelService, popoverContent = props.popoverContent, onMouseDown = props.onMouseDown, item = props.item;
    return (react_1.default.createElement(react_1.default.Fragment, null, popoverContent ? (react_1.default.createElement(antd_1.Popover, { placement: "right", destroyTooltipOnHide: true, content: popoverContent, visible: isVisible, onVisibleChange: function (val) {
            setVisible(val);
        } },
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-node-wrapper"), onMouseEnter: function () {
                setVisible(true);
            } }, (0, exports.renderNode)({
            graphConfig: graphConfig,
            commandService: commandService,
            onMouseDown: onMouseDown,
            modelService: modelService,
            nodeConfig: item,
        })))) : (react_1.default.createElement("div", { className: "".concat(prefixClz, "-node-wrapper") }, (0, exports.renderNode)({
        graphConfig: graphConfig,
        commandService: commandService,
        onMouseDown: onMouseDown,
        modelService: modelService,
        nodeConfig: item,
    })))));
};
exports.PanelNode = PanelNode;
//# sourceMappingURL=panel-node.js.map