"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var panel_node_1 = require("./panel-node");
var SearchResult = function (props) {
    var searchResult = props.searchResult, prefixClz = props.prefixClz, onMouseDown = props.onMouseDown, modelService = props.modelService, commandService = props.commandService, graphConfig = props.graphConfig;
    if (searchResult.length === 0) {
        return react_1.default.createElement(antd_1.Empty, { style: { marginTop: '24px' } });
    }
    return (react_1.default.createElement("ul", { className: "xflow-collapse-search-list" }, searchResult.map(function (item) { return (react_1.default.createElement("li", { className: "xflow-collapse-search-list-item ".concat(item.isDisabled ? 'disabled' : ''), key: item.id },
        react_1.default.createElement(panel_node_1.PanelNode, { item: item, onMouseDown: onMouseDown(item), popoverContent: item.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }))); })));
};
exports.SearchResult = SearchResult;
//# sourceMappingURL=panel-search-list.js.map