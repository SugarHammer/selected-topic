import React from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';
import { usePositionStyle } from '@antv/xflow-core';
// component
import { Toolbar } from '@antv/x6-react-components';
import { ToolbarGroup } from './toolbar-group';
import { useToolbarModel } from '../service';
import classNames from 'classnames';
/** render toolbar */
const ToolbarRender = props => {
    const { idx, groups, layout, toolbarOptions } = props;
    const { hoverEffect = true } = toolbarOptions;
    return (React.createElement(Toolbar, { hoverEffect: hoverEffect }, groups.map((g, gIdx) => {
        const key = idx + gIdx;
        return React.createElement(ToolbarGroup, { key: key, group: g, layout: layout });
    })));
};
const InnerRender = props => {
    const { isModelReady, state } = useToolbarModel(props);
    const positionStyle = usePositionStyle(props.position);
    const { mainGroups = [], extraGroups = [], layout, customRender } = state;
    const containerClz = classNames(props.className, layout, 'xflow-toolbar');
    const clz = classnames({
        [layout]: true,
        ['xflow-toolbar-root']: true,
    });
    // loading
    if (!isModelReady) {
        return (React.createElement("div", { className: containerClz, style: Object.assign(Object.assign({}, positionStyle), props.style) },
            React.createElement(Spin, { spinning: true, size: "small" })));
    }
    // render custom component
    if (customRender) {
        return (React.createElement("div", { className: containerClz, style: Object.assign(Object.assign({}, positionStyle), props.style) }, React.createElement(customRender, { config: state })));
    }
    // render toolbars
    return (React.createElement("div", { className: containerClz, style: Object.assign(Object.assign({}, positionStyle), props.style) },
        React.createElement("div", { className: clz },
            mainGroups.length > 0 && (React.createElement(ToolbarRender, { idx: "mainGroups", groups: mainGroups, layout: layout, toolbarOptions: state })),
            extraGroups.length > 0 && (React.createElement(ToolbarRender, { idx: "extraGroups", groups: extraGroups, layout: layout, toolbarOptions: state })))));
};
/** connect 数据 */
export const XFlowToolbar = React.memo(InnerRender);
//# sourceMappingURL=index.js.map