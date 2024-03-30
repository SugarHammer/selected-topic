import { Syringe } from 'mana-syringe';
/** IToolbarService: 用于注册/消费item */
export const IToolbarService = Symbol('IToolbarService');
/**
 * Clients should implement this interface if they want to contribute to the tab-bar toolbar.
 */
export const IToolbarContribution = Syringe.defineToken('IToolbarContribution');
//# sourceMappingURL=interface.js.map