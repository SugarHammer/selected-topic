"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCmd = exports.UpdateModelCommand = exports.NsUpdateModelCommand = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var immer_1 = require("immer");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsUpdateModelCommand;
(function (NsUpdateModelCommand) {
    /** Command: 用于注册named factory */
    NsUpdateModelCommand.command = constant_1.XFlowModelCommands.UPDATE_MODEL;
    /** hookName */
    NsUpdateModelCommand.hookKey = 'updateModel';
})(NsUpdateModelCommand = exports.NsUpdateModelCommand || (exports.NsUpdateModelCommand = {}));
var UpdateModelCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function UpdateModelCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = this.contextProvider();
                        _a = ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = ctx.getHooks();
                        return [4 /*yield*/, hooks.updateModel.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var updateModel, getModel, modelService, model, currentValue, draft, newValue;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            updateModel = handlerArgs.updateModel, getModel = handlerArgs.getModel, modelService = handlerArgs.modelService;
                                            return [4 /*yield*/, getModel(modelService)];
                                        case 1:
                                            model = _a.sent();
                                            currentValue = model.getValue();
                                            draft = (0, immer_1.createDraft)(currentValue);
                                            return [4 /*yield*/, updateModel(draft)];
                                        case 2:
                                            _a.sent();
                                            newValue = (0, immer_1.finishDraft)(draft);
                                            model.setValue(newValue);
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    model.setValue(newValue);
                                                    return [2 /*return*/];
                                                });
                                            }); }));
                                            return [2 /*return*/, { model: model, value: newValue }];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 1:
                        result = _b.sent();
                        ctx.setResult(result);
                        return [2 /*return*/, this];
                }
            });
        }); };
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx;
            return tslib_1.__generator(this, function (_a) {
                ctx = this.contextProvider();
                if (this.isUndoable()) {
                    ctx.undo();
                }
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
        this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isUndoable()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        }); };
    }
    UpdateModelCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], UpdateModelCommand.prototype, "contextProvider", void 0);
    UpdateModelCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsUpdateModelCommand.command.id },
        })
        /** 创建节点命令 */
    ], UpdateModelCommand);
    return UpdateModelCommand;
}());
exports.UpdateModelCommand = UpdateModelCommand;
var execCmd = function () { };
exports.execCmd = execCmd;
//# sourceMappingURL=update-model.js.map