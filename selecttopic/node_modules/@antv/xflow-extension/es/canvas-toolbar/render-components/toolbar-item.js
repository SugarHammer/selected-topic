import React from 'react';
import classnames from 'classnames';
import { Toolbar } from '@antv/x6-react-components';
import { useXFlowApp } from '@antv/xflow-core';
import { IconStore } from '@antv/xflow-core';
export const ToolbarItem = props => {
    const app = useXFlowApp();
    const { item, layout } = props;
    const clz = classnames({
        ['xflow-toolbar-item']: true,
    });
    const text = layout === 'vertical' ? '' : item.text;
    let icon = undefined;
    if (item.icon) {
        icon = item.icon;
    }
    else if (item.iconName) {
        const Icon = IconStore.get(item.iconName);
        icon = React.createElement(Icon, null);
    }
    const ToolbarItemWrap = item.render;
    const { isEnabled = true } = item;
    const { commandService, modelService } = app;
    const onItemClick = () => {
        if (item.onClick) {
            item.onClick({ toolbarItem: item, commandService, modelService });
        }
    };
    if (ToolbarItemWrap) {
        return (React.createElement(ToolbarItemWrap, Object.assign({}, item, { onClick: onItemClick }),
            React.createElement(Toolbar.Item, Object.assign({}, item, { icon: icon, text: text, className: clz, disabled: !isEnabled, tooltip: item.tooltip || item.text, tooltipProps: Object.assign({ placement: layout === 'vertical' ? 'left' : 'bottom' }, item.tooltipProps), onClick: () => { } }))));
    }
    return (React.createElement(Toolbar.Item, Object.assign({}, item, { icon: icon, text: text, className: clz, hidden: !item, disabled: !isEnabled, tooltip: item.tooltip || item.text, onClick: onItemClick, tooltipProps: Object.assign(Object.assign({}, item.tooltipProps), { placement: layout === 'vertical' ? 'left' : 'bottom' }) })));
};
//# sourceMappingURL=toolbar-item.js.map