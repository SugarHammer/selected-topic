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
exports.AutoScrollBox = void 0;
var react_1 = __importDefault(require("react"));
var react_resize_detector_1 = __importDefault(require("react-resize-detector"));
var scroll_box_1 = require("../scroll-box");
var AutoScrollBox = /** @class */ (function (_super) {
    __extends(AutoScrollBox, _super);
    function AutoScrollBox(props) {
        var _this = _super.call(this, props) || this;
        _this.onContentResize = function (width, height) {
            if (_this.props.scrollX) {
                _this.setState({ contentWidth: width });
            }
            if (_this.props.scrollY) {
                _this.setState({ contentHeight: height });
            }
        };
        _this.state = {
            contentWidth: null,
            contentHeight: null,
        };
        return _this;
    }
    AutoScrollBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, prefixCls = _a.prefixCls, children = _a.children, scrollX = _a.scrollX, scrollY = _a.scrollY, scrollBoxProps = _a.scrollBoxProps, props = __rest(_a, ["prefixCls", "children", "scrollX", "scrollY", "scrollBoxProps"]);
        return (react_1.default.createElement(react_resize_detector_1.default, __assign({ handleWidth: scrollX, handleHeight: scrollY }, props), function (size) {
            var width = size.width, height = size.height;
            var others = {};
            if (!scrollX) {
                others.contentWidth = width;
            }
            if (!scrollY) {
                others.contentHeight = height;
            }
            if (_this.state.contentWidth != null) {
                others.contentWidth = _this.state.contentWidth;
            }
            if (_this.state.contentHeight != null) {
                others.contentHeight = _this.state.contentHeight;
            }
            return (react_1.default.createElement(scroll_box_1.ScrollBox, __assign({ dragable: false, scrollbarSize: 3 }, scrollBoxProps, { containerWidth: width, containerHeight: height }),
                react_1.default.createElement("div", { className: prefixCls + "-auto-scroll-box-content" },
                    react_1.default.createElement(react_resize_detector_1.default, { handleWidth: scrollX, handleHeight: scrollY, skipOnMount: true, onResize: _this.onContentResize }, children))));
        }));
    };
    return AutoScrollBox;
}(react_1.default.PureComponent));
exports.AutoScrollBox = AutoScrollBox;
(function (AutoScrollBox) {
    AutoScrollBox.defaultProps = {
        prefixCls: 'x6',
        scrollX: true,
        scrollY: true,
    };
})(AutoScrollBox = exports.AutoScrollBox || (exports.AutoScrollBox = {}));
exports.AutoScrollBox = AutoScrollBox;
//# sourceMappingURL=index.js.map