"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseMoveTracker = void 0;
var addEventListener_1 = __importDefault(require("rc-util/lib/Dom/addEventListener"));
var animationFrame_1 = require("./animationFrame");
var MouseMoveTracker = /** @class */ (function () {
    function MouseMoveTracker(options) {
        var _this = this;
        this.onMouseMove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            _this.deltaX += x - _this.clientX;
            _this.deltaY += y - _this.clientY;
            if (_this.animationFrameID == null) {
                _this.animationFrameID = (0, animationFrame_1.requestAnimationFrame)(_this.triggerOnMouseMoveCallback);
            }
            _this.clientX = x;
            _this.clientY = y;
            e.preventDefault();
        };
        this.onMouseUp = function () {
            if (_this.animationFrameID) {
                (0, animationFrame_1.cancelAnimationFrame)(_this.animationFrameID);
                _this.triggerOnMouseMoveCallback();
            }
            _this.triggerOnMouseMoveEndCallback(false);
        };
        this.triggerOnMouseMoveCallback = function () {
            _this.animationFrameID = null;
            _this.onMouseMoveCallback(_this.deltaX, _this.deltaY, {
                clientX: _this.clientX,
                clientY: _this.clientY,
            });
            _this.deltaX = 0;
            _this.deltaY = 0;
        };
        this.triggerOnMouseMoveEndCallback = function (cancel) {
            _this.onMouseMoveEndCallback(cancel);
        };
        this.elem = options.elem || document.documentElement;
        this.onMouseMoveCallback = options.onMouseMove;
        this.onMouseMoveEndCallback = options.onMouseMoveEnd;
        this.animationFrameID = null;
    }
    MouseMoveTracker.prototype.capture = function (e) {
        if (!this.captured) {
            this.removeMouseMoveEvent = (0, addEventListener_1.default)(this.elem, 'mousemove', this.onMouseMove).remove;
            this.removeMouseUpEvent = (0, addEventListener_1.default)(this.elem, 'mouseup', this.onMouseUp).remove;
        }
        this.captured = true;
        if (!this.dragging) {
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.deltaX = 0;
            this.deltaY = 0;
            this.dragging = true;
        }
        e.preventDefault();
    };
    MouseMoveTracker.prototype.release = function () {
        if (this.captured) {
            if (this.removeMouseMoveEvent != null) {
                this.removeMouseMoveEvent();
                this.removeMouseMoveEvent = null;
            }
            if (this.removeMouseUpEvent != null) {
                this.removeMouseUpEvent();
                this.removeMouseUpEvent = null;
            }
        }
        this.captured = false;
        if (this.dragging) {
            this.dragging = false;
            this.clientX = 0;
            this.clientY = 0;
            this.deltaX = 0;
            this.deltaY = 0;
        }
    };
    MouseMoveTracker.prototype.isDragging = function () {
        return this.dragging;
    };
    return MouseMoveTracker;
}());
exports.MouseMoveTracker = MouseMoveTracker;
//# sourceMappingURL=MouseMoveTracker.js.map