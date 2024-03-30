"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSubMenu = void 0;
var react_1 = __importDefault(require("react"));
var context_1 = require("./context");
var item_1 = require("./item");
var MenuSubMenu = function (props) {
    var hotkey = props.hotkey, children = props.children, others = __rest(props, ["hotkey", "children"]);
    return (react_1.default.createElement(context_1.MenuContext.Consumer, null, function (context) {
        var prefixCls = context.prefixCls;
        var wrapProps = item_1.MenuItemInner.getProps(__assign({ context: context }, props), prefixCls + "-submenu");
        return (react_1.default.createElement("div", __assign({}, wrapProps), item_1.MenuItemInner.getContent(__assign({ context: context }, others), null, react_1.default.createElement("span", { className: prefixCls + "-submenu-arrow" }), react_1.default.createElement("div", { className: prefixCls + "-submenu-menu" }, children))));
    }));
};
exports.MenuSubMenu = MenuSubMenu;
//# sourceMappingURL=submenu.js.map