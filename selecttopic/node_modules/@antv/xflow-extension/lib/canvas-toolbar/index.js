"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToolbarConfig = exports.CanvasToolbar = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var config_1 = require("./config");
var render_components_1 = require("./render-components");
var CanvasToolbar = function (props) {
    var app = (0, xflow_core_1.useXFlowApp)();
    var hasApp = !!app;
    /** 获取ContextMenu的配置 */
    var contextMenuConfig = react_1.default.useMemo(function () { return (props.config ? props.config : new config_1.ToolbarConfig()); }, [props.config]);
    if (!hasApp) {
        return null;
    }
    return react_1.default.createElement(render_components_1.XFlowToolbar, tslib_1.__assign({}, props, { config: contextMenuConfig }));
};
exports.CanvasToolbar = CanvasToolbar;
var createToolbarConfig = function (addOptions) {
    return function (value) {
        /** bridge config and value */
        var proxy = react_1.default.useMemo(function () { return ({ getValue: function () { return ({}); } }); }, []);
        proxy.getValue = function () { return value; };
        /** 生成config */
        var toolbarConfig = react_1.default.useMemo(function () {
            var config = new config_1.ToolbarConfig();
            addOptions(config, proxy);
            return config;
        }, [proxy]);
        return toolbarConfig;
    };
};
exports.createToolbarConfig = createToolbarConfig;
//# sourceMappingURL=index.js.map