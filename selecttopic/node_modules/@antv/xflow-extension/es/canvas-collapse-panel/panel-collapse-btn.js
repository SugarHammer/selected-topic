import React from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';
/** collapseBtn */
export const NodePanelCollapseBtn = props => {
    const { prefixClz, onCollapseBtnClick, isCollapsed, collapseButtonStyle, style } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `${prefixClz}-header`, style: Object.assign(Object.assign({}, style), collapseButtonStyle), onClick: onCollapseBtnClick },
            React.createElement(CaretLeftOutlined, { rotate: isCollapsed ? 180 : 0 }))));
};
//# sourceMappingURL=panel-collapse-btn.js.map