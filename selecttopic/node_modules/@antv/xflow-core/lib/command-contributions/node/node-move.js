"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveNodeCommand = exports.NsMoveNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var xflow_hook_1 = require("@antv/xflow-hook");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var NsMoveNode;
(function (NsMoveNode) {
    /** Command: 用于注册named factory */
    NsMoveNode.command = constant_1.XFlowNodeCommands.MOVE_NODE;
    /** hookName */
    NsMoveNode.hookKey = 'moveNode';
    /** 创建 hook */
    NsMoveNode.createHook = function () {
        return new xflow_hook_1.HookHub();
    };
})(NsMoveNode = exports.NsMoveNode || (exports.NsMoveNode = {}));
var MoveNodeCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function MoveNodeCommand() {
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
                        return [4 /*yield*/, hooks.moveNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var nodePositionService, canMove, _a, _b, dx, _c, dy, x, y, _d, duration, x6Graph, node, nextX, nextY, _e, preX_1, preY_1, undo_1;
                                return tslib_1.__generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            nodePositionService = handlerArgs.nodePositionService;
                                            if (!nodePositionService) return [3 /*break*/, 2];
                                            return [4 /*yield*/, nodePositionService(handlerArgs)];
                                        case 1:
                                            canMove = _f.sent();
                                            if (!canMove)
                                                return [2 /*return*/, { err: 'service rejected' }];
                                            _f.label = 2;
                                        case 2:
                                            _a = handlerArgs.position, _b = _a.dx, dx = _b === void 0 ? 0 : _b, _c = _a.dy, dy = _c === void 0 ? 0 : _c, x = _a.x, y = _a.y, _d = _a.duration, duration = _d === void 0 ? 150 : _d;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 3:
                                            x6Graph = _f.sent();
                                            node = x6Graph.getCellById(handlerArgs.id);
                                            if (node) {
                                                nextX = x;
                                                nextY = y;
                                                _e = node.position(), preX_1 = _e.x, preY_1 = _e.y;
                                                undo_1 = function () {
                                                    node.position(preX_1, preY_1, { silent: false });
                                                };
                                                if (dx || dy) {
                                                    nextX = dx + preX_1;
                                                    nextY = dy + preY_1;
                                                    node.translate(dx, dy, { transition: { duration: duration } });
                                                    undo_1 = function () { return node.translate(-dx, -dy, { transition: { duration: duration } }); };
                                                }
                                                else {
                                                    node.position(nextX, nextY, { silent: false });
                                                }
                                                /** add undo  */
                                                ctx.addUndo(disposable_1.Disposable.create(function () {
                                                    undo_1();
                                                }));
                                                return [2 /*return*/, { err: null, nextX: nextX, nextY: nextY }];
                                            }
                                            return [2 /*return*/];
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
    MoveNodeCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], MoveNodeCommand.prototype, "contextProvider", void 0);
    MoveNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsMoveNode.command.id },
        })
        /** 创建节点命令 */
    ], MoveNodeCommand);
    return MoveNodeCommand;
}());
exports.MoveNodeCommand = MoveNodeCommand;
//# sourceMappingURL=node-move.js.map