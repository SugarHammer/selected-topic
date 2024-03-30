import { __awaiter } from "tslib";
import React from 'react';
import { 
// app service
IconStore, } from '@antv/xflow-core';
import { Menu } from '@antv/x6-react-components';
export const renderMenuOptions = (props) => {
    const { idx, menuOptions: menuItem, target, modelService, commandService, onHide } = props;
    const { id, label, isEnabled = true, isVisible = true, iconName, submenu = [], active, hotkey, render, onClick, } = menuItem;
    if (!isVisible) {
        return null;
    }
    /** 分隔符：separator */
    if (menuItem.type === 'separator') {
        return React.createElement(Menu.Divider, { key: String(menuItem.id) + idx });
    }
    /** 根结点：root */
    if (menuItem.type === 'root') {
        return (React.createElement(Menu, { hasIcon: true }, submenu.map((item, submenuIdx) => renderMenuOptions({
            idx: submenuIdx,
            target,
            commandService,
            modelService,
            menuOptions: item,
            onHide,
        }))));
    }
    /** 子菜单：submenu */
    if (menuItem.submenu && Array.isArray(menuItem.submenu)) {
        const Icon = IconStore.get(iconName);
        const isDisable = !isEnabled;
        return (React.createElement(Menu.SubMenu, { key: String(id), text: label, disabled: isDisable || submenu.length === 0, icon: Icon ? React.createElement(Icon, null) : null, active: active, hotkey: hotkey }, submenu.map((item, submenuIdx) => renderMenuOptions({
            idx: submenuIdx,
            target,
            commandService,
            modelService,
            menuOptions: item,
            onHide,
        }))));
    }
    /** 叶子节点 */
    const Icon = IconStore.get(iconName);
    if (render) {
        return React.createElement(render, { menuItem, target, commandService, modelService, onHide }, [
            React.createElement(Menu.Item, { key: String(id), text: label, disabled: !isEnabled, icon: Icon ? React.createElement(Icon, null) : null, active: active, hotkey: hotkey }),
        ]);
    }
    return (React.createElement(Menu.Item, { key: String(id), text: label, disabled: !isEnabled, icon: Icon ? React.createElement(Icon, null) : null, active: active, hotkey: hotkey, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
            yield onClick({ menuItem, target, commandService, modelService });
            onHide && onHide();
        }) }));
};
//# sourceMappingURL=menu-render.js.map