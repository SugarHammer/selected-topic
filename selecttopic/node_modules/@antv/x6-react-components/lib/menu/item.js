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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = exports.MenuItemInner = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var context_1 = require("./context");
var MenuItemInner = /** @class */ (function (_super) {
    __extends(MenuItemInner, _super);
    function MenuItemInner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onHotkey = function () {
            _this.triggerHandler();
        };
        _this.onClick = function (e) {
            _this.triggerHandler(e);
        };
        return _this;
    }
    MenuItemInner.prototype.componentDidMount = function () {
        var hotkey = this.props.hotkey;
        if (hotkey) {
            this.props.context.registerHotkey(hotkey, this.onHotkey);
        }
    };
    MenuItemInner.prototype.componentWillUnmount = function () {
        var hotkey = this.props.hotkey;
        if (hotkey) {
            this.props.context.unregisterHotkey(hotkey, this.onHotkey);
        }
    };
    MenuItemInner.prototype.triggerHandler = function (e) {
        if (!this.props.disabled && !this.props.hidden) {
            if (this.props.name) {
                this.props.context.onClick(this.props.name, e);
            }
            if (this.props.onClick) {
                this.props.onClick();
            }
        }
    };
    MenuItemInner.prototype.render = function () {
        return (react_1.default.createElement("div", __assign({}, MenuItemInner.getProps(this.props)), MenuItemInner.getContent(this.props, this.onClick)));
    };
    return MenuItemInner;
}(react_1.default.PureComponent));
exports.MenuItemInner = MenuItemInner;
(function (MenuItemInner) {
    function getProps(props, extraCls) {
        var _a;
        var className = props.className, disabled = props.disabled, active = props.active, hidden = props.hidden;
        var prefixCls = props.context.prefixCls;
        var baseCls = prefixCls + "-item";
        return {
            className: (0, classnames_1.default)(baseCls, extraCls, (_a = {},
                _a[baseCls + "-active"] = active,
                _a[baseCls + "-hidden"] = hidden,
                _a[baseCls + "-disabled"] = disabled,
                _a), className),
        };
    }
    MenuItemInner.getProps = getProps;
    function getContent(props, onClick, innerExtra, outerExtra) {
        var icon = props.icon, text = props.text, hotkey = props.hotkey, children = props.children;
        var prefixCls = props.context.prefixCls;
        var baseCls = prefixCls + "-item";
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("button", { type: "button", className: baseCls + "-button", onClick: onClick },
                icon && react_1.default.isValidElement(icon) && (react_1.default.createElement("span", { className: baseCls + "-icon" }, icon)),
                react_1.default.createElement("span", { className: baseCls + "-text" }, text || children),
                hotkey && react_1.default.createElement("span", { className: baseCls + "-hotkey" }, hotkey),
                innerExtra),
            outerExtra));
    }
    MenuItemInner.getContent = getContent;
})(MenuItemInner = exports.MenuItemInner || (exports.MenuItemInner = {}));
exports.MenuItemInner = MenuItemInner;
var MenuItem = function (props) { return (react_1.default.createElement(context_1.MenuContext.Consumer, null, function (context) { return react_1.default.createElement(MenuItemInner, __assign({ context: context }, props)); })); };
exports.MenuItem = MenuItem;
//# sourceMappingURL=item.js.map