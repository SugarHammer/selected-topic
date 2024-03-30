"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelGroupCommand = exports.NsDelGroup = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var constant_2 = require("../constant");
var NsDelGroup;
(function (NsDelGroup) {
    /** Command: 用于注册named factory */
    NsDelGroup.command = constant_1.XFlowGroupCommands.DEL_GROUP;
    /** hookName */
    NsDelGroup.hookKey = 'delGroup';
})(NsDelGroup = exports.NsDelGroup || (exports.NsDelGroup = {}));
var DelGroupCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function DelGroupCommand() {
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
                        return [4 /*yield*/, hooks.delGroup.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graph, nodeConfig, commandService, deleteGroupService, id, node, canDel, isCollapsed, childrens;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            nodeConfig = handlerArgs.nodeConfig, commandService = handlerArgs.commandService, deleteGroupService = handlerArgs.deleteService;
                                            id = nodeConfig.id;
                                            node = graph.getCellById(id);
                                            if (!deleteGroupService) return [3 /*break*/, 3];
                                            return [4 /*yield*/, deleteGroupService(handlerArgs)];
                                        case 2:
                                            canDel = _a.sent();
                                            if (!canDel)
                                                return [2 /*return*/, { err: 'service rejected' }];
                                            _a.label = 3;
                                        case 3:
                                            if (!node) {
                                                return [2 /*return*/, { err: 'target node is not exist' }];
                                            }
                                            // 不是Group的节点不能解散
                                            if (node.getProp('isGroup') !== true) {
                                                return [2 /*return*/, { err: 'target node is not group' }];
                                            }
                                            isCollapsed = node.getData().isCollapsed;
                                            if (!isCollapsed) return [3 /*break*/, 5];
                                            return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
                                                    nodeId: node.id,
                                                    isCollapsed: false,
                                                    collapsedSize: { width: 0, height: 0 },
                                                })];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            childrens = node.getChildren();
                                            if (childrens) {
                                                childrens.forEach(function (child) {
                                                    node.unembed(child);
                                                    child.prop('group', '');
                                                    child.setData(tslib_1.__assign(tslib_1.__assign({}, child.getData()), { group: '' }));
                                                });
                                            }
                                            return [4 /*yield*/, commandService.executeCommand(constant_2.XFlowNodeCommands.DEL_NODE.id, {
                                                    nodeConfig: nodeConfig,
                                                })
                                                /** add undo: delete node */
                                            ];
                                        case 6:
                                            _a.sent();
                                            /** add undo: delete node */
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    commandService.executeCommand(constant_1.XFlowGroupCommands.ADD_GROUP.id, {
                                                        nodeConfig: nodeConfig,
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); }));
                                            return [2 /*return*/, { err: null }];
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
    DelGroupCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], DelGroupCommand.prototype, "contextProvider", void 0);
    DelGroupCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsDelGroup.command.id },
        })
        /** 创建节点命令 */
    ], DelGroupCommand);
    return DelGroupCommand;
}());
exports.DelGroupCommand = DelGroupCommand;
//# sourceMappingURL=group-del.js.map