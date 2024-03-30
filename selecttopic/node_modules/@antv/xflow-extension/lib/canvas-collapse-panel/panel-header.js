"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePanelHeader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var context_1 = require("../base-panel/context");
var NodePanelHeader = function (props) {
    var prefixClz = props.prefixClz, onKeywordChange = props.onKeywordChange, state = props.state;
    var propsProxy = (0, context_1.usePanelContext)().propsProxy;
    var panelProps = propsProxy.getValue();
    var onChange = function (e) {
        var panelNodes = state.collapseData.reduce(function (acc, item) {
            if (item.children) {
                acc.push.apply(acc, item.children);
            }
            return acc;
        }, []);
        onKeywordChange(e.target.value, panelNodes);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(prefixClz, "-header"), style: props.style },
            panelProps.header && react_1.default.isValidElement(panelProps.header) && panelProps.header,
            panelProps.searchService && (react_1.default.createElement("div", { className: "".concat(prefixClz, "-header-search") },
                react_1.default.createElement(antd_1.Input, { placeholder: "\u641C\u7D22\u7EC4\u4EF6", allowClear: true, onChange: function (e) { return onChange(e); }, style: { width: '100%', border: 0 } }))))));
};
exports.NodePanelHeader = NodePanelHeader;
//# sourceMappingURL=panel-header.js.map