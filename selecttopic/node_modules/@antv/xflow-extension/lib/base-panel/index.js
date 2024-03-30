"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspacePanel = exports.usePanelContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var config_1 = require("./config");
var context_1 = require("./context");
var WorkspacePanel = function (props) {
    var _a;
    var className = props.className, position = props.position, style = props.style, children = props.children;
    var app = (0, xflow_core_1.useXFlowApp)();
    var positionStyle = (0, xflow_core_1.usePositionStyle)(position);
    var propsProxy = react_1.default.useMemo(function () {
        return new config_1.PropsProxy();
    }, []);
    react_1.default.useEffect(function () {
        return function () {
            propsProxy.dispose();
        };
    }, [propsProxy]);
    if (!app || !app.modelService) {
        return null;
    }
    propsProxy.getValue = function () { return props; };
    var clz = (0, classnames_1.default)((_a = {},
        _a[className] = !!className,
        _a['xflow-workspace-panel'] = true,
        _a));
    var commandService = app.commandService, modelService = app.modelService;
    return (react_1.default.createElement(context_1.PanelContext.Provider, { value: { propsProxy: propsProxy, commandService: commandService, modelService: modelService } },
        react_1.default.createElement("div", { className: clz, style: tslib_1.__assign(tslib_1.__assign({}, positionStyle), style) }, children)));
};
exports.WorkspacePanel = WorkspacePanel;
var context_2 = require("./context");
Object.defineProperty(exports, "usePanelContext", { enumerable: true, get: function () { return context_2.usePanelContext; } });
//# sourceMappingURL=index.js.map