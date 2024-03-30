import { Syringe } from 'mana-syringe';
/**
 * Model Service Token
 */
export const IModelService = Syringe.defineToken('IModelService');
/**
 * 在 extensions 中实现这个扩展点来注册更多的Model
 */
export const IModelContribution = Syringe.defineToken('IModelContribution');
export const IModelOptionProvider = Symbol('IModelOptionProvider');
//# sourceMappingURL=interface.js.map