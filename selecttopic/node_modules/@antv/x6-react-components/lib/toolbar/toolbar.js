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
exports.Toolbar = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var item_1 = require("./item");
var group_1 = require("./group");
var context_1 = require("./context");
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClick = function (key, value) {
            if (_this.props.onClick) {
                _this.props.onClick(key, value);
            }
        };
        return _this;
    }
    Toolbar.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, children = _b.children, extra = _b.extra, size = _b.size, align = _b.align, hoverEffect = _b.hoverEffect;
        var baseCls = prefixCls + "-toolbar";
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(baseCls, className, (_a = {},
                _a[baseCls + "-" + size] = size,
                _a[baseCls + "-align-right"] = align === 'right',
                _a[baseCls + "-hover-effect"] = hoverEffect,
                _a)) },
            react_1.default.createElement("div", { className: baseCls + "-content" },
                react_1.default.createElement("div", { className: baseCls + "-content-inner" },
                    react_1.default.createElement(context_1.ToolbarContext.Provider, { value: {
                            prefixCls: baseCls,
                            onClick: this.onClick,
                        } }, children)),
                extra && react_1.default.createElement("div", { className: baseCls + "-content-extras" }, extra))));
    };
    return Toolbar;
}(react_1.default.PureComponent));
exports.Toolbar = Toolbar;
(function (Toolbar) {
    Toolbar.Item = item_1.ToolbarItem;
    Toolbar.Group = group_1.ToolbarGroup;
    Toolbar.defaultProps = {
        prefixCls: 'x6',
        hoverEffect: false,
    };
})(Toolbar = exports.Toolbar || (exports.Toolbar = {}));
exports.Toolbar = Toolbar;
//# sourceMappingURL=toolbar.js.map