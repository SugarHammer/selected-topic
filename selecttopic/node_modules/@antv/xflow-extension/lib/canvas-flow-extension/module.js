"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlowExtensionModule = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
/** Application 扩展依赖 */
var xflow_core_1 = require("@antv/xflow-core");
var flow_1 = require("./contributions/flow");
tslib_1.__exportStar(require("./x6-extension/node"), exports);
/** 依赖扩展模块，必须要加载 */
var createFlowExtensionModule = function () {
    return xflow_core_1.ManaSyringe.Module(function (register) {
        /** 扩展 runtime hook */
        register(flow_1.FlowHooksContribution);
    });
};
exports.createFlowExtensionModule = createFlowExtensionModule;
//# sourceMappingURL=module.js.map