"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHooks = exports.IHookContribution = exports.IHookService = void 0;
var xflow_hook_1 = require("@antv/xflow-hook");
var mana_syringe_1 = require("mana-syringe");
/**
 * extension 应该实现这个扩展点来注册更多的hook
 */
exports.IHookService = mana_syringe_1.Syringe.defineToken('IHookService');
/**
 * extension 应该实现这个扩展点来注册更多的hook
 */
exports.IHookContribution = mana_syringe_1.Syringe.defineToken('IHookContribution');
var initHooks = function () { return ({
    graphOptions: new xflow_hook_1.HookHub(),
    reactNodeRender: new xflow_hook_1.HookHub(),
    reactEdgeLabelRender: new xflow_hook_1.HookHub(),
    afterGraphInit: new xflow_hook_1.HookHub(),
    beforeGraphDestroy: new xflow_hook_1.HookHub(),
    x6Events: new xflow_hook_1.HookHub(),
}); };
exports.initHooks = initHooks;
//# sourceMappingURL=interface.js.map