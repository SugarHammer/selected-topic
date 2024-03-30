"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEventContribution = exports.NsGraphEventPlugin = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var config_1 = require("../../xflow-main/graph/config");
var constant_1 = require("../../command-contributions/constant");
var disposable_1 = require("../../common/disposable");
var interface_1 = require("../interface");
var utils_1 = require("../../common/utils");
var NsGraphEventPlugin;
(function (NsGraphEventPlugin) {
    NsGraphEventPlugin.pluginId = 'base-graph-events';
})(NsGraphEventPlugin = exports.NsGraphEventPlugin || (exports.NsGraphEventPlugin = {}));
/**
 * 内置的hook contribution
 * 处理graph config 的 evnets props
 */
var GraphEventContribution = /** @class */ (function () {
    function GraphEventContribution() {
        var _this = this;
        this.toDispose = new disposable_1.DisposableCollection();
        this.registerHookHub = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, disposable_1.Disposable.create(function () { })];
            });
        }); };
        /** 扩展Hook */
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toDispose, disposables;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                toDispose = new disposable_1.DisposableCollection();
                disposables = [
                    /** 在graph启动前, 注册外部事件到x6Events的hooks上*/
                    hooks.x6Events.registerHook({
                        name: NsGraphEventPlugin.pluginId,
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var events;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.graphOptions.getOptions()];
                                    case 1:
                                        events = (_a.sent()).events;
                                        events.forEach(function (event) {
                                            args.push(event);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    }),
                    /** 在graph init后, 外部事件 */
                    hooks.afterGraphInit.registerHook({
                        name: NsGraphEventPlugin.pluginId,
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var commandService, modelService, graph, todo;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        commandService = args.commandService, modelService = args.modelService, graph = args.graph;
                                        return [4 /*yield*/, hooks.x6Events.call([], function (mergedEvents) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                return tslib_1.__generator(this, function (_a) {
                                                    return [2 /*return*/, mergedEvents.map(function (e) {
                                                            var handler = function (handlerArgs) {
                                                                e.callback(handlerArgs, commandService, modelService, graph);
                                                            };
                                                            graph.on(e.eventName, handler);
                                                            return {
                                                                dispose: function () {
                                                                    graph.off(e.eventName, handler);
                                                                },
                                                            };
                                                        })];
                                                });
                                            }); })];
                                    case 1:
                                        todo = _a.sent();
                                        toDispose.pushAll(todo);
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    }),
                    /** 监听window的resize事件，实现自动resize */
                    hooks.afterGraphInit.registerHook({
                        name: 'add auto resize event',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var commandService, options, graph, resizeHandler, rootContainer, resizeObserver;
                            return tslib_1.__generator(this, function (_a) {
                                commandService = args.commandService, options = args.options, graph = args.graph;
                                resizeHandler = (0, utils_1.throttle)(function () {
                                    commandService.executeCommand(constant_1.XFlowGraphCommands.GRAPH_RESIZE.id, {});
                                });
                                window.addEventListener('resize', resizeHandler);
                                rootContainer = options.rootContainer;
                                resizeObserver = new ResizeObserver(function () { return graph.resize(rootContainer.clientWidth); });
                                rootContainer && resizeObserver.observe(rootContainer);
                                toDispose.push(disposable_1.Disposable.create(function () {
                                    window.removeEventListener('resize', resizeHandler);
                                }));
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                    /** 在graph停止时 取消外部事件 */
                    hooks.beforeGraphDestroy.registerHook({
                        name: NsGraphEventPlugin.pluginId,
                        handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                toDispose.dispose();
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                ];
                toDispose.pushAll(disposables);
                return [2 /*return*/, toDispose];
            });
        }); };
    }
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(config_1.IGraphOptionProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphEventContribution.prototype, "graphOptions", void 0);
    GraphEventContribution = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({ contrib: interface_1.IHookContribution })
    ], GraphEventContribution);
    return GraphEventContribution;
}());
exports.GraphEventContribution = GraphEventContribution;
//# sourceMappingURL=graph.js.map