"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHeader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var context_1 = require("../base-panel/context");
var PanelHeader = function (props) {
    var prefixClz = props.prefixClz, hasSchema = props.hasSchema, state = props.state;
    var propsProxy = (0, context_1.usePanelContext)().propsProxy;
    var panelProps = propsProxy.getValue();
    var app = (0, xflow_core_1.useXFlowApp)();
    /** form会使用tab做为header，需要让出位置*/
    if (hasSchema) {
        return null;
    }
    /** 是否有 custom header */
    var isValidHeaderFC = panelProps.header && typeof panelProps.header === 'function';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-header"), style: props.style },
            isValidHeaderFC &&
                react_1.default.createElement(panelProps.header, tslib_1.__assign(tslib_1.__assign({}, props), { headerStyle: props.style, bodyStyle: {}, footerStyle: {}, targetData: state.targetData, targetType: state.targetType, modelService: app.modelService, commandService: app.commandService })),
            !panelProps.header && (react_1.default.createElement("div", { className: "".concat(prefixClz, "-header-title") }, panelProps.headerText || 'Panel')))));
};
exports.PanelHeader = PanelHeader;
//# sourceMappingURL=panel-header.js.map