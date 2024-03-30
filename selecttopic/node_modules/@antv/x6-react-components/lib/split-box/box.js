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
exports.Box = void 0;
var react_1 = __importDefault(require("react"));
var Box = /** @class */ (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.render = function () {
        var _a = this.props, refIt = _a.refIt, className = _a.className, index = _a.index, currentSize = _a.currentSize, oppositeSize = _a.oppositeSize, vertical = _a.vertical;
        var style = __assign(__assign({}, this.props.style), { overflow: 'hidden', position: 'absolute', zIndex: 1 });
        if (vertical) {
            style.bottom = 0;
            style.top = 0;
        }
        else {
            style.left = 0;
            style.right = 0;
        }
        if (currentSize != null) {
            if (vertical) {
                style.width = currentSize;
                if (index === 1) {
                    style.left = 0;
                }
                else {
                    style.right = 0;
                }
            }
            else {
                style.height = currentSize;
                if (index === 1) {
                    style.top = 0;
                }
                else {
                    style.bottom = 0;
                }
            }
        }
        else if (vertical) {
            if (index === 1) {
                style.left = 0;
                style.right = oppositeSize;
            }
            else {
                style.left = oppositeSize;
                style.right = 0;
            }
        }
        else if (index === 1) {
            style.top = 0;
            style.bottom = oppositeSize;
        }
        else {
            style.top = oppositeSize;
            style.bottom = 0;
        }
        return (react_1.default.createElement("div", { ref: refIt, style: style, className: className }, this.props.children));
    };
    return Box;
}(react_1.default.PureComponent));
exports.Box = Box;
//# sourceMappingURL=box.js.map