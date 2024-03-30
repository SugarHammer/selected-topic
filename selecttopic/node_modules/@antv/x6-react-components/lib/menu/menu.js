"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var item_1 = require("./item");
var divider_1 = require("./divider");
var context_1 = require("./context");
var submenu_1 = require("./submenu");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (name, e) {
            if (_this.props.stopPropagation && e != null) {
                e.stopPropagation();
            }
            if (_this.props.onClick) {
                _this.props.onClick(name);
            }
        };
        _this.registerHotkey = function (hotkey, handler) {
            if (_this.props.registerHotkey) {
                _this.props.registerHotkey(hotkey, handler);
            }
        };
        _this.unregisterHotkey = function (hotkey, handler) {
            if (_this.props.unregisterHotkey) {
                _this.props.unregisterHotkey(hotkey, handler);
            }
        };
        return _this;
    }
    Menu.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, children = _b.children, hasIcon = _b.hasIcon;
        var baseCls = prefixCls + "-menu";
        var ContextProvider = context_1.MenuContext.Provider;
        var contextValue = {
            prefixCls: baseCls,
            onClick: this.onClick,
            registerHotkey: this.registerHotkey,
            unregisterHotkey: this.unregisterHotkey,
        };
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(baseCls, (_a = {},
                _a[baseCls + "-has-icon"] = hasIcon,
                _a), className) },
            react_1.default.createElement(ContextProvider, { value: contextValue }, children)));
    };
    return Menu;
}(react_1.default.PureComponent));
exports.Menu = Menu;
(function (Menu) {
    Menu.Item = item_1.MenuItem;
    Menu.Divider = divider_1.MenuDivider;
    Menu.SubMenu = submenu_1.MenuSubMenu;
    Menu.defaultProps = {
        prefixCls: 'x6',
        stopPropagation: false,
    };
})(Menu = exports.Menu || (exports.Menu = {}));
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map