"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IModelOptionProvider = exports.IModelContribution = exports.IModelService = void 0;
var mana_syringe_1 = require("mana-syringe");
/**
 * Model Service Token
 */
exports.IModelService = mana_syringe_1.Syringe.defineToken('IModelService');
/**
 * 在 extensions 中实现这个扩展点来注册更多的Model
 */
exports.IModelContribution = mana_syringe_1.Syringe.defineToken('IModelContribution');
exports.IModelOptionProvider = Symbol('IModelOptionProvider');
//# sourceMappingURL=interface.js.map