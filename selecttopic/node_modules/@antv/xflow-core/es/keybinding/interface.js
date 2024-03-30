import { Syringe } from 'mana-syringe';
export const IKeyBindingService = Symbol('IKeyBindingService');
/** 实现这个扩展点来注册更多的keybinding */
export const IKeyBindingContribution = Syringe.defineToken('IKeyBindingContribution');
export const IKeyBindingOptionProvider = Symbol('IKeyBindingOptionProvider');
//# sourceMappingURL=interface.js.map