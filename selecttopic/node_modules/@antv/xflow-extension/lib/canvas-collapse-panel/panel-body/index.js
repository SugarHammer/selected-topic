"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsePanelBody = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var dnd_hook_1 = require("./dnd-hook");
var panel_search_list_1 = require("./panel-search-list");
var collapse_1 = require("./collapse");
var CollapsePanelBody = function (props) {
    var state = props.state, prefixClz = props.prefixClz, onActiveKeyChange = props.onActiveKeyChange;
    var _a = (0, dnd_hook_1.useGraphDnd)(props), graphConfig = _a.graphConfig, onMouseDown = _a.onMouseDown, modelService = _a.modelService, commandService = _a.commandService;
    var searchResult = state.searchResult, collapseData = state.collapseData, keyword = state.keyword;
    return (react_1.default.createElement("div", { className: "".concat(prefixClz, "-body"), style: props.style },
        keyword.length === 0 && (react_1.default.createElement(collapse_1.CollapseList, { onActiveKeyChange: onActiveKeyChange, collapseData: collapseData, onMouseDown: onMouseDown, modelService: modelService, commandService: commandService, graphConfig: graphConfig, prefixClz: prefixClz })),
        keyword.length > 0 && (react_1.default.createElement(panel_search_list_1.SearchResult, { searchResult: searchResult, onMouseDown: onMouseDown, modelService: modelService, commandService: commandService, graphConfig: graphConfig, prefixClz: prefixClz }))));
};
exports.CollapsePanelBody = CollapsePanelBody;
//# sourceMappingURL=index.js.map