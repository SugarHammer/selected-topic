"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDagExtensionModule = void 0;
var tslib_1 = require("tslib");
require("reflect-metadata");
var xflow_core_1 = require("@antv/xflow-core");
var dag_1 = require("./contributions/dag");
var command_1 = require("./contributions/command");
tslib_1.__exportStar(require("./x6-extension/edge"), exports);
tslib_1.__exportStar(require("./x6-extension/node"), exports);
var interface_1 = require("./interface");
/** 依赖扩展模块，必须要加载 */
var createDagExtensionModule = function (config) {
    return xflow_core_1.ManaSyringe.Module(function (register) {
        /** 扩展 runtime hook */
        register(dag_1.DagHooksContribution);
        register(command_1.QueryGraphStatusCommand);
        register(interface_1.IComponentConfig, {
            useValue: config,
        });
    });
};
exports.createDagExtensionModule = createDagExtensionModule;
//# sourceMappingURL=module.js.map