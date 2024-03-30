"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WheelHandler = void 0;
var fn_1 = require("../fn");
var normalizeWheel_1 = require("./normalizeWheel");
var animationFrame_1 = require("./animationFrame");
var WheelHandler = /** @class */ (function () {
    function WheelHandler(options) {
        var _this = this;
        this.onWheel = function (e) {
            var normalizedEvent = (0, normalizeWheel_1.normalizeWheel)(e);
            var pixelX = normalizedEvent.pixelX, pixelY = normalizedEvent.pixelY;
            var deltaX = _this.deltaX + pixelX;
            var deltaY = _this.deltaY + pixelY;
            var handleScrollX = _this.shouldHandleScrollX(deltaX, deltaY);
            var handleScrollY = _this.shouldHandleScrollY(deltaY, deltaX);
            if (!handleScrollX && !handleScrollY) {
                return;
            }
            _this.deltaX += handleScrollX ? pixelX : 0;
            _this.deltaY += handleScrollY ? pixelY : 0;
            var changed;
            if (_this.deltaX !== 0 || _this.deltaY !== 0) {
                if (_this.stopPropagation()) {
                    e.stopPropagation();
                }
                changed = true;
            }
            if (changed === true && _this.animationFrameID == null) {
                _this.animationFrameID = (0, animationFrame_1.requestAnimationFrame)(_this.didWheel);
            }
        };
        this.didWheel = function () {
            _this.animationFrameID = null;
            if (_this.callback) {
                _this.callback(_this.deltaX, _this.deltaY);
            }
            _this.deltaX = 0;
            _this.deltaY = 0;
        };
        this.callback = options.onWheel;
        this.stopPropagation = (0, fn_1.getJudgeFunction)(options.stopPropagation);
        this.shouldHandleScrollX = (0, fn_1.getJudgeFunction)(options.shouldHandleScrollX);
        this.shouldHandleScrollY = (0, fn_1.getJudgeFunction)(options.shouldHandleScrollY);
        this.deltaX = 0;
        this.deltaY = 0;
    }
    return WheelHandler;
}());
exports.WheelHandler = WheelHandler;
//# sourceMappingURL=WheelHandler.js.map