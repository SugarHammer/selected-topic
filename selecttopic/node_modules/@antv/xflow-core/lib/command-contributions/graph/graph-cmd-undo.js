"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphUndoCommand = exports.NsUndoCmd = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsUndoCmd;
(function (NsUndoCmd) {
    /** Command Id: 用于注册named factory */
    NsUndoCmd.command = constant_1.XFlowGraphCommands.UNDO_CMD;
    /** hookName */
    NsUndoCmd.hookKey = 'undoCommand';
})(NsUndoCmd = exports.NsUndoCmd || (exports.NsUndoCmd = {}));
var GraphUndoCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function GraphUndoCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, _a, args, runtimeHook, hooks;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = this.ctx;
                        _a = ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = ctx.getHooks();
                        return [4 /*yield*/, hooks.undoCommand.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var cmds;
                                return tslib_1.__generator(this, function (_a) {
                                    cmds = ctx.getCommands();
                                    if (cmds.isUndoable) {
                                        cmds.undoCommand();
                                    }
                                    /** 设置结果 */
                                    this.ctx.addUndo(disposable_1.Disposable.create(function () {
                                        cmds.redoCommand();
                                    }));
                                    return [2 /*return*/, {}];
                                });
                            }); }, 
                            /** 外部的 hook */
                            runtimeHook)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this];
                }
            });
        }); };
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
        this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.ctx.isUndoable) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.execute()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this];
                }
            });
        }); };
    }
    GraphUndoCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphUndoCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphUndoCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphUndoCommand.prototype, "init", null);
    GraphUndoCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsUndoCmd.command.id },
        })
        /** 创建节点命令 */
    ], GraphUndoCommand);
    return GraphUndoCommand;
}());
exports.GraphUndoCommand = GraphUndoCommand;
//# sourceMappingURL=graph-cmd-undo.js.map