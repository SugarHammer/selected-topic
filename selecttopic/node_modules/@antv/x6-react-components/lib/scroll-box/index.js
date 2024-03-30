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
exports.ScrollBox = void 0;
var react_1 = __importDefault(require("react"));
var clamp_1 = __importDefault(require("clamp"));
var classnames_1 = __importDefault(require("classnames"));
var util_1 = require("../util");
var WheelHandler_1 = require("../util/dom/WheelHandler");
var TouchHandler_1 = require("../util/dom/TouchHandler");
var MouseMoveTracker_1 = require("../util/dom/MouseMoveTracker");
var scrollbar_1 = require("../scrollbar");
var ScrollBox = /** @class */ (function (_super) {
    __extends(ScrollBox, _super);
    function ScrollBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onScroll = function (deltaX, deltaY) {
            if (!_this.scrolling) {
                _this.triggerScrollStart();
            }
            if (Math.abs(deltaY) > Math.abs(deltaX) && _this.state.hasVerticalBar) {
                _this.scrollVertical(deltaY, true);
            }
            else if (deltaX && _this.state.hasHorizontalBar) {
                _this.scrollHorizontal(deltaX, true);
            }
            _this.triggerScrollStop();
        };
        _this.onVerticalScroll = function (scrollY) {
            if (scrollY === _this.state.scrollTop) {
                return;
            }
            if (!_this.scrolling) {
                _this.triggerScrollStart();
            }
            _this.scrollVertical(scrollY, false);
            _this.triggerScrollStop();
        };
        _this.onHorizontalScroll = function (scrollX) {
            if (scrollX === _this.state.scrollLeft) {
                return;
            }
            if (!_this.scrolling) {
                _this.triggerScrollStart();
            }
            _this.scrollHorizontal(scrollX, false);
            _this.triggerScrollStop();
        };
        _this.shouldHandleWheelX = function (delta) {
            if (!_this.state.hasHorizontalBar || delta === 0) {
                return false;
            }
            delta = Math.round(delta); // eslint-disable-line
            if (delta === 0) {
                return false;
            }
            return ((delta < 0 && _this.state.scrollLeft > 0) ||
                (delta >= 0 && _this.state.scrollLeft < _this.state.maxScrollLeft));
        };
        _this.shouldHandleWheelY = function (delta) {
            if (!_this.state.hasVerticalBar || delta === 0) {
                return false;
            }
            delta = Math.round(delta); // eslint-disable-line
            if (delta === 0) {
                return false;
            }
            return ((delta < 0 && _this.state.scrollTop > 0) ||
                (delta >= 0 && _this.state.scrollTop < _this.state.maxScrollTop));
        };
        _this.shouldHandleTouchX = function (delta) {
            return _this.props.touchable ? _this.shouldHandleWheelX(delta) : false;
        };
        _this.shouldHandleTouchY = function (delta) {
            return _this.props.touchable ? _this.shouldHandleWheelY(delta) : false;
        };
        _this.onMouseDown = function (e) {
            if (_this.mouseMoveTracker != null) {
                _this.mouseMoveTracker.capture(e);
            }
        };
        _this.onMouseMove = function (deltaX, deltaY) {
            if (!_this.scrolling) {
                _this.triggerScrollStart();
            }
            _this.scrollVertical(deltaY, true);
            _this.scrollHorizontal(deltaX, true);
        };
        _this.onMouseMoveEnd = function () {
            if (_this.mouseMoveTracker != null) {
                _this.mouseMoveTracker.release();
            }
            _this.triggerScrollStop();
        };
        _this.refContainer = function (container) {
            _this.containerElem = container;
        };
        _this.refContent = function (content) {
            _this.contentElem = content;
        };
        _this.onWheel = function (e) {
            if (_this.wheelHandler != null) {
                _this.wheelHandler.onWheel(e);
            }
        };
        return _this;
    }
    ScrollBox.prototype.UNSAFE_componentWillMount = function () {
        this.triggerScrollStop = (0, util_1.debounce)(this.triggerScrollStopSync, 200, this);
        this.wheelHandler = new WheelHandler_1.WheelHandler({
            onWheel: this.onScroll,
            shouldHandleScrollX: this.shouldHandleWheelX,
            shouldHandleScrollY: this.shouldHandleWheelY,
            stopPropagation: this.props.stopPropagation,
        });
        if (this.props.touchable) {
            this.touchHandler = new TouchHandler_1.TouchHandler({
                onTouchScroll: this.onScroll,
                shouldHandleScrollX: this.shouldHandleTouchX,
                shouldHandleScrollY: this.shouldHandleTouchY,
                stopPropagation: this.props.stopPropagation,
            });
        }
        if (this.props.dragable) {
            this.mouseMoveTracker = new MouseMoveTracker_1.MouseMoveTracker({
                elem: document.documentElement,
                onMouseMove: this.onMouseMove,
                onMouseMoveEnd: this.onMouseMoveEnd,
            });
        }
        this.setState(this.calculateState());
    };
    ScrollBox.prototype.componentDidMount = function () {
        this.mounted = true;
        this.setState(this.calculateState());
    };
    ScrollBox.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        this.setState(this.calculateState(nextProps));
    };
    ScrollBox.prototype.componentWillUnmount = function () {
        this.wheelHandler = null;
        if (this.props.touchable) {
            this.touchHandler = null;
        }
        if (this.props.dragable && this.mouseMoveTracker != null) {
            this.mouseMoveTracker.release();
            this.mouseMoveTracker = null;
        }
        var triggerScrollStop = this.triggerScrollStop;
        triggerScrollStop.reset();
        this.triggerScrollStopSync();
    };
    ScrollBox.prototype.calculateState = function (props) {
        if (props === void 0) { props = this.props; }
        var containerWidth = props.containerWidth !== undefined &&
            props.containerWidth !== this.props.containerWidth
            ? props.containerWidth
            : this.props.containerWidth !== undefined
                ? this.props.containerWidth
                : (this.containerElem && this.containerElem.clientWidth) || 0;
        var containerHeight = props.containerHeight !== undefined &&
            props.containerHeight !== this.props.containerHeight
            ? props.containerHeight
            : this.props.containerHeight !== undefined
                ? this.props.containerHeight
                : (this.containerElem && this.containerElem.clientHeight) || 0;
        var contentWidth = props.contentWidth !== undefined &&
            props.contentWidth !== this.props.contentWidth
            ? props.contentWidth
            : this.props.contentWidth !== undefined
                ? this.props.contentWidth
                : (this.contentElem && this.contentElem.scrollWidth) || 0;
        var contentHeight = props.contentHeight !== undefined &&
            props.contentHeight !== this.props.contentHeight
            ? props.contentHeight
            : this.props.contentHeight !== undefined
                ? this.props.contentHeight
                : (this.contentElem && this.contentElem.scrollHeight) || 0;
        var hasVerticalBar = contentHeight > containerHeight;
        var hasHorizontalBar = contentWidth > containerWidth;
        var scrollTop = 0;
        var scrollLeft = 0;
        var maxScrollTop = 0;
        var maxScrollLeft = 0;
        var verticalBarHeight = containerHeight;
        var horizontalBarWidth = containerWidth;
        if (hasVerticalBar) {
            if (hasHorizontalBar) {
                verticalBarHeight -= props.scrollbarSize;
            }
            maxScrollTop = contentHeight - verticalBarHeight;
            if (props.scrollTop !== this.props.scrollTop) {
                scrollTop = props.scrollTop;
            }
            else {
                scrollTop = (this.state ? this.state.scrollTop : props.scrollTop) || 0;
            }
        }
        if (hasHorizontalBar) {
            if (hasVerticalBar) {
                horizontalBarWidth -= props.scrollbarSize;
            }
            maxScrollLeft = contentWidth - horizontalBarWidth;
            if (props.scrollLeft !== this.props.scrollLeft) {
                scrollLeft = props.scrollLeft;
            }
            else {
                scrollLeft =
                    (this.state ? this.state.scrollLeft : props.scrollLeft) || 0;
            }
        }
        var nextState = {
            containerWidth: containerWidth,
            containerHeight: containerHeight,
            contentWidth: contentWidth,
            contentHeight: contentHeight,
            verticalBarHeight: verticalBarHeight,
            horizontalBarWidth: horizontalBarWidth,
            hasVerticalBar: hasVerticalBar,
            hasHorizontalBar: hasHorizontalBar,
            maxScrollTop: maxScrollTop,
            maxScrollLeft: maxScrollLeft,
            scrollTop: (0, clamp_1.default)(scrollTop, 0, maxScrollTop),
            scrollLeft: (0, clamp_1.default)(scrollLeft, 0, maxScrollLeft),
        };
        return nextState;
    };
    ScrollBox.prototype.scrollVertical = function (scrollY, relative) {
        var scrollTop = (0, clamp_1.default)(relative ? this.state.scrollTop + scrollY : scrollY, 0, this.state.maxScrollTop);
        if (this.props.onVerticalScroll) {
            this.props.onVerticalScroll(scrollTop);
        }
        this.setState({ scrollTop: scrollTop });
    };
    ScrollBox.prototype.scrollHorizontal = function (scrollX, relative) {
        var scrollLeft = (0, clamp_1.default)(relative ? this.state.scrollLeft + scrollX : scrollX, 0, this.state.maxScrollLeft);
        if (this.props.onHorizontalScroll) {
            this.props.onHorizontalScroll(scrollLeft);
        }
        this.setState({ scrollLeft: scrollLeft });
    };
    ScrollBox.prototype.triggerScrollStart = function () {
        if (this.scrolling) {
            return;
        }
        this.scrolling = true;
        if (this.props.onScrollStart) {
            this.props.onScrollStart(this.state.scrollLeft, this.state.scrollTop);
        }
    };
    ScrollBox.prototype.triggerScrollStopSync = function () {
        if (!this.scrolling) {
            return;
        }
        this.scrolling = false;
        if (this.props.onScrollEnd) {
            this.props.onScrollEnd(this.state.scrollLeft, this.state.scrollTop);
        }
    };
    ScrollBox.prototype.getScrollbarProps = function () {
        return {
            zIndex: this.props.zIndex,
            miniThumbSize: this.props.miniThumbSize,
            scrollbarSize: this.props.scrollbarSize,
            keyboardScrollAmount: this.props.keyboardScrollAmount,
            stopPropagation: true,
        };
    };
    ScrollBox.prototype.renderVerticalBar = function () {
        if (this.state.hasVerticalBar) {
            return (react_1.default.createElement(scrollbar_1.Scrollbar, __assign({ orientation: "vertical", scrollPosition: this.state.scrollTop, contentSize: this.state.contentHeight, containerSize: this.state.verticalBarHeight, onScroll: this.onVerticalScroll }, this.getScrollbarProps())));
        }
    };
    ScrollBox.prototype.renderHorizontalBar = function () {
        if (this.state.hasHorizontalBar) {
            return (react_1.default.createElement(scrollbar_1.Scrollbar, __assign({ orientation: "horizontal", scrollPosition: this.state.scrollLeft, contentSize: this.state.contentWidth, containerSize: this.state.horizontalBarWidth, onScroll: this.onHorizontalScroll }, this.getScrollbarProps())));
        }
    };
    ScrollBox.prototype.render = function () {
        var _a;
        var props = {};
        if (this.props.touchable) {
            props.onTouchStart = this.touchHandler.onTouchStart;
            props.onTouchEnd = this.touchHandler.onTouchEnd;
            props.onTouchMove = this.touchHandler.onTouchMove;
            props.onTouchCancel = this.touchHandler.onTouchCancel;
        }
        if (this.props.dragable) {
            props.onMouseDown = this.onMouseDown;
        }
        var contentStyle = {};
        var containerStyle = {};
        if (this.props.containerWidth != null || this.mounted) {
            containerStyle.width = this.state.containerWidth;
        }
        if (this.props.containerHeight != null || this.mounted) {
            containerStyle.height = this.state.containerHeight;
        }
        if (this.props.contentWidth != null || this.mounted) {
            contentStyle.width = this.state.contentWidth;
        }
        if (this.props.contentHeight != null || this.mounted) {
            contentStyle.height = this.state.contentHeight;
        }
        if (this.mounted) {
            contentStyle.transform = "translate(-" + this.state.scrollLeft + "px, -" + this.state.scrollTop + "px)";
        }
        var _b = this.props, prefixCls = _b.prefixCls, scrollbarAutoHide = _b.scrollbarAutoHide;
        var baseCls = prefixCls + "-scroll-box";
        return (react_1.default.createElement("div", __assign({}, props, { style: __assign(__assign({}, this.props.containerStyle), containerStyle), ref: this.refContainer, onWheel: this.onWheel, className: (0, classnames_1.default)(baseCls, (_a = {},
                _a[baseCls + "-auto-hide"] = scrollbarAutoHide,
                _a), this.props.containerClassName) }),
            react_1.default.createElement("div", { style: __assign(__assign({}, this.props.contentStyle), contentStyle), ref: this.refContent, className: (0, classnames_1.default)(baseCls + "-content", this.props.contentClassName) }, this.props.children),
            this.renderVerticalBar(),
            this.renderHorizontalBar()));
    };
    return ScrollBox;
}(react_1.default.PureComponent));
exports.ScrollBox = ScrollBox;
(function (ScrollBox) {
    ScrollBox.defaultProps = {
        prefixCls: 'x6',
        scrollTop: 0,
        scrollLeft: 0,
        dragable: true,
        touchable: true,
        scrollbarAutoHide: true,
        scrollbarSize: scrollbar_1.Scrollbar.defaultProps.scrollbarSize,
        miniThumbSize: scrollbar_1.Scrollbar.defaultProps.miniThumbSize,
        keyboardScrollAmount: scrollbar_1.Scrollbar.defaultProps.keyboardScrollAmount,
    };
})(ScrollBox = exports.ScrollBox || (exports.ScrollBox = {}));
exports.ScrollBox = ScrollBox;
//# sourceMappingURL=index.js.map