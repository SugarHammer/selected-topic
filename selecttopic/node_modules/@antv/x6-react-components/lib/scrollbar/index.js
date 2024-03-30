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
exports.Scrollbar = void 0;
var react_1 = __importDefault(require("react"));
var clamp_1 = __importDefault(require("clamp"));
var classnames_1 = __importDefault(require("classnames"));
var KeyCode_1 = __importDefault(require("rc-util/lib/KeyCode"));
var WheelHandler_1 = require("../util/dom/WheelHandler");
var MouseMoveTracker_1 = require("../util/dom/MouseMoveTracker");
var Scrollbar = /** @class */ (function (_super) {
    __extends(Scrollbar, _super);
    function Scrollbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.triggerCallback = function (nextPosition) {
            var max = _this.props.contentSize - _this.props.containerSize;
            var position = (0, clamp_1.default)(nextPosition, 0, max);
            if (position !== _this.props.scrollPosition) {
                _this.props.onScroll(position);
            }
        };
        _this.onWheel = function (delta) {
            _this.triggerCallback(_this.props.scrollPosition + delta);
        };
        _this.onWheelX = function (deltaX, deltaY) {
            if (Math.abs(deltaX) >= Math.abs(deltaY)) {
                _this.onWheel(deltaX);
            }
        };
        _this.onWheelY = function (deltaX, deltaY) {
            if (Math.abs(deltaX) <= Math.abs(deltaY)) {
                _this.onWheel(deltaY);
            }
        };
        _this.onKeyDown = function (e) {
            var keyCode = e.keyCode;
            // let focus move off the scrollbar
            if (keyCode === KeyCode_1.default.TAB) {
                return;
            }
            var _a = _this.props, contentSize = _a.contentSize, containerSize = _a.containerSize;
            var distance = _this.props.keyboardScrollAmount;
            var direction = 0;
            if (_this.isHorizontal()) {
                switch (keyCode) {
                    case KeyCode_1.default.HOME:
                        direction = -1;
                        distance = contentSize;
                        break;
                    case KeyCode_1.default.LEFT:
                        direction = -1;
                        break;
                    case KeyCode_1.default.RIGHT:
                        direction = 1;
                        break;
                    default:
                        return;
                }
            }
            else {
                switch (keyCode) {
                    case KeyCode_1.default.SPACE:
                        if (e.shiftKey) {
                            direction = -1;
                        }
                        else {
                            direction = 1;
                        }
                        break;
                    case KeyCode_1.default.HOME:
                        direction = -1;
                        distance = contentSize;
                        break;
                    case KeyCode_1.default.UP:
                        direction = -1;
                        break;
                    case KeyCode_1.default.DOWN:
                        direction = 1;
                        break;
                    case KeyCode_1.default.PAGE_UP:
                        direction = -1;
                        distance = containerSize;
                        break;
                    case KeyCode_1.default.PAGE_DOWN:
                        direction = 1;
                        distance = containerSize;
                        break;
                    default:
                        return;
                }
            }
            e.preventDefault();
            _this.triggerCallback(_this.props.scrollPosition + distance * direction);
        };
        _this.onMouseDown = function (e) {
            if (e.target !== _this.thumbElem) {
                var nativeEvent = e.nativeEvent;
                var position = _this.isHorizontal()
                    ? nativeEvent.offsetX || nativeEvent.layerX
                    : nativeEvent.offsetY || nativeEvent.layerY;
                // mousedown on the scroll-track directly, move the
                // center of the scroll-face to the mouse position.
                _this.triggerCallback((position - _this.thumbSize * 0.5) / _this.scale);
            }
            else {
                _this.mouseMoveTracker.capture(e);
            }
            if (_this.props.stopPropagation) {
                e.stopPropagation();
            }
            // focus the container so it may receive keyboard events
            _this.containerElem.focus();
        };
        _this.onMouseMove = function (deltaX, deltaY) {
            var delta = _this.isHorizontal() ? deltaX : deltaY;
            if (delta !== 0) {
                delta /= _this.scale;
                _this.triggerCallback(_this.props.scrollPosition + delta);
            }
        };
        _this.onMouseMoveEnd = function () {
            _this.mouseMoveTracker.release();
        };
        _this.refContainer = function (container) {
            _this.containerElem = container;
        };
        _this.refThumb = function (thumb) {
            _this.thumbElem = thumb;
        };
        return _this;
    }
    Scrollbar.prototype.UNSAFE_componentWillMount = function () {
        this.wheelHandler = new WheelHandler_1.WheelHandler({
            onWheel: this.isHorizontal() ? this.onWheelX : this.onWheelY,
            shouldHandleScrollX: true,
            shouldHandleScrollY: true,
            stopPropagation: this.props.stopPropagation,
        });
        this.mouseMoveTracker = new MouseMoveTracker_1.MouseMoveTracker({
            elem: document.documentElement,
            onMouseMove: this.onMouseMove,
            onMouseMoveEnd: this.onMouseMoveEnd,
        });
    };
    Scrollbar.prototype.componentWillUnmount = function () {
        this.mouseMoveTracker.release();
    };
    Scrollbar.prototype.isHorizontal = function () {
        return this.props.orientation === 'horizontal';
    };
    Scrollbar.prototype.fixPosition = function (position) {
        var max = this.props.contentSize - this.props.containerSize;
        return (0, clamp_1.default)(position, 0, max);
    };
    Scrollbar.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, scrollPosition = _b.scrollPosition, containerSize = _b.containerSize, contentSize = _b.contentSize, miniThumbSize = _b.miniThumbSize, zIndex = _b.zIndex, scrollbarSize = _b.scrollbarSize;
        // unscrollable
        if (containerSize < 1 || contentSize <= containerSize) {
            return null;
        }
        var scale = containerSize / contentSize;
        var thumbSize = containerSize * scale;
        if (thumbSize < miniThumbSize) {
            scale = (containerSize - miniThumbSize) / (contentSize - containerSize);
            thumbSize = miniThumbSize;
        }
        // cache
        this.scale = scale;
        this.thumbSize = thumbSize;
        var trackStyle;
        var thumbStyle;
        var horizontal = this.isHorizontal();
        if (horizontal) {
            trackStyle = {
                width: containerSize,
                height: scrollbarSize,
            };
            thumbStyle = {
                width: thumbSize,
                transform: "translate(" + scrollPosition * scale + "px, 0)",
            };
        }
        else {
            trackStyle = {
                width: scrollbarSize,
                height: containerSize,
            };
            thumbStyle = {
                height: thumbSize,
                transform: "translate(0, " + scrollPosition * scale + "px)",
            };
        }
        if (zIndex) {
            trackStyle.zIndex = zIndex;
        }
        var baseCls = prefixCls + "-scrollbar";
        return (react_1.default.createElement("div", { role: "button", className: (0, classnames_1.default)(baseCls, (_a = {},
                _a[baseCls + "-vertical"] = !horizontal,
                _a[baseCls + "-horizontal"] = horizontal,
                _a), className), style: trackStyle, tabIndex: 0, ref: this.refContainer, onKeyDown: this.onKeyDown, onMouseDown: this.onMouseDown, onWheel: this.wheelHandler.onWheel },
            react_1.default.createElement("div", { ref: this.refThumb, style: thumbStyle, className: baseCls + "-thumb" })));
    };
    return Scrollbar;
}(react_1.default.PureComponent));
exports.Scrollbar = Scrollbar;
(function (Scrollbar) {
    Scrollbar.defaultProps = {
        prefixCls: 'x6',
        orientation: 'vertical',
        contentSize: 0,
        containerSize: 0,
        defaultPosition: 0,
        scrollbarSize: 4,
        miniThumbSize: 16,
        keyboardScrollAmount: 40,
    };
})(Scrollbar = exports.Scrollbar || (exports.Scrollbar = {}));
exports.Scrollbar = Scrollbar;
//# sourceMappingURL=index.js.map