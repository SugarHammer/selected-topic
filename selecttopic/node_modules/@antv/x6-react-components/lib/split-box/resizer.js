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
exports.Resizer = void 0;
var react_1 = __importDefault(require("react"));
var MouseMoveTracker_1 = require("../util/dom/MouseMoveTracker");
var Resizer = /** @class */ (function (_super) {
    __extends(Resizer, _super);
    function Resizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (e) {
            _this.mouseMoveTracker.capture(e);
            _this.props.onMouseDown(e);
        };
        _this.onMouseMove = function (deltaX, deltaY, pos) {
            if (_this.props.onMouseMove != null) {
                _this.props.onMouseMove(deltaX, deltaY, pos);
            }
        };
        _this.onMouseMoveEnd = function () {
            _this.mouseMoveTracker.release();
            if (_this.props.onMouseMoveEnd != null) {
                _this.props.onMouseMoveEnd();
            }
        };
        _this.onClick = function (e) {
            if (_this.props.onClick) {
                _this.props.onClick(e);
            }
        };
        _this.onDoubleClick = function (e) {
            if (_this.props.onDoubleClick) {
                _this.props.onDoubleClick(e);
            }
        };
        return _this;
    }
    Resizer.prototype.UNSAFE_componentWillMount = function () {
        this.mouseMoveTracker = new MouseMoveTracker_1.MouseMoveTracker({
            onMouseMove: this.onMouseMove,
            onMouseMoveEnd: this.onMouseMoveEnd,
        });
    };
    Resizer.prototype.componentWillUnmount = function () {
        this.mouseMoveTracker.release();
    };
    Resizer.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style;
        return (
        // eslint-disable-next-line
        react_1.default.createElement("div", { role: "button", style: style, className: className, onClick: this.onClick, ref: this.props.refIt, onMouseDown: this.onMouseDown, onDoubleClick: this.onDoubleClick }));
    };
    return Resizer;
}(react_1.default.PureComponent));
exports.Resizer = Resizer;
//# sourceMappingURL=resizer.js.map