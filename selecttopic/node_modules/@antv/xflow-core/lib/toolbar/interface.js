"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IToolbarContribution = exports.IToolbarService = void 0;
var mana_syringe_1 = require("mana-syringe");
/** IToolbarService: 用于注册/消费item */
exports.IToolbarService = Symbol('IToolbarService');
/**
 * Clients should implement this interface if they want to contribute to the tab-bar toolbar.
 */
exports.IToolbarContribution = mana_syringe_1.Syringe.defineToken('IToolbarContribution');
//# sourceMappingURL=interface.js.map