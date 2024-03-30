import React from 'react';
import { useGraphDnd } from './dnd-hook';
import { SearchResult } from './panel-search-list';
import { CollapseList } from './collapse';
export const CollapsePanelBody = props => {
    const { state, prefixClz, onActiveKeyChange } = props;
    const { graphConfig, onMouseDown, modelService, commandService } = useGraphDnd(props);
    const { searchResult, collapseData, keyword } = state;
    return (React.createElement("div", { className: `${prefixClz}-body`, style: props.style },
        keyword.length === 0 && (React.createElement(CollapseList, { onActiveKeyChange: onActiveKeyChange, collapseData: collapseData, onMouseDown: onMouseDown, modelService: modelService, commandService: commandService, graphConfig: graphConfig, prefixClz: prefixClz })),
        keyword.length > 0 && (React.createElement(SearchResult, { searchResult: searchResult, onMouseDown: onMouseDown, modelService: modelService, commandService: commandService, graphConfig: graphConfig, prefixClz: prefixClz }))));
};
//# sourceMappingURL=index.js.map