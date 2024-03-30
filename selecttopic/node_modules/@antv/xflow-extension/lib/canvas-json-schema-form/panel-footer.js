"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelFooter = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var context_1 = require("../base-panel/context");
var PanelFooter = function (props) {
    var state = props.state;
    var propsProxy = (0, context_1.usePanelContext)().propsProxy;
    var panelProps = propsProxy.getValue();
    var app = (0, xflow_core_1.useXFlowApp)();
    /** 是否有 custom footer */
    var isValidFooterFC = panelProps.footer && typeof panelProps.footer === 'function';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(props.prefixClz, "-footer"), style: props.style },
            isValidFooterFC &&
                react_1.default.createElement(panelProps.footer, tslib_1.__assign(tslib_1.__assign({}, props), { headerStyle: {}, bodyStyle: {}, footerStyle: props.style, targetData: state.targetData, targetType: state.targetType, modelService: app.modelService, commandService: app.commandService })),
            !panelProps.footer && (react_1.default.createElement("div", { className: "".concat(props.prefixClz, "-footer-title") }, panelProps.footerText)))));
};
exports.PanelFooter = PanelFooter;
//# sourceMappingURL=panel-footer.js.map