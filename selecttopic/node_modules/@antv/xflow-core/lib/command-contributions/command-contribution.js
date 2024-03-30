"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerXFlowCommandContribution = exports.XFlowCommandContribution = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-redeclare */
require("reflect-metadata");
/** Application 扩展依赖 */
var interface_1 = require("../command/interface");
var mana_syringe_1 = require("mana-syringe");
var interface_2 = require("../hooks/interface");
var disposable_1 = require("../common/disposable");
/** Commands */
var node_1 = require("./node");
var graph_1 = require("./graph");
var edge_1 = require("./edge");
var group_1 = require("./group");
var models_1 = require("./models");
/** Command Hooks*/
var xflow_hook_1 = require("@antv/xflow-hook");
var config_1 = require("./config");
/** Commands 配置项目*/
var hookhubList = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], node_1.hookhubList, true), edge_1.hookhubList, true), group_1.hookhubList, true), graph_1.hookhubList, true), models_1.hookhubList, true);
var defaultHookFactory = function () { return new xflow_hook_1.HookHub(); };
var XFlowCommandContribution = /** @class */ (function () {
    function XFlowCommandContribution() {
        var _this = this;
        /** 注册钩子 */
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var d;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                d = hooks.x6Events.registerHook({
                    name: 'bind group node move event',
                    handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var event;
                        var _this = this;
                        return tslib_1.__generator(this, function (_a) {
                            event = {
                                eventName: 'node:moving',
                                callback: function (_a) {
                                    var node = _a.node;
                                    return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var isGroup, graph, groupId, group, isCollapsed, originSize, hasChange, originPosition, x, y, cornerX, cornerY, childs, groupData;
                                        return tslib_1.__generator(this, function (_b) {
                                            isGroup = node.prop('isGroup');
                                            if (isGroup) {
                                                node.prop('originPosition', node.getPosition());
                                                return [2 /*return*/];
                                            }
                                            graph = node.model.graph;
                                            groupId = node.getData().group;
                                            group = graph.getNodes().find(function (cell) { return cell.id === groupId; });
                                            if (!group) {
                                                return [2 /*return*/];
                                            }
                                            isCollapsed = group.getProp('isCollapsed');
                                            originSize = group.getProp('originSize');
                                            hasChange = false;
                                            if (originSize == null) {
                                                originSize = group.size();
                                                group.prop('originSize', originSize);
                                            }
                                            originPosition = group.prop('originPosition');
                                            if (originPosition == null) {
                                                originPosition = group.getPosition();
                                                group.prop('originPosition', originPosition);
                                            }
                                            x = originPosition.x;
                                            y = originPosition.y;
                                            cornerX = originPosition.x + originSize.width;
                                            cornerY = originPosition.y + originSize.height;
                                            childs = group.getChildren();
                                            if (childs) {
                                                childs.forEach(function (child) {
                                                    var bbox = child.getBBox().inflate(12);
                                                    var corner = bbox.getCorner();
                                                    if (bbox.x < x) {
                                                        x = bbox.x;
                                                        hasChange = true;
                                                    }
                                                    if (bbox.y < y) {
                                                        y = bbox.y;
                                                        hasChange = true;
                                                    }
                                                    if (corner.x > cornerX) {
                                                        cornerX = corner.x;
                                                        hasChange = true;
                                                    }
                                                    if (corner.y > cornerY) {
                                                        cornerY = corner.y;
                                                        hasChange = true;
                                                    }
                                                });
                                            }
                                            if (hasChange) {
                                                group.prop({
                                                    position: { x: x, y: y },
                                                    size: { width: cornerX - x, height: cornerY - y },
                                                });
                                                groupData = tslib_1.__assign(tslib_1.__assign({}, group.getData()), { x: x, y: y, width: cornerX - x, height: cornerY - y });
                                                if (isCollapsed !== true) {
                                                    groupData.groupChildrenSize = { width: cornerX - x, height: cornerY - y };
                                                }
                                                group.setData(groupData);
                                            }
                                            return [2 /*return*/];
                                        });
                                    });
                                },
                            };
                            args.push(event);
                            return [2 /*return*/];
                        });
                    }); },
                });
                return [2 /*return*/, disposable_1.Disposable.create(function () {
                        d.dispose();
                    })];
            });
        }); };
        /** 注册钩子 */
        this.registerHookHub = function (registry) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toDispose;
            return tslib_1.__generator(this, function (_a) {
                toDispose = new disposable_1.DisposableCollection();
                hookhubList.forEach(function (_a) {
                    var hookKey = _a.hookKey, _b = _a.createHook, createHook = _b === void 0 ? defaultHookFactory : _b;
                    var d = registry.registerHookHub(hookKey, createHook());
                    toDispose.push(d);
                });
                this.commandConfig.getConfig().then(function (_a) {
                    var getContributions = _a.getContributions;
                    var CommandContributions = getContributions();
                    CommandContributions.forEach(function (_a) {
                        var hookKey = _a.hookKey, _b = _a.createHook, createHook = _b === void 0 ? defaultHookFactory : _b;
                        var d = registry.registerHookHub(hookKey, createHook());
                        toDispose.push(d);
                    });
                });
                return [2 /*return*/, toDispose];
            });
        }); };
    }
    /** 注册画布节点命令 */
    XFlowCommandContribution.prototype.registerGraphCommands = function (registry) {
        var _this = this;
        /** 注册内置的命令 */
        hookhubList.forEach(function (_a) {
            var command = _a.command;
            registry.registerCommand(command, {
                createCommand: _this.commandFactory,
            });
        });
        /** 注册外部传入的命令 */
        this.commandConfig.getConfig().then(function (_a) {
            var getContributions = _a.getContributions;
            var CommandContributions = getContributions();
            CommandContributions.forEach(function (cmd) {
                registry.registerCommand(cmd.command, {
                    createCommand: _this.commandFactory,
                });
            });
        });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.IGraphCommandFactory),
        tslib_1.__metadata("design:type", Function)
    ], XFlowCommandContribution.prototype, "commandFactory", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(config_1.CommandConfig),
        tslib_1.__metadata("design:type", config_1.CommandConfig
        /** 注册画布节点命令 */
        )
    ], XFlowCommandContribution.prototype, "commandConfig", void 0);
    XFlowCommandContribution = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: [interface_1.IGraphCommandContribution, interface_2.IHookContribution] })
    ], XFlowCommandContribution);
    return XFlowCommandContribution;
}());
exports.XFlowCommandContribution = XFlowCommandContribution;
var registerXFlowCommandContribution = function (register, commandConfig) {
    /** 扩展 用户自定义命令 */
    var configContributions = commandConfig.getCommandContributions();
    configContributions.forEach(function (execution) {
        var CommandHandler = execution.CommandHandler, command = execution.command;
        register({
            token: { token: interface_1.ICommandHandler, named: command.id },
            useClass: CommandHandler,
        });
    });
    /** 扩展 Graph 命令 */
    (0, graph_1.registerGraphCommand)(register);
    /** 扩展 Node 命令 */
    (0, node_1.registerNodeCommand)(register);
    /** 扩展 Edge 命令 */
    (0, edge_1.registerEdgeCommand)(register);
    /** 扩展 Edge 命令 */
    (0, group_1.registerGroupCommand)(register);
    /** 扩展 Observable 命令 */
    (0, models_1.registerModelServiceCommand)(register);
    /** 注册 XFlowCommandContribution */
    register(XFlowCommandContribution);
};
exports.registerXFlowCommandContribution = registerXFlowCommandContribution;
//# sourceMappingURL=command-contribution.js.map