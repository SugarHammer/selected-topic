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
exports.SplitBox = void 0;
var react_1 = __importDefault(require("react"));
var clamp_1 = __importDefault(require("clamp"));
var classnames_1 = __importDefault(require("classnames"));
var box_1 = require("./box");
var resizer_1 = require("./resizer");
var SplitBox = /** @class */ (function (_super) {
    __extends(SplitBox, _super);
    function SplitBox(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseDown = function () {
            var _a = _this.getRange(), maxSize = _a.maxSize, minSize = _a.minSize;
            _this.minSize = minSize;
            _this.maxSize = maxSize;
            _this.curSize = _this.getPrimarySize();
            _this.rawSize = _this.curSize;
            _this.resizing = true;
            _this.createMask();
            _this.updateCursor(_this.curSize, minSize, maxSize);
        };
        _this.onMouseMove = function (deltaX, deltaY) {
            if (_this.props.resizable && _this.resizing) {
                var delta = _this.getDelta(deltaX, deltaY);
                if (delta === 0) {
                    return;
                }
                if (_this.rawSize < _this.minSize || _this.rawSize > _this.maxSize) {
                    _this.rawSize -= delta;
                    return;
                }
                _this.rawSize -= delta;
                _this.curSize = _this.rawSize;
                _this.curSize = (0, clamp_1.default)(_this.curSize, _this.minSize, _this.maxSize);
                _this.setPrimarySize(_this.curSize);
                _this.updateCursor(_this.curSize, _this.minSize, _this.maxSize);
                if (_this.props.onResizing) {
                    _this.props.onResizing(_this.curSize);
                }
            }
        };
        _this.onMouseMoveEnd = function () {
            if (_this.props.resizable && _this.resizing) {
                if (_this.props.onResizeEnd) {
                    _this.props.onResizeEnd(_this.curSize);
                }
                if (_this.props.refresh) {
                    var isPrimaryFirst = _this.isPrimaryFirst();
                    _this.setState({
                        box1Size: isPrimaryFirst ? _this.curSize : undefined,
                        box2Size: isPrimaryFirst ? undefined : _this.curSize,
                    });
                }
                _this.resizing = false;
                _this.removeMask();
            }
        };
        _this.refContainer = function (container) {
            _this.container = container;
        };
        _this.refResizer = function (elem) {
            _this.resizerElem = elem;
        };
        _this.state = _this.getNextState(props);
        return _this;
    }
    SplitBox.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var nextState = this.getNextState(nextProps);
        this.setState(nextState);
    };
    SplitBox.prototype.getNextState = function (props) {
        var size = props.size, defaultSize = props.defaultSize, primary = props.primary;
        var initialSize = size != null ? size : defaultSize != null ? defaultSize : '25%';
        return {
            box1Size: primary === 'first' ? initialSize : undefined,
            box2Size: primary === 'second' ? initialSize : undefined,
        };
    };
    SplitBox.prototype.isVertical = function () {
        return this.props.split === 'vertical';
    };
    SplitBox.prototype.isPrimaryFirst = function () {
        return this.props.primary === 'first';
    };
    SplitBox.prototype.getDelta = function (deltaX, deltaY) {
        var step = this.props.step;
        var isVertical = this.isVertical();
        var isPrimaryFirst = this.isPrimaryFirst();
        var delta = isVertical ? deltaX : deltaY;
        if (delta === 0) {
            return 0;
        }
        if (step && Math.abs(delta) >= step) {
            delta = ~~(delta / step) * step; // eslint-disable-line
        }
        delta = isPrimaryFirst ? -delta : delta;
        var primaryBox = isPrimaryFirst ? this.box1Elem : this.box2Elem;
        var secondBox = isPrimaryFirst ? this.box2Elem : this.box1Elem;
        var box1Order = parseInt(window.getComputedStyle(primaryBox).order, 10);
        var box2Order = parseInt(window.getComputedStyle(secondBox).order, 10);
        if (box1Order > box2Order) {
            delta = -delta;
        }
        return delta;
    };
    SplitBox.prototype.getRange = function () {
        var _a = this.props, maxSize = _a.maxSize, minSize = _a.minSize;
        var containerRect = this.container.getBoundingClientRect();
        var containerSize = this.isVertical()
            ? containerRect.width
            : containerRect.height;
        var newMinSize = minSize !== undefined ? minSize : 0;
        var newMaxSize = maxSize !== undefined ? maxSize : 0;
        while (newMinSize < 0) {
            newMinSize = containerSize + newMinSize;
        }
        while (newMaxSize <= 0) {
            newMaxSize = containerSize + newMaxSize;
        }
        return {
            minSize: (0, clamp_1.default)(newMinSize, 0, containerSize),
            maxSize: (0, clamp_1.default)(newMaxSize, 0, containerSize),
        };
    };
    SplitBox.prototype.getPrimarySize = function () {
        var primaryBox = this.isPrimaryFirst() ? this.box1Elem : this.box2Elem;
        return this.isVertical()
            ? primaryBox.getBoundingClientRect().width
            : primaryBox.getBoundingClientRect().height;
    };
    SplitBox.prototype.setPrimarySize = function (size) {
        var isFirstPrimary = this.isPrimaryFirst();
        var primaryBox = isFirstPrimary ? this.box1Elem : this.box2Elem;
        var secondBox = isFirstPrimary ? this.box2Elem : this.box1Elem;
        var resizerElem = this.resizerElem;
        var value = size + "px";
        if (this.isVertical()) {
            primaryBox.style.width = value;
            if (isFirstPrimary) {
                secondBox.style.left = value;
                resizerElem.style.left = value;
            }
            else {
                secondBox.style.right = value;
                resizerElem.style.right = value;
            }
        }
        else {
            primaryBox.style.height = value;
            if (isFirstPrimary) {
                secondBox.style.top = value;
                resizerElem.style.top = value;
            }
            else {
                secondBox.style.bottom = value;
                resizerElem.style.bottom = value;
            }
        }
    };
    SplitBox.prototype.updateCursor = function (size, minSize, maxSize) {
        var cursor = '';
        if (this.isVertical()) {
            if (size === minSize) {
                cursor = this.isPrimaryFirst() ? 'e-resize' : 'w-resize';
            }
            else if (size === maxSize) {
                cursor = this.isPrimaryFirst() ? 'w-resize' : 'e-resize';
            }
            else {
                cursor = 'col-resize';
            }
        }
        else if (size === minSize) {
            cursor = this.isPrimaryFirst() ? 's-resize' : 'n-resize';
        }
        else if (size === maxSize) {
            cursor = this.isPrimaryFirst() ? 'n-resize' : 's-resize';
        }
        else {
            cursor = 'row-resize';
        }
        this.maskElem.style.cursor = cursor;
    };
    SplitBox.prototype.createMask = function () {
        var mask = document.createElement('div');
        mask.style.position = 'absolute';
        mask.style.top = '0';
        mask.style.right = '0';
        mask.style.bottom = '0';
        mask.style.left = '0';
        mask.style.zIndex = '9999';
        document.body.appendChild(mask);
        this.maskElem = mask;
    };
    SplitBox.prototype.removeMask = function () {
        if (this.maskElem.parentNode) {
            this.maskElem.parentNode.removeChild(this.maskElem);
        }
    };
    SplitBox.prototype.renderBox = function (baseCls, index) {
        var _this = this;
        var primary = index === 1 ? 'first' : 'second';
        var isPrimary = this.props.primary === primary;
        var currentSize = index === 1 ? this.state.box1Size : this.state.box2Size;
        var oppositeSize = index === 1 ? this.state.box2Size : this.state.box1Size;
        var style = __assign(__assign({}, this.props.boxStyle), (isPrimary ? this.props.primaryBoxStyle : this.props.secondBoxStyle));
        var classes = (0, classnames_1.default)(baseCls + "-item", isPrimary ? baseCls + "-item-primary" : baseCls + "-item-second");
        var ref = function (elem) {
            if (index === 1) {
                _this.box1Elem = elem;
            }
            else {
                _this.box2Elem = elem;
            }
        };
        var children = this.props.children;
        return (react_1.default.createElement(box_1.Box, { key: "box" + index, refIt: ref, style: style, index: index, className: classes, currentSize: currentSize, oppositeSize: oppositeSize, vertical: this.isVertical(), isPrimary: isPrimary }, children[index - 1]));
    };
    SplitBox.prototype.renderResizer = function (baseCls) {
        var style = __assign({}, this.props.resizerStyle);
        style.position = 'absolute';
        style.zIndex = 2;
        if (this.isVertical()) {
            style.top = 0;
            style.bottom = 0;
            if (this.props.resizable === true) {
                style.cursor = 'col-resize';
            }
            if (this.isPrimaryFirst()) {
                style.left = this.state.box1Size;
            }
            else {
                style.right = this.state.box2Size;
            }
        }
        else {
            style.left = 0;
            style.right = 0;
            if (this.props.resizable === true) {
                style.cursor = 'row-resize';
            }
            if (this.isPrimaryFirst()) {
                style.top = this.state.box1Size;
            }
            else {
                style.bottom = this.state.box2Size;
            }
        }
        return (react_1.default.createElement(resizer_1.Resizer, { key: "resizer", style: style, className: baseCls + "-resizer", refIt: this.refResizer, onClick: this.props.onResizerClick, onMouseDown: this.onMouseDown, onMouseMove: this.onMouseMove, onMouseMoveEnd: this.onMouseMoveEnd, onDoubleClick: this.props.onResizerDoubleClick }));
    };
    SplitBox.prototype.render = function () {
        var _a;
        var style = __assign(__assign({}, this.props.style), { overflow: 'hidden', position: 'relative', width: '100%', height: '100%' });
        var baseCls = this.props.prefixCls + "-split-box";
        var classes = (0, classnames_1.default)(baseCls, baseCls + "-" + this.props.split, (_a = {},
            _a[baseCls + "-disabled"] = !this.props.resizable,
            _a));
        return (react_1.default.createElement("div", { style: style, className: classes, ref: this.refContainer },
            this.renderBox(baseCls, 1),
            this.renderResizer(baseCls),
            this.renderBox(baseCls, 2)));
    };
    return SplitBox;
}(react_1.default.PureComponent));
exports.SplitBox = SplitBox;
(function (SplitBox) {
    SplitBox.defaultProps = {
        resizable: true,
        split: 'vertical',
        primary: 'first',
        prefixCls: 'x6',
        defaultSize: '25%',
    };
})(SplitBox = exports.SplitBox || (exports.SplitBox = {}));
exports.SplitBox = SplitBox;
//# sourceMappingURL=splitbox.js.map