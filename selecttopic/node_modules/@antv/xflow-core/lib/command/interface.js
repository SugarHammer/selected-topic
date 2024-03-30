"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGraphCommandContribution = exports.IGraphCommandFactory = exports.ICommandContextProvider = exports.ICommandHandler = exports.IGraphCommandService = void 0;
// utils
var mana_syringe_1 = require("mana-syringe");
/**
 * IGraphCommandService
 * 声明执行Command的接口
 */
exports.IGraphCommandService = Symbol('IGraphCommandService');
/**
 * Command Handler 的 Token
 */
exports.ICommandHandler = mana_syringe_1.Syringe.defineToken('ICommandHandler');
/** Command Context Provider 的 Symbol 提供执行需要的各种api */
exports.ICommandContextProvider = Symbol('ICommandContextProvider');
/**
 * IGraphCommandFactory
 * Command工厂方法
 */
exports.IGraphCommandFactory = Symbol('IGraphCommandFactory');
/**
 * Command注册扩展的Symbol
 */
exports.IGraphCommandContribution = mana_syringe_1.Syringe.defineToken('IGraphCommandContribution');
//# sourceMappingURL=interface.js.map