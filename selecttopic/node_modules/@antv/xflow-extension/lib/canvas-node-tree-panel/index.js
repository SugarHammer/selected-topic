"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsNodeTreePanel = exports.NsNodeTreePanelModel = exports.NodeTreePanel = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var base_panel_1 = require("../base-panel");
var panel_body_1 = require("./panel-body");
var panel_header_1 = require("./panel-header");
var panel_footer_1 = require("./panel-footer");
var utils_1 = require("./utils");
var service_1 = require("./service");
Object.defineProperty(exports, "NsNodeTreePanelModel", { enumerable: true, get: function () { return service_1.NsNodeTreePanelModel; } });
var NsNodeTreePanel = tslib_1.__importStar(require("./interface"));
exports.NsNodeTreePanel = NsNodeTreePanel;
var NodeTreePanelMain = function (props) {
    var _a = (0, utils_1.usePanelLyaoutStyle)(props), headerStyle = _a.headerStyle, bodyStyle = _a.bodyStyle, footerStyle = _a.footerStyle;
    var _b = (0, service_1.useTreePanelData)(props), state = _b.state, onFolderExpand = _b.onFolderExpand, onKeywordChange = _b.onKeywordChange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(panel_header_1.NodePanelHeader, tslib_1.__assign({}, props, { state: state, style: headerStyle, onKeywordChange: onKeywordChange })),
        react_1.default.createElement(panel_body_1.NodePanelBody, tslib_1.__assign({}, props, { state: state, style: bodyStyle, onFolderExpand: onFolderExpand })),
        react_1.default.createElement(panel_footer_1.NodePanelFooter, tslib_1.__assign({}, props, { state: state, style: footerStyle }))));
};
var NodeTreePanel = function (props) {
    var prefixClz = (0, xflow_core_1.useXflowPrefixCls)('node-dnd-panel');
    return (react_1.default.createElement(base_panel_1.WorkspacePanel, tslib_1.__assign({}, props, { className: prefixClz }),
        react_1.default.createElement(NodeTreePanelMain, tslib_1.__assign({}, props, { prefixClz: prefixClz }))));
};
exports.NodeTreePanel = NodeTreePanel;
//# sourceMappingURL=index.js.map