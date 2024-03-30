"use strict";
/* eslint-disable jsx-a11y/click-events-have-key-events  */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
exports.MenubarItem = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var addEventListener_1 = __importDefault(require("rc-util/lib/Dom/addEventListener"));
var context_1 = require("./context");
var cacheDeactiveMap = new WeakMap();
var MenubarItemInner = /** @class */ (function (_super) {
    __extends(MenubarItemInner, _super);
    function MenubarItemInner(props) {
        var _this = _super.call(this, props) || this;
        _this.onDocumentClick = function () {
            _this.deactive();
        };
        _this.onClick = function (e) {
            _this.props.context.activeMenubar();
            _this.removeDeactive(e.currentTarget.parentElement);
            _this.active();
        };
        _this.onMouseEnter = function (e) {
            if (_this.props.context.menubarActived &&
                !_this.state.active &&
                !_this.isPrevMenuHiddening(e)) {
                var currentTarget_1 = e.currentTarget;
                var childNodes = currentTarget_1.parentElement.childNodes;
                childNodes.forEach(function (child) {
                    if (child === currentTarget_1) {
                        _this.removeDeactive(child);
                    }
                    else {
                        _this.callDeactive(child);
                    }
                });
                _this.active();
            }
        };
        _this.onMouseLeave = function (e) {
            var relatedTarget = e.relatedTarget;
            var currentTarget = e.currentTarget;
            if (_this.props.context.menubarActived && _this.state.active) {
                var childNodes = currentTarget.parentElement.childNodes;
                var shoudDeactive = false;
                if (relatedTarget !== window) {
                    for (var i = 0, l = childNodes.length; i < l; i += 1) {
                        var child = childNodes[i];
                        if (child === relatedTarget ||
                            child.contains(relatedTarget)) {
                            shoudDeactive = true;
                            break;
                        }
                    }
                }
                if (shoudDeactive) {
                    _this.deactive();
                }
                else {
                    // 缓存一下，当再次 hover 到其他菜单时被调用
                    _this.cacheDeactive(currentTarget);
                }
            }
        };
        _this.active = function () {
            _this.setState({ active: true });
            if (!_this.removeDocClickEvent) {
                _this.removeDocClickEvent = (0, addEventListener_1.default)(document.documentElement, 'click', _this.onDocumentClick).remove;
            }
        };
        _this.deactive = function () {
            _this.setState({ active: false });
            if (_this.removeDocClickEvent) {
                _this.removeDocClickEvent();
                _this.removeDocClickEvent = null;
            }
        };
        _this.popupClassName = props.context.prefixCls + "-item-dropdown";
        _this.state = { active: false };
        return _this;
    }
    MenubarItemInner.prototype.isPrevMenuHiddening = function (e) {
        var toElement = e.nativeEvent.toElement;
        if (toElement && toElement.className === this.popupClassName) {
            return true;
        }
        var currentTarget = e.currentTarget;
        var childNodes = currentTarget.parentElement.childNodes;
        for (var i = 0, l = childNodes.length; i < l; i += 1) {
            var child = childNodes[i];
            var popupElem = child.querySelector("." + this.popupClassName);
            if (popupElem.contains(toElement)) {
                return true;
            }
        }
        return false;
    };
    MenubarItemInner.prototype.cacheDeactive = function (elem) {
        cacheDeactiveMap.set(elem, this.deactive);
    };
    MenubarItemInner.prototype.callDeactive = function (elem) {
        if (cacheDeactiveMap.has(elem)) {
            cacheDeactiveMap.get(elem)();
            cacheDeactiveMap.delete(elem);
        }
    };
    MenubarItemInner.prototype.removeDeactive = function (elem) {
        cacheDeactiveMap.delete(elem);
    };
    MenubarItemInner.prototype.render = function () {
        var _a, _b;
        var _c = this.props, text = _c.text, children = _c.children, hidden = _c.hidden;
        var _d = this.props.context, prefixCls = _d.prefixCls, menubarActived = _d.menubarActived;
        var currentMenuActived = menubarActived && this.state.active;
        var baseCls = prefixCls + "-item";
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(baseCls, (_a = {},
                _a[baseCls + "-hidden"] = hidden,
                _a[baseCls + "-hover"] = menubarActived,
                _a[baseCls + "-active"] = currentMenuActived,
                _a)), onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(baseCls + "-text", (_b = {},
                    _b[baseCls + "-text-active"] = currentMenuActived,
                    _b)), onClick: this.onClick }, text),
            react_1.default.createElement("div", { className: this.popupClassName }, children)));
    };
    return MenubarItemInner;
}(react_1.default.PureComponent));
var MenubarItem = function (props) { return (react_1.default.createElement(context_1.MenubarContext.Consumer, null, function (context) { return react_1.default.createElement(MenubarItemInner, __assign({ context: context }, props)); })); };
exports.MenubarItem = MenubarItem;
//# sourceMappingURL=item.js.map