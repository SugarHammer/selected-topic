"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarGroup = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var x6_react_components_1 = require("@antv/x6-react-components");
var xflow_core_1 = require("@antv/xflow-core");
var toolbar_item_1 = require("./toolbar-item");
var ToolbarGroup = function (props) {
    var _a;
    var group = props.group, layout = props.layout;
    var groupKey = react_1.default.useMemo(function () {
        return group.name || (0, xflow_core_1.uuidv4)();
    }, [group.name]);
    var _b = group.items, items = _b === void 0 ? [] : _b;
    if (items.length === 0) {
        return null;
    }
    var clz = (0, classnames_1.default)((_a = {},
        _a['xflow-toolbar-group'] = true,
        _a));
    return (react_1.default.createElement(x6_react_components_1.Toolbar.Group, { className: clz, key: groupKey }, items.map(function (item) { return (react_1.default.createElement(toolbar_item_1.ToolbarItem, { item: item, layout: layout, key: item.id })); })));
};
exports.ToolbarGroup = ToolbarGroup;
//# sourceMappingURL=toolbar-group.js.map