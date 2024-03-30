"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartExtension = exports.createFlowchartExtensionModule = void 0;
require("reflect-metadata");
/** Application 扩展依赖 */
var mana_syringe_1 = require("mana-syringe");
var flow_1 = require("./contributions/flow");
var components_1 = require("./components");
Object.defineProperty(exports, "FlowchartExtension", { enumerable: true, get: function () { return components_1.FlowchartExtension; } });
/** 依赖扩展模块，必须要加载 */
var createFlowchartExtensionModule = function () {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 扩展 runtime hook */
        register(flow_1.FlowHooksContribution);
    });
};
exports.createFlowchartExtensionModule = createFlowchartExtensionModule;
//# sourceMappingURL=module.js.map