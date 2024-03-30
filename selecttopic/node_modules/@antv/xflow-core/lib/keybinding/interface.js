"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKeyBindingOptionProvider = exports.IKeyBindingContribution = exports.IKeyBindingService = void 0;
var mana_syringe_1 = require("mana-syringe");
exports.IKeyBindingService = Symbol('IKeyBindingService');
/** 实现这个扩展点来注册更多的keybinding */
exports.IKeyBindingContribution = mana_syringe_1.Syringe.defineToken('IKeyBindingContribution');
exports.IKeyBindingOptionProvider = Symbol('IKeyBindingOptionProvider');
//# sourceMappingURL=interface.js.map