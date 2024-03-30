"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePortTooltipContribution = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var interface_1 = require("../interface");
var xflow_core_3 = require("@antv/xflow-core");
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
var NodePortTooltipContribution = /** @class */ (function () {
    function NodePortTooltipContribution() {
        var _this = this;
        this.toDispose = new xflow_core_3.DisposableCollection();
        /** 获取画布实例 */
        this.getGraphInstance = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graphInstance, graphConfig;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graphInstance = _a.sent();
                        return [4 /*yield*/, this.graphProvider.getGraphOptions()];
                    case 2:
                        graphConfig = _a.sent();
                        return [2 /*return*/, { graph: graphInstance, config: graphConfig }];
                }
            });
        }); };
        /** 获取GraphOptions */
        this.getPortRenderConfig = function () {
            var dagOptions = {
                onPortRendered: function (portRenderedArgs) {
                    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
                    var graph = this;
                    var port = portRenderedArgs.port, node = portRenderedArgs.node;
                    var contentSelectors = portRenderedArgs.contentSelectors;
                    var portContainer = contentSelectors && contentSelectors['xflow-port-group'];
                    if (portContainer instanceof Element) {
                        portContainer.setAttribute('class', (0, classnames_1.default)('xflow-port-group', {
                            connected: port.connected && port.group !== 'out',
                            groupPort: (node === null || node === void 0 ? void 0 : node.isGroup) && (node === null || node === void 0 ? void 0 : node.isGroup()),
                        }));
                        portContainer.addEventListener('mouseenter', function (e) {
                            var eventArgs = {
                                e: e,
                                portId: port.id,
                                nodeId: node.id,
                                portData: port,
                                nodeData: node.getData(),
                                tooltip: port.tooltip,
                                placement: port.group,
                            };
                            graph.trigger(interface_1.NsPortEvent.MOUSE_ENTER, eventArgs);
                        });
                        portContainer.addEventListener('mouseleave', function (e) {
                            var eventArgs = {
                                e: e,
                                portId: port.id,
                                nodeId: node.id,
                                portData: port,
                                nodeData: node.getData(),
                                tooltip: port.tooltip,
                                placement: port.group,
                            };
                            graph.trigger(interface_1.NsPortEvent.MOUSE_LEAVE, eventArgs);
                        });
                    }
                },
            };
            return dagOptions;
        };
        this.registerHookHub = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, xflow_core_3.Disposable.create(function () { })];
            });
        }); };
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toDispose, disposables;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                toDispose = new xflow_core_3.DisposableCollection();
                disposables = [
                    hooks.graphOptions.registerHook({
                        name: 'add onPortRendered options ',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                Object.assign(args, this.getPortRenderConfig());
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                ];
                toDispose.pushAll(disposables);
                return [2 /*return*/, xflow_core_3.Disposable.create(function () { })];
            });
        }); };
    }
    NodePortTooltipContribution.prototype.registerModel = function (registry) {
        var _this = this;
        registry.registerModel({
            id: interface_1.ACTIVE_NODE_PORT.id,
            watchChange: function (self) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, graph, config, calcPosition, onMouseEnter, onMouseLeave;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getGraphInstance()];
                        case 1:
                            _a = _b.sent(), graph = _a.graph, config = _a.config;
                            calcPosition = function (e) {
                                var _a = e.target.getBoundingClientRect(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                                var clientRect = config.rootContainer.getBoundingClientRect();
                                var position = {
                                    x: x - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.x) || 0) + width / 2,
                                    y: y - ((clientRect === null || clientRect === void 0 ? void 0 : clientRect.y) || 0) + height / 2,
                                };
                                return position;
                            };
                            onMouseEnter = function (args) {
                                self.setValue(tslib_1.__assign(tslib_1.__assign({}, args), { position: calcPosition(args.e) }));
                            };
                            onMouseLeave = function () {
                                self.setValue(null);
                            };
                            /** 绑定事件 */
                            graph.on(interface_1.NsPortEvent.MOUSE_ENTER, onMouseEnter);
                            graph.on(interface_1.NsPortEvent.MOUSE_LEAVE, onMouseLeave);
                            graph.on('cell:mouseleave', onMouseLeave);
                            return [2 /*return*/, xflow_core_3.Disposable.create(function () {
                                    /** 解除绑定 */
                                    graph.off(interface_1.NsPortEvent.MOUSE_ENTER, onMouseEnter);
                                    graph.off(interface_1.NsPortEvent.MOUSE_LEAVE, onMouseLeave);
                                })];
                    }
                });
            }); },
        });
    };
    tslib_1.__decorate([
        xflow_core_1.ManaSyringe.inject(xflow_core_2.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], NodePortTooltipContribution.prototype, "graphProvider", void 0);
    NodePortTooltipContribution = tslib_1.__decorate([
        xflow_core_1.ManaSyringe.singleton({ contrib: [xflow_core_1.IHookContribution, xflow_core_3.IModelContribution] })
    ], NodePortTooltipContribution);
    return NodePortTooltipContribution;
}());
exports.NodePortTooltipContribution = NodePortTooltipContribution;
//# sourceMappingURL=node-port.js.map