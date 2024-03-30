"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartCanvas = exports.FlowchartExtension = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var xflow_core_1 = require("@antv/xflow-core");
var config_graph_1 = require("./config-graph");
var utils_1 = require("./utils");
var module_1 = require("./extension/module");
Object.defineProperty(exports, "FlowchartExtension", { enumerable: true, get: function () { return module_1.FlowchartExtension; } });
tslib_1.__exportStar(require("./interface"), exports);
var FlowchartCanvas = function (props) {
    var _a = props.position, position = _a === void 0 ? { top: 40, left: 240, right: 240, bottom: 0 } : _a;
    var graphConfig = (0, config_graph_1.useGraphConfig)(props);
    var app = (0, xflow_core_1.useXFlowApp)();
    (0, react_1.useEffect)(function () {
        if (app) {
            (0, utils_1.setInstance)(app);
        }
    }, [app]);
    return (react_1.default.createElement(xflow_core_1.XFlowCanvas, tslib_1.__assign({}, props, { config: graphConfig, position: position }), props.children));
};
exports.FlowchartCanvas = FlowchartCanvas;
exports.FlowchartCanvas.defaultProps = {
    isXFlowCanvas: true,
};
//# sourceMappingURL=index.js.map