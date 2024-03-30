"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePanelContext = exports.PanelContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
exports.PanelContext = react_1.default.createContext({
    propsProxy: null,
    commandService: null,
    modelService: null,
});
var usePanelContext = function () {
    return react_1.default.useContext(exports.PanelContext);
};
exports.usePanelContext = usePanelContext;
//# sourceMappingURL=context.js.map