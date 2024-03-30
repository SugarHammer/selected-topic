"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeService = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var flowchart_node_panel_1 = require("../../../flowchart-node-panel");
var form_wrapper_1 = require("../../form-wrapper");
var fields_1 = require("./fields");
var constants_1 = require("./constants");
var NodeComponent = function (props) {
    var config = props.config, _a = props.plugin, plugin = _a === void 0 ? {} : _a;
    var updateNode = plugin.updateNode;
    var _b = (0, react_1.useState)(tslib_1.__assign(tslib_1.__assign({}, flowchart_node_panel_1.DefaultNodeConfig), config)), nodeConfig = _b[0], setNodeConfig = _b[1];
    var onNodeConfigChange = function (key, value) {
        var _a, _b;
        setNodeConfig(tslib_1.__assign(tslib_1.__assign({}, nodeConfig), (_a = {}, _a[key] = value, _a)));
        updateNode((_b = {},
            _b[key] = value,
            _b));
    };
    (0, react_1.useEffect)(function () {
        setNodeConfig(tslib_1.__assign(tslib_1.__assign({}, flowchart_node_panel_1.DefaultNodeConfig), config));
    }, [config]);
    return (react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-body") },
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u5185\u5BB9"),
            react_1.default.createElement(fields_1.InputFiled, { label: "\u6807\u9898", value: nodeConfig.label, onChange: function (value) {
                    onNodeConfigChange('label', value);
                } })),
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u6837\u5F0F"),
            react_1.default.createElement(fields_1.Position, { x: nodeConfig.x, y: nodeConfig.y, onChange: function (key, value) {
                    onNodeConfigChange(key, value);
                } }),
            react_1.default.createElement(fields_1.Size, { width: nodeConfig.width, height: nodeConfig.height, onChange: function (key, value) {
                    onNodeConfigChange(key, value);
                } }),
            react_1.default.createElement(fields_1.ColorPicker, { label: "\u586B\u5145", value: nodeConfig.fill, onChange: function (value) {
                    onNodeConfigChange('fill', value);
                } }),
            react_1.default.createElement(fields_1.ColorPicker, { label: "\u8FB9\u6846", value: nodeConfig.stroke, onChange: function (value) {
                    onNodeConfigChange('stroke', value);
                } }),
            react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-node-text-style") },
                react_1.default.createElement(fields_1.InputNumberFiled, { label: "\u5B57\u53F7", value: nodeConfig.fontSize, width: 68, onChange: function (value) {
                        onNodeConfigChange('fontSize', value);
                    } }),
                react_1.default.createElement(fields_1.ColorPicker, { value: nodeConfig.fontFill, onChange: function (value) {
                        onNodeConfigChange('fontFill', value);
                    } })))));
};
var NodeService = function (props) {
    return (react_1.default.createElement(form_wrapper_1.FlowchartFormWrapper, tslib_1.__assign({}, props), function (config, plugin) { return react_1.default.createElement(NodeComponent, tslib_1.__assign({}, props, { plugin: plugin, config: config })); }));
};
exports.NodeService = NodeService;
//# sourceMappingURL=node.js.map