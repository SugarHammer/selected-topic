"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
var xflow_core_1 = require("@antv/xflow-core");
require("reflect-metadata");
/** Application 扩展依赖 */
var node_port_1 = require("./contributions/node-port");
/** 依赖扩展模块，必须要加载 */
var createModule = function () {
    return xflow_core_1.ManaSyringe.Module(function (register) {
        /** 扩展 runtime hook */
        register(node_port_1.NodePortTooltipContribution);
    });
};
exports.createModule = createModule;
//# sourceMappingURL=module.js.map