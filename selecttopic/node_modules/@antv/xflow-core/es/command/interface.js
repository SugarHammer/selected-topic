// utils
import { Syringe } from 'mana-syringe';
/**
 * IGraphCommandService
 * 声明执行Command的接口
 */
export const IGraphCommandService = Symbol('IGraphCommandService');
/**
 * Command Handler 的 Token
 */
export const ICommandHandler = Syringe.defineToken('ICommandHandler');
/** Command Context Provider 的 Symbol 提供执行需要的各种api */
export const ICommandContextProvider = Symbol('ICommandContextProvider');
/**
 * IGraphCommandFactory
 * Command工厂方法
 */
export const IGraphCommandFactory = Symbol('IGraphCommandFactory');
/**
 * Command注册扩展的Symbol
 */
export const IGraphCommandContribution = Syringe.defineToken('IGraphCommandContribution');
//# sourceMappingURL=interface.js.map