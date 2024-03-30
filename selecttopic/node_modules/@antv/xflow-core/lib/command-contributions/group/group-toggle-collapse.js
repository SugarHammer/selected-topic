"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapseGroupCommand = exports.NsCollapseGroup = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var interface_1 = require("../../command/interface");
var constants_1 = require("../../constants");
var NsCollapseGroup;
(function (NsCollapseGroup) {
    NsCollapseGroup.command = constant_1.XFlowGroupCommands.COLLAPSE_GROUP;
    NsCollapseGroup.hookKey = 'collapseGroup';
})(NsCollapseGroup = exports.NsCollapseGroup || (exports.NsCollapseGroup = {}));
var CollapseGroupCommand = /** @class */ (function () {
    /** 添加子节点命令 */
    function CollapseGroupCommand() {
        var _this = this;
        this.toggleVisible = function (cells, visible, graph) {
            cells.forEach(function (cell) {
                var view = graph.findViewByCell(cell).container;
                view.style.visibility = visible ? 'visible' : 'hidden';
            });
        };
        this.toggleCollapse = function (groupNode, graph, args) {
            var childrens = groupNode.getChildren().filter(function (n) { return n.isNode(); });
            var groupData = groupNode.getData();
            var isCollapsed = args.isCollapsed, _a = args.gap, gap = _a === void 0 ? 0 : _a;
            if (isCollapsed) {
                var collapsedSize = args.collapsedSize || groupData.groupCollapsedSize || constants_1.XFLOW_GROUP_DEFAULT_COLLAPSED_SIZE;
                groupNode.prop('previousSize', groupNode.size());
                groupNode.size(collapsedSize);
            }
            else {
                groupNode.size(groupNode.prop('previousSize'));
            }
            if (childrens) {
                childrens.forEach(function (item) {
                    var position = groupNode.position();
                    var innerEdges = graph.getConnectedEdges(item).filter(function (edge) {
                        var sourceNode = edge.getSourceNode();
                        var targetNode = edge.getTargetNode();
                        return childrens.includes(sourceNode) && childrens.includes(targetNode);
                    });
                    if (isCollapsed) {
                        _this.toggleVisible(tslib_1.__spreadArray([item], innerEdges, true), false, graph);
                        item.prop('previousSize', item.size());
                        item.prop('previousRelativePosition', item.position({ relative: true }));
                        item.position(position.x + gap, position.y + gap);
                        var size = groupNode.size();
                        item.size({
                            width: size.width - gap * 2,
                            height: size.height - gap * 2,
                        });
                    }
                    else {
                        _this.toggleVisible(tslib_1.__spreadArray([item], innerEdges, true), true, graph);
                        var pos = item.prop('previousRelativePosition');
                        var size = item.prop('previousSize');
                        item.position(pos.x, pos.y, { relative: true });
                        item.size(size);
                    }
                });
            }
            groupNode.prop('isCollapsed', isCollapsed);
            groupNode.setData(tslib_1.__assign(tslib_1.__assign({}, groupNode.getData()), { isCollapsed: isCollapsed }));
        };
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.collapseGroup.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, node, toggleService, canToggle;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            node = x6Graph.getCellById(args.nodeId);
                                            toggleService = handlerArgs.toggleService;
                                            if (!toggleService) return [3 /*break*/, 3];
                                            return [4 /*yield*/, toggleService(handlerArgs)];
                                        case 2:
                                            canToggle = _a.sent();
                                            if (!canToggle)
                                                return [2 /*return*/, { err: 'service rejected' }];
                                            _a.label = 3;
                                        case 3:
                                            if (node) {
                                                this.toggleCollapse(node, x6Graph, args);
                                                this.ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        if (node) {
                                                            this.toggleCollapse(node, x6Graph, Object.assign(args, { isCollapsed: !args.isCollapsed }));
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); }));
                                            }
                                            return [2 /*return*/, { err: null }];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 1:
                        result = _b.sent();
                        this.ctx.setResult(result);
                        return [2 /*return*/, this];
                }
            });
        }); };
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
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
    CollapseGroupCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    CollapseGroupCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], CollapseGroupCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CollapseGroupCommand.prototype, "init", null);
    CollapseGroupCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsCollapseGroup.command.id },
        })
        /** 添加子节点命令 */
    ], CollapseGroupCommand);
    return CollapseGroupCommand;
}());
exports.CollapseGroupCommand = CollapseGroupCommand;
//# sourceMappingURL=group-toggle-collapse.js.map