import React from 'react';
import { Empty } from 'antd';
import { PanelNode } from './panel-node';
export const SearchResult = props => {
    const { searchResult, prefixClz, onMouseDown, modelService, commandService, graphConfig } = props;
    if (searchResult.length === 0) {
        return React.createElement(Empty, { style: { marginTop: '24px' } });
    }
    return (React.createElement("ul", { className: `xflow-collapse-search-list` }, searchResult.map(item => (React.createElement("li", { className: `xflow-collapse-search-list-item ${item.isDisabled ? 'disabled' : ''}`, key: item.id },
        React.createElement(PanelNode, { item: item, onMouseDown: onMouseDown(item), popoverContent: item.popoverContent, prefixClz: prefixClz, modelService: modelService, commandService: commandService, graphConfig: graphConfig }))))));
};
//# sourceMappingURL=panel-search-list.js.map