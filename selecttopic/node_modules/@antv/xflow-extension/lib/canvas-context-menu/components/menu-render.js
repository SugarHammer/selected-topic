"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMenuOptions = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var x6_react_components_1 = require("@antv/x6-react-components");
var renderMenuOptions = function (props) {
    var idx = props.idx, menuItem = props.menuOptions, target = props.target, modelService = props.modelService, commandService = props.commandService, onHide = props.onHide;
    var id = menuItem.id, label = menuItem.label, _a = menuItem.isEnabled, isEnabled = _a === void 0 ? true : _a, _b = menuItem.isVisible, isVisible = _b === void 0 ? true : _b, iconName = menuItem.iconName, _c = menuItem.submenu, submenu = _c === void 0 ? [] : _c, active = menuItem.active, hotkey = menuItem.hotkey, render = menuItem.render, onClick = menuItem.onClick;
    if (!isVisible) {
        return null;
    }
    /** 分隔符：separator */
    if (menuItem.type === 'separator') {
        return react_1.default.createElement(x6_react_components_1.Menu.Divider, { key: String(menuItem.id) + idx });
    }
    /** 根结点：root */
    if (menuItem.type === 'root') {
        return (react_1.default.createElement(x6_react_components_1.Menu, { hasIcon: true }, submenu.map(function (item, submenuIdx) {
            return (0, exports.renderMenuOptions)({
                idx: submenuIdx,
                target: target,
                commandService: commandService,
                modelService: modelService,
                menuOptions: item,
                onHide: onHide,
            });
        })));
    }
    /** 子菜单：submenu */
    if (menuItem.submenu && Array.isArray(menuItem.submenu)) {
        var Icon_1 = xflow_core_1.IconStore.get(iconName);
        var isDisable = !isEnabled;
        return (react_1.default.createElement(x6_react_components_1.Menu.SubMenu, { key: String(id), text: label, disabled: isDisable || submenu.length === 0, icon: Icon_1 ? react_1.default.createElement(Icon_1, null) : null, active: active, hotkey: hotkey }, submenu.map(function (item, submenuIdx) {
            return (0, exports.renderMenuOptions)({
                idx: submenuIdx,
                target: target,
                commandService: commandService,
                modelService: modelService,
                menuOptions: item,
                onHide: onHide,
            });
        })));
    }
    /** 叶子节点 */
    var Icon = xflow_core_1.IconStore.get(iconName);
    if (render) {
        return react_1.default.createElement(render, { menuItem: menuItem, target: target, commandService: commandService, modelService: modelService, onHide: onHide }, [
            react_1.default.createElement(x6_react_components_1.Menu.Item, { key: String(id), text: label, disabled: !isEnabled, icon: Icon ? react_1.default.createElement(Icon, null) : null, active: active, hotkey: hotkey }),
        ]);
    }
    return (react_1.default.createElement(x6_react_components_1.Menu.Item, { key: String(id), text: label, disabled: !isEnabled, icon: Icon ? react_1.default.createElement(Icon, null) : null, active: active, hotkey: hotkey, onClick: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, onClick({ menuItem: menuItem, target: target, commandService: commandService, modelService: modelService })];
                    case 1:
                        _a.sent();
                        onHide && onHide();
                        return [2 /*return*/];
                }
            });
        }); } }));
};
exports.renderMenuOptions = renderMenuOptions;
//# sourceMappingURL=menu-render.js.map