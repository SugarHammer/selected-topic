import React from 'react';
import classnames from 'classnames';
import { Toolbar } from '@antv/x6-react-components';
import { uuidv4 } from '@antv/xflow-core';
import { ToolbarItem } from './toolbar-item';
export const ToolbarGroup = props => {
    const { group, layout } = props;
    const groupKey = React.useMemo(() => {
        return group.name || uuidv4();
    }, [group.name]);
    const { items = [] } = group;
    if (items.length === 0) {
        return null;
    }
    const clz = classnames({
        ['xflow-toolbar-group']: true,
    });
    return (React.createElement(Toolbar.Group, { className: clz, key: groupKey }, items.map(item => (React.createElement(ToolbarItem, { item: item, layout: layout, key: item.id })))));
};
//# sourceMappingURL=toolbar-group.js.map