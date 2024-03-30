"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var x6_react_components_1 = require("@antv/x6-react-components");
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var ToolbarItem = function (props) {
    var _a;
    var app = (0, xflow_core_1.useXFlowApp)();
    var item = props.item, layout = props.layout;
    var clz = (0, classnames_1.default)((_a = {},
        _a['xflow-toolbar-item'] = true,
        _a));
    var text = layout === 'vertical' ? '' : item.text;
    var icon = undefined;
    if (item.icon) {
        icon = item.icon;
    }
    else if (item.iconName) {
        var Icon = xflow_core_2.IconStore.get(item.iconName);
        icon = react_1.default.createElement(Icon, null);
    }
    var ToolbarItemWrap = item.render;
    var _b = item.isEnabled, isEnabled = _b === void 0 ? true : _b;
    var commandService = app.commandService, modelService = app.modelService;
    var onItemClick = function () {
        if (item.onClick) {
            item.onClick({ toolbarItem: item, commandService: commandService, modelService: modelService });
        }
    };
    if (ToolbarItemWrap) {
        return (react_1.default.createElement(ToolbarItemWrap, tslib_1.__assign({}, item, { onClick: onItemClick }),
            react_1.default.createElement(x6_react_components_1.Toolbar.Item, tslib_1.__assign({}, item, { icon: icon, text: text, className: clz, disabled: !isEnabled, tooltip: item.tooltip || item.text, tooltipProps: tslib_1.__assign({ placement: layout === 'vertical' ? 'left' : 'bottom' }, item.tooltipProps), onClick: function () { } }))));
    }
    return (react_1.default.createElement(x6_react_components_1.Toolbar.Item, tslib_1.__assign({}, item, { icon: icon, text: text, className: clz, hidden: !item, disabled: !isEnabled, tooltip: item.tooltip || item.text, onClick: onItemClick, tooltipProps: tslib_1.__assign(tslib_1.__assign({}, item.tooltipProps), { placement: layout === 'vertical' ? 'left' : 'bottom' }) })));
};
exports.ToolbarItem = ToolbarItem;
//# sourceMappingURL=toolbar-item.js.map