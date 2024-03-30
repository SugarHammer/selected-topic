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
exports.Menubar = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var addEventListener_1 = __importDefault(require("rc-util/lib/Dom/addEventListener"));
var item_1 = require("./item");
var context_1 = require("./context");
var Menubar = /** @class */ (function (_super) {
    __extends(Menubar, _super);
    function Menubar(props) {
        var _this = _super.call(this, props) || this;
        _this.onDocumentClick = function () {
            _this.setState({ active: false });
            _this.unbindDocEvent();
        };
        _this.activeMenubar = function () {
            _this.setState({ active: true });
            if (!_this.removeDocClickEvent) {
                _this.removeDocClickEvent = (0, addEventListener_1.default)(document.documentElement, 'click', _this.onDocumentClick).remove;
            }
        };
        _this.state = { active: false };
        return _this;
    }
    Menubar.prototype.componentWillUnmount = function () {
        this.unbindDocEvent();
    };
    Menubar.prototype.unbindDocEvent = function () {
        if (this.removeDocClickEvent) {
            this.removeDocClickEvent();
            this.removeDocClickEvent = null;
        }
    };
    Menubar.prototype.render = function () {
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, children = _a.children, extra = _a.extra;
        var baseCls = prefixCls + "-menubar";
        var contextValue = {
            prefixCls: baseCls,
            activeMenubar: this.activeMenubar,
            menubarActived: this.state.active === true,
        };
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(baseCls, className) },
            react_1.default.createElement("div", { className: baseCls + "-content" },
                react_1.default.createElement("div", { className: baseCls + "-content-inner" },
                    react_1.default.createElement(context_1.MenubarContext.Provider, { value: contextValue }, children)),
                extra && react_1.default.createElement("div", { className: baseCls + "-content-extras" }, extra))));
    };
    return Menubar;
}(react_1.default.PureComponent));
exports.Menubar = Menubar;
(function (Menubar) {
    Menubar.Item = item_1.MenubarItem;
    Menubar.defaultProps = {
        prefixCls: 'x6',
    };
})(Menubar = exports.Menubar || (exports.Menubar = {}));
exports.Menubar = Menubar;
//# sourceMappingURL=menubar.js.map