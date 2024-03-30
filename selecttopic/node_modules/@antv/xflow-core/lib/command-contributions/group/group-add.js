"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGroupCommand = exports.NsAddGroup = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var constant_2 = require("../constant");
var NsAddGroup;
(function (NsAddGroup) {
    /** Command: 用于注册named factory */
    NsAddGroup.command = constant_1.XFlowGroupCommands.ADD_GROUP;
    /** hookName */
    NsAddGroup.hookKey = 'addGroup';
    NsAddGroup.GROUP_PADDING = 12;
    NsAddGroup.GROUP_HEADER_HEIGHT = 40;
})(NsAddGroup = exports.NsAddGroup || (exports.NsAddGroup = {}));
var AddGroupCommand = /** @class */ (function () {
    /** 创建节点命令 */
    function AddGroupCommand() {
        var _this = this;
        this.getBBox = function (node, nodeConfig, graph) {
            var _a = nodeConfig.groupHeaderHeight, groupHeaderHeight = _a === void 0 ? NsAddGroup.GROUP_HEADER_HEIGHT : _a, _b = nodeConfig.groupPadding, groupPadding = _b === void 0 ? NsAddGroup.GROUP_PADDING : _b;
            var bbox = graph.getCellsBBox(node.children);
            bbox.moveAndExpand({
                x: -groupPadding,
                y: -(groupPadding + groupHeaderHeight),
                width: groupPadding * 2,
                height: groupPadding * 2 + groupHeaderHeight,
            });
            return bbox;
        };
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
                        return [4 /*yield*/, hooks.addGroup.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var nodeConfig, createGroupService, cellFactory, commandService, graph, res, groupCell, groupId, groupChildren, groupBBox;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            nodeConfig = handlerArgs.nodeConfig, createGroupService = handlerArgs.createService, cellFactory = handlerArgs.cellFactory, commandService = handlerArgs.commandService;
                                            return [4 /*yield*/, ctx.getX6Graph()];
                                        case 1:
                                            graph = _a.sent();
                                            return [4 /*yield*/, commandService.executeCommand(constant_2.XFlowNodeCommands.ADD_NODE.id, {
                                                    cellFactory: cellFactory,
                                                    createNodeService: createGroupService,
                                                    nodeConfig: nodeConfig,
                                                })];
                                        case 2:
                                            res = _a.sent();
                                            groupCell = res
                                                .contextProvider()
                                                .getResult().nodeCell;
                                            groupId = groupCell.id;
                                            groupChildren = nodeConfig.groupChildren;
                                            if (groupChildren.length) {
                                                groupChildren.forEach(function (nodeId) {
                                                    var child = graph.getCellById(nodeId);
                                                    if (child) {
                                                        child.setData(tslib_1.__assign(tslib_1.__assign({}, child.getData()), { group: groupId, isCollapsed: false }));
                                                        child.prop('group', groupId);
                                                        groupCell.addChild(child);
                                                        graph.unselect(child);
                                                    }
                                                });
                                                groupBBox = this.getBBox(groupCell, nodeConfig, graph);
                                                groupCell.position(groupBBox.x, groupBBox.y);
                                                groupCell.size(groupBBox.width, groupBBox.height);
                                                groupCell.setZIndex(0);
                                                groupCell.prop('isGroup', true);
                                                groupCell.setData(tslib_1.__assign(tslib_1.__assign({}, groupCell.getData()), { width: groupBBox.width, height: groupBBox.height, groupChildrenSize: { width: groupBBox.width, height: groupBBox.height }, x: groupBBox.x, y: groupBBox.y, isGroup: true }));
                                                graph.select(groupCell);
                                            }
                                            if (!nodeConfig.isCollapsed) return [3 /*break*/, 4];
                                            return [4 /*yield*/, commandService.executeCommand(constant_1.XFlowGroupCommands.COLLAPSE_GROUP.id, {
                                                    nodeId: nodeConfig.id,
                                                    isCollapsed: nodeConfig.isCollapsed,
                                                })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            /** add undo: delete node */
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    commandService.executeCommand(constant_1.XFlowGroupCommands.DEL_GROUP.id, {
                                                        nodeConfig: nodeConfig,
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); }));
                                            return [2 /*return*/, { nodeConfig: nodeConfig, nodeCell: groupCell }];
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
    AddGroupCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], AddGroupCommand.prototype, "contextProvider", void 0);
    AddGroupCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsAddGroup.command.id },
        })
        /** 创建节点命令 */
    ], AddGroupCommand);
    return AddGroupCommand;
}());
exports.AddGroupCommand = AddGroupCommand;
//# sourceMappingURL=group-add.js.map