"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createX6GraphModule = void 0;
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
/** Application 扩展依赖 */
var graph_provider_1 = require("./graph-provider");
var config_1 = require("./config");
var mana_syringe_1 = require("mana-syringe");
/** 依赖扩展模块，必须要加载 */
var createX6GraphModule = function (config) {
    return (0, mana_syringe_1.Module)(function (register) {
        /** 注册 GraphProvider */
        (0, graph_provider_1.registerGraphModule)(register);
        /** 注册 GraphProvider 配置 */
        (0, config_1.registerGraphConfig)(register, config);
    });
};
exports.createX6GraphModule = createX6GraphModule;
//# sourceMappingURL=module.js.map