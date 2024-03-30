"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePanelFooter = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var context_1 = require("../base-panel/context");
var NodePanelFooter = function (props) {
    var prefixClz = props.prefixClz;
    var propsProxy = (0, context_1.usePanelContext)().propsProxy;
    var panelProps = propsProxy.getValue();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-footer"), style: props.style }, panelProps.footer && react_1.default.isValidElement(panelProps.footer) && panelProps.footer)));
};
exports.NodePanelFooter = NodePanelFooter;
//# sourceMappingURL=panel-footer.js.map