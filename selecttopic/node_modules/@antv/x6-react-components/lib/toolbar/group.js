"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarGroup = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var context_1 = require("./context");
var ToolbarGroup = function (_a) {
    var children = _a.children, className = _a.className;
    return (react_1.default.createElement(context_1.ToolbarContext.Consumer, null, function (_a) {
        var prefixCls = _a.prefixCls;
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)(prefixCls + "-group", className) }, children));
    }));
};
exports.ToolbarGroup = ToolbarGroup;
//# sourceMappingURL=group.js.map