"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModelContribution = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var interface_2 = require("../interface");
var CommandModelContribution = /** @class */ (function () {
    function CommandModelContribution() {
    }
    /** 扩展Model */
    CommandModelContribution.prototype.registerModel = function (registry) {
        var _this = this;
        /** 是否可以redo */
        registry.registerModel({
            id: constant_1.COMMAND_REDOABLE.id,
            getInitialValue: function () { return _this.commands.isRedoable; },
            watchChange: function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var disposable;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    disposable = this.commands.watchChange(function () {
                        model.setValue(_this.commands.isRedoable);
                    });
                    return [2 /*return*/, disposable];
                });
            }); },
        });
        /** 是否可以undo */
        registry.registerModel({
            id: constant_1.COMMAND_UNDOABLE.id,
            getInitialValue: function () { return _this.commands.isUndoable; },
            watchChange: function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var disposable;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    disposable = this.commands.watchChange(function () {
                        model.setValue(_this.commands.isUndoable);
                    });
                    return [2 /*return*/, disposable];
                });
            }); },
        });
        /** command 执行结果 */
        registry.registerModel({
            id: constant_1.COMMAND_GLOBALS.id,
            modelFactory: function () {
                return _this.commands.Globals;
            },
        });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.IGraphCommandService),
        tslib_1.__metadata("design:type", Object)
    ], CommandModelContribution.prototype, "commands", void 0);
    CommandModelContribution = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: interface_2.IModelContribution })
    ], CommandModelContribution);
    return CommandModelContribution;
}());
exports.CommandModelContribution = CommandModelContribution;
//# sourceMappingURL=command-model.js.map