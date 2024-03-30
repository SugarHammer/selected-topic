"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowModelCommands = exports.XFlowGroupCommands = exports.XFlowGraphCommands = exports.XFlowEdgeCommands = exports.XFlowNodeCommands = exports.CommandConfig = exports.createCmdConfig = exports.CommandsRegistry = exports.getNodeReactComponent = exports.useAppContext = exports.AppContext = void 0;
/** Command addReactNode 依赖的 React.Context */
var context_1 = require("./components/context");
Object.defineProperty(exports, "AppContext", { enumerable: true, get: function () { return context_1.AppContext; } });
Object.defineProperty(exports, "useAppContext", { enumerable: true, get: function () { return context_1.useAppContext; } });
Object.defineProperty(exports, "getNodeReactComponent", { enumerable: true, get: function () { return context_1.getNodeReactComponent; } });
/** Command 组件 */
var components_1 = require("./components");
// 组件
Object.defineProperty(exports, "CommandsRegistry", { enumerable: true, get: function () { return components_1.CommandsRegistry; } });
// create Command config hook
Object.defineProperty(exports, "createCmdConfig", { enumerable: true, get: function () { return components_1.createCmdConfig; } });
// 组件props中的Config
var config_1 = require("./config");
Object.defineProperty(exports, "CommandConfig", { enumerable: true, get: function () { return config_1.CommandConfig; } });
/** 常量 */
var constant_1 = require("./constant");
Object.defineProperty(exports, "XFlowNodeCommands", { enumerable: true, get: function () { return constant_1.XFlowNodeCommands; } });
Object.defineProperty(exports, "XFlowEdgeCommands", { enumerable: true, get: function () { return constant_1.XFlowEdgeCommands; } });
Object.defineProperty(exports, "XFlowGraphCommands", { enumerable: true, get: function () { return constant_1.XFlowGraphCommands; } });
Object.defineProperty(exports, "XFlowGroupCommands", { enumerable: true, get: function () { return constant_1.XFlowGroupCommands; } });
Object.defineProperty(exports, "XFlowModelCommands", { enumerable: true, get: function () { return constant_1.XFlowModelCommands; } });
//# sourceMappingURL=index.js.map