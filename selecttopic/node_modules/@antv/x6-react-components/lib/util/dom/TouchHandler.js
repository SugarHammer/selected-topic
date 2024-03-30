"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandler = void 0;
var fn_1 = require("../fn");
var animationFrame_1 = require("./animationFrame");
var TouchHandler = /** @class */ (function () {
    function TouchHandler(options) {
        var _this = this;
        this.didTouchMove = function () {
            // Fire scroll callback based on computed drag delta.
            // Also track accummulated delta so we can calculate velocity
            _this.dragAnimationId = null;
            _this.callback(_this.deltaX, _this.deltaY);
            _this.accumulatedDeltaX += _this.deltaX;
            _this.accumulatedDeltaY += _this.deltaY;
            _this.deltaX = 0;
            _this.deltaY = 0;
        };
        this.track = function () {
            // Compute velocity based on a weighted average of drag over
            // last 100ms and previous velocity. Combining into a moving average
            // results in a smoother scroll.
            var now = Date.now();
            var elapsed = now - _this.lastFrameTimestamp;
            var oldVelocityX = _this.velocityX;
            var oldVelocityY = _this.velocityY;
            // We compute velocity using a weighted average of the current
            // velocity and the previous velocity. If the previous velocity
            // is 0, put the full weight on the last 100ms
            var weight = 0.8;
            if (elapsed < TouchHandler.TRACKER_TIMEOUT) {
                weight *= elapsed / TouchHandler.TRACKER_TIMEOUT;
            }
            if (oldVelocityX === 0 && oldVelocityY === 0) {
                weight = 1;
            }
            // Formula for computing weighted average of velocity
            _this.velocityX =
                weight *
                    ((TouchHandler.TRACKER_TIMEOUT * _this.accumulatedDeltaX) / (1 + elapsed));
            if (weight < 1) {
                _this.velocityX += (1 - weight) * oldVelocityX;
            }
            _this.velocityY =
                weight *
                    ((TouchHandler.TRACKER_TIMEOUT * _this.accumulatedDeltaY) / (1 + elapsed));
            if (weight < 1) {
                _this.velocityY += (1 - weight) * oldVelocityY;
            }
            _this.accumulatedDeltaX = 0;
            _this.accumulatedDeltaY = 0;
            _this.lastFrameTimestamp = now;
        };
        this.startAutoScroll = function () {
            // To kick off deceleration / momentum scrolling, handle any
            // scrolling from a drag which was waiting for an animation
            // frame. Then update our velocity.
            // Finally start the momentum scrolling handler (autoScroll)
            _this.autoScrollTimestamp = Date.now();
            if (_this.deltaX > 0 || _this.deltaY > 0) {
                _this.didTouchMove();
            }
            _this.track();
            _this.autoScroll();
        };
        this.autoScroll = function () {
            // Compute a scroll delta with an exponential decay based on
            // time elapsed since drag was released. This is called
            // recursively on animation frames until the delta is below
            // a threshold (5 pixels)
            var elapsed = Date.now() - _this.autoScrollTimestamp;
            var factor = TouchHandler.DECELERATION_AMPLITUDE *
                Math.exp(-elapsed / TouchHandler.DECELERATION_FACTOR);
            var deltaX = factor * _this.velocityX;
            var deltaY = factor * _this.velocityY;
            if (Math.abs(deltaX) <= 5 || !_this.handleScrollX(deltaX, deltaY)) {
                deltaX = 0;
            }
            if (Math.abs(deltaY) <= 5 || !_this.handleScrollY(deltaY, deltaX)) {
                deltaY = 0;
            }
            if (deltaX !== 0 || deltaY !== 0) {
                _this.callback(deltaX, deltaY);
                (0, animationFrame_1.requestAnimationFrame)(_this.autoScroll);
            }
        };
        this.trackerId = null;
        this.dragAnimationId = null;
        this.deltaX = 0;
        this.deltaY = 0;
        this.lastTouchX = 0;
        this.lastTouchY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.accumulatedDeltaX = 0;
        this.accumulatedDeltaY = 0;
        this.lastFrameTimestamp = Date.now();
        this.autoScrollTimestamp = Date.now();
        this.callback = options.onTouchScroll;
        this.handleScrollX = (0, fn_1.getJudgeFunction)(options.shouldHandleScrollX);
        this.handleScrollY = (0, fn_1.getJudgeFunction)(options.shouldHandleScrollY);
        this.stopPropagation = (0, fn_1.getJudgeFunction)(options.stopPropagation);
    }
    TouchHandler.prototype.onTouchStart = function (e) {
        this.lastTouchX = e.touches[0].pageX;
        this.lastTouchY = e.touches[0].pageY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.accumulatedDeltaX = 0;
        this.accumulatedDeltaY = 0;
        this.lastFrameTimestamp = Date.now();
        if (this.trackerId != null) {
            clearInterval(this.trackerId);
        }
        this.trackerId = window.setInterval(this.track, TouchHandler.TRACKER_TIMEOUT);
        if (this.stopPropagation()) {
            e.stopPropagation();
        }
    };
    TouchHandler.prototype.onTouchEnd = function (e) {
        this.onTouchCancel(e);
        (0, animationFrame_1.requestAnimationFrame)(this.startAutoScroll);
    };
    TouchHandler.prototype.onTouchCancel = function (e) {
        if (this.trackerId != null) {
            clearInterval(this.trackerId);
            this.trackerId = null;
        }
        if (this.stopPropagation()) {
            e.stopPropagation();
        }
    };
    TouchHandler.prototype.onTouchMove = function (e) {
        var moveX = e.touches[0].pageX;
        var moveY = e.touches[0].pageY;
        // Compute delta scrolled since last drag
        // Mobile, scrolling is inverted
        this.deltaX = TouchHandler.MOVE_AMPLITUDE * (this.lastTouchX - moveX);
        this.deltaY = TouchHandler.MOVE_AMPLITUDE * (this.lastTouchY - moveY);
        var handleScrollX = this.handleScrollX(this.deltaX, this.deltaY);
        var handleScrollY = this.handleScrollY(this.deltaY, this.deltaX);
        if (!handleScrollX && !handleScrollY) {
            return;
        }
        // If we can handle scroll update last touch for computing delta
        if (handleScrollX) {
            this.lastTouchX = moveX;
        }
        else {
            this.deltaX = 0;
        }
        if (handleScrollY) {
            this.lastTouchY = moveY;
        }
        else {
            this.deltaY = 0;
        }
        e.preventDefault();
        // ensure minimum delta magnitude is met to avoid jitter
        var changed = false;
        if (Math.abs(this.deltaX) > 2 || Math.abs(this.deltaY) > 2) {
            if (this.stopPropagation()) {
                e.stopPropagation();
            }
            changed = true;
        }
        // Request animation frame to trigger scroll of computed delta
        if (changed && this.dragAnimationId == null) {
            this.dragAnimationId = (0, animationFrame_1.requestAnimationFrame)(this.didTouchMove);
        }
    };
    return TouchHandler;
}());
exports.TouchHandler = TouchHandler;
(function (TouchHandler) {
    TouchHandler.MOVE_AMPLITUDE = 1.6;
    TouchHandler.DECELERATION_AMPLITUDE = 1.6;
    TouchHandler.DECELERATION_FACTOR = 325;
    TouchHandler.TRACKER_TIMEOUT = 100;
})(TouchHandler = exports.TouchHandler || (exports.TouchHandler = {}));
exports.TouchHandler = TouchHandler;
//# sourceMappingURL=TouchHandler.js.map