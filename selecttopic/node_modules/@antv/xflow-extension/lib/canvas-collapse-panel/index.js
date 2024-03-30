"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsNodeCollapsePanel = exports.NsCollapsePanelModel = exports.NodeCollapsePanel = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var base_panel_1 = require("../base-panel");
var panel_body_1 = require("./panel-body");
var panel_header_1 = require("./panel-header");
var panel_footer_1 = require("./panel-footer");
var panel_collapse_btn_1 = require("./panel-collapse-btn");
var utils_1 = require("./utils");
var service_1 = require("./service");
var interface_1 = require("./interface");
Object.defineProperty(exports, "NsCollapsePanelModel", { enumerable: true, get: function () { return interface_1.NsCollapsePanelModel; } });
var NsNodeCollapsePanel = tslib_1.__importStar(require("./interface"));
exports.NsNodeCollapsePanel = NsNodeCollapsePanel;
var CollapsePanelMain = function (props) {
    var _a = (0, utils_1.usePanelLyaoutStyle)(props), headerStyle = _a.headerStyle, bodyStyle = _a.bodyStyle, footerStyle = _a.footerStyle;
    var _b = (0, service_1.useCollapsePanelData)(props), state = _b.state, onActiveKeyChange = _b.onActiveKeyChange, onKeywordChange = _b.onKeywordChange;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(panel_header_1.NodePanelHeader, tslib_1.__assign({}, props, { state: state, style: headerStyle, onKeywordChange: onKeywordChange })),
        react_1.default.createElement(panel_body_1.CollapsePanelBody, tslib_1.__assign({}, props, { state: state, style: bodyStyle, onActiveKeyChange: onActiveKeyChange })),
        react_1.default.createElement(panel_footer_1.NodePanelFooter, tslib_1.__assign({}, props, { state: state, style: footerStyle }))));
};
var NodeCollapsePanel = function (props) {
    var position = props.position, collapsible = props.collapsible, onCollapseChange = props.onCollapseChange;
    var _a = position.width, width = _a === void 0 ? 200 : _a, left = position.left;
    var prefixClz = (0, xflow_core_1.useXflowPrefixCls)('collapse-panel');
    var _b = (0, react_1.useState)(false), isCollapsed = _b[0], setIsCollapsed = _b[1];
    var handleBtnClick = (0, react_1.useCallback)(function () {
        setIsCollapsed(!isCollapsed);
        onCollapseChange(!isCollapsed);
    }, [isCollapsed, onCollapseChange]);
    return (react_1.default.createElement(base_panel_1.WorkspacePanel, tslib_1.__assign({}, props, { className: prefixClz, position: tslib_1.__assign(tslib_1.__assign({}, position), { left: !isCollapsed ? left : -width }), style: { transition: 'left 0.5s' } }),
        react_1.default.createElement(CollapsePanelMain, tslib_1.__assign({}, props, { prefixClz: prefixClz })),
        collapsible && (react_1.default.createElement(panel_collapse_btn_1.NodePanelCollapseBtn, tslib_1.__assign({}, props, { prefixClz: prefixClz, isCollapsed: isCollapsed, onCollapseBtnClick: handleBtnClick, style: {
                position: 'absolute',
                zIndex: 1,
                width: 13,
                right: -13,
                bottom: 20,
                padding: '12px 0px',
                textAlign: 'center',
                borderWidth: '1px 1px 1px 0',
                borderStyle: 'solid solid solid',
                borderColor: 'rgb(232, 232, 232) rgb(232, 232, 232) rgb(232, 232, 232)',
                cursor: 'pointer',
            } })))));
};
exports.NodeCollapsePanel = NodeCollapsePanel;
//# sourceMappingURL=index.js.map