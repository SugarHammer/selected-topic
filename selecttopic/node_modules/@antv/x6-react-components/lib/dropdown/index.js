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
exports.Dropdown = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var rc_dropdown_1 = __importDefault(require("rc-dropdown"));
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // getTransitionName() {
    //   const { placement = '', transitionName } = this.props
    //   if (transitionName !== undefined) {
    //     return transitionName
    //   }
    //   if (placement.indexOf('top') >= 0) {
    //     return 'slide-down'
    //   }
    //   return 'slide-up'
    // }
    Dropdown.prototype.render = function () {
        var _a = this.props, children = _a.children, trigger = _a.trigger, disabled = _a.disabled;
        var prefixCls = this.props.prefixCls + "-dropdown";
        var child = react_1.default.Children.only(children);
        var dropdownTrigger = react_1.default.cloneElement(child, {
            className: (0, classnames_1.default)(children.props.className, prefixCls + "-trigger"),
            disabled: disabled,
        });
        var triggers = disabled
            ? []
            : Array.isArray(trigger)
                ? trigger
                : [trigger];
        var alignPoint = false;
        if (triggers && triggers.indexOf('contextMenu') !== -1) {
            alignPoint = true;
        }
        var overlay = react_1.default.Children.only(this.props.overlay);
        var fixedOverlay = react_1.default.createElement("div", { className: prefixCls + "-overlay" }, overlay);
        return (react_1.default.createElement(rc_dropdown_1.default, __assign({}, this.props, { prefixCls: prefixCls, overlay: fixedOverlay, alignPoint: alignPoint, trigger: triggers }), dropdownTrigger));
    };
    return Dropdown;
}(react_1.default.Component));
exports.Dropdown = Dropdown;
(function (Dropdown) {
    Dropdown.defaultProps = {
        trigger: 'hover',
        prefixCls: 'x6',
        mouseEnterDelay: 0.15,
        mouseLeaveDelay: 0.1,
        placement: 'bottomLeft',
    };
})(Dropdown = exports.Dropdown || (exports.Dropdown = {}));
exports.Dropdown = Dropdown;
//# sourceMappingURL=index.js.map