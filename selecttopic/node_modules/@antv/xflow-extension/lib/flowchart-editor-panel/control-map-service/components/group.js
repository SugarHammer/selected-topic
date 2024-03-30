"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var flowchart_node_panel_1 = require("../../../flowchart-node-panel");
var form_wrapper_1 = require("../../form-wrapper");
var fields_1 = require("./fields");
var constants_1 = require("./constants");
var GroupComponent = function (props) {
    var config = props.config, _a = props.plugin, plugin = _a === void 0 ? {} : _a;
    var updateGroup = plugin.updateGroup;
    var _b = (0, react_1.useState)(tslib_1.__assign(tslib_1.__assign({}, flowchart_node_panel_1.DefaultNodeConfig), config)), groupConfig = _b[0], setGroupConfig = _b[1];
    var onGroupConfigChange = function (key, value) {
        var _a, _b;
        setGroupConfig(tslib_1.__assign(tslib_1.__assign({}, groupConfig), (_a = {}, _a[key] = value, _a)));
        updateGroup((_b = {},
            _b[key] = value,
            _b));
    };
    (0, react_1.useEffect)(function () {
        setGroupConfig(tslib_1.__assign(tslib_1.__assign({}, flowchart_node_panel_1.DefaultNodeConfig), config));
    }, [config]);
    return (react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-body") },
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u5185\u5BB9"),
            react_1.default.createElement(fields_1.InputFiled, { label: "\u6807\u9898", value: groupConfig.label, onChange: function (value) {
                    onGroupConfigChange('label', value);
                } })),
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u6837\u5F0F"),
            react_1.default.createElement(fields_1.Position, { x: groupConfig.x, y: groupConfig.y, onChange: function (key, value) {
                    onGroupConfigChange(key, value);
                } }),
            react_1.default.createElement(fields_1.Size, { width: groupConfig.width, height: groupConfig.height, onChange: function (key, value) {
                    onGroupConfigChange(key, value);
                } }),
            react_1.default.createElement(fields_1.ColorPicker, { label: "\u586B\u5145", value: groupConfig.fill, onChange: function (value) {
                    onGroupConfigChange('fill', value);
                } }),
            react_1.default.createElement(fields_1.ColorPicker, { label: "\u8FB9\u6846", value: groupConfig.stroke, onChange: function (value) {
                    onGroupConfigChange('stroke', value);
                } }),
            react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-node-text-style") },
                react_1.default.createElement(fields_1.InputNumberFiled, { label: "\u5B57\u53F7", value: groupConfig.fontSize, width: 68, onChange: function (value) {
                        onGroupConfigChange('fontSize', value);
                    } }),
                react_1.default.createElement(fields_1.ColorPicker, { value: groupConfig.fontFill, onChange: function (value) {
                        onGroupConfigChange('fontFill', value);
                    } })))));
};
var GroupService = function (props) {
    return (react_1.default.createElement(form_wrapper_1.FlowchartFormWrapper, tslib_1.__assign({}, props), function (config, plugin) { return react_1.default.createElement(GroupComponent, tslib_1.__assign({}, props, { plugin: plugin, config: config })); }));
};
exports.GroupService = GroupService;
//# sourceMappingURL=group.js.map