"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitGroupCommand = exports.NsInitGroup = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var constants_1 = require("../../constants");
var NsInitGroup;
(function (NsInitGroup) {
    /** Command: 用于注册named factory */
    NsInitGroup.command = constant_1.XFlowGroupCommands.INIT_GROUP;
    /** hookName */
    NsInitGroup.hookKey = 'initGroup';
})(NsInitGroup = exports.NsInitGroup || (exports.NsInitGroup = {}));
var InitGroupCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function InitGroupCommand() {
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
                        return [4 /*yield*/, hooks.initGroup.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graphData, commandService, graph, nodes, groupMap;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            graphData = handlerArgs.graphData, commandService = handlerArgs.commandService;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            nodes = graphData.nodes;
                                            groupMap = {};
                                            nodes.forEach(function (node) {
                                                var id = node.id, group = node.group;
                                                if (group) {
                                                    if (groupMap[group]) {
                                                        groupMap[group].push(id);
                                                    }
                                                    else {
                                                        groupMap[group] = [id];
                                                    }
                                                }
                                            });
                                            Object.keys(groupMap).forEach(function (groupId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var groupNode, groupData, childrenIds, isCollapsed, groupCollapsedSize, collapsedSize;
                                                return tslib_1.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            groupNode = graph.getCellById(groupId);
                                                            groupData = groupNode.getData();
                                                            childrenIds = groupMap[groupId] || [];
                                                            // 更新props
                                                            groupNode.prop('isGroup', true);
                                                            groupNode.setData(tslib_1.__assign(tslib_1.__assign({}, groupData), { isGroup: true, groupChildren: childrenIds }));
                                                            childrenIds.forEach(function (childId) {
                                                                var child = graph.getCellById(childId);
                                                                groupNode.embed(child);
                                                            });
                                                            // Group置于底层
                                                            groupNode.toBack();
                                                            isCollapsed = groupData.isCollapsed, groupCollapsedSize = groupData.groupCollapsedSize;
                                                            if (!isCollapsed) return [3 /*break*/, 2];
                                                            collapsedSize = handlerArgs.collapsedSize || groupCollapsedSize || constants_1.XFLOW_GROUP_DEFAULT_COLLAPSED_SIZE;
                                                            return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
                                                                    collapsedSize: collapsedSize,
                                                                    isCollapsed: true,
                                                                    nodeId: groupNode.id,
                                                                })];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/, {}];
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
    InitGroupCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], InitGroupCommand.prototype, "contextProvider", void 0);
    InitGroupCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsInitGroup.command.id },
        })
        /** 创建节点命令 */
    ], InitGroupCommand);
    return InitGroupCommand;
}());
exports.InitGroupCommand = InitGroupCommand;
//# sourceMappingURL=group-init.js.map