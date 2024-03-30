"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowHooksContribution = exports.flowOptions = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var xflow_core_2 = require("@antv/xflow-core");
var node_1 = require("../x6-extension/node");
var x6_1 = require("@antv/x6");
exports.flowOptions = {
    grid: true,
    mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
    },
    connecting: {
        router: 'manhattan',
        connector: {
            name: 'rounded',
            args: {
                radius: 8,
            },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
            radius: 20,
        },
        createEdge: function () {
            return new x6_1.Shape.Edge({
                attrs: {
                    line: {
                        stroke: '#A2B1C3',
                        strokeWidth: 2,
                        targetMarker: {
                            name: 'block',
                            width: 12,
                            height: 8,
                        },
                    },
                },
                zIndex: 0,
            });
        },
        validateConnection: function (_a) {
            var targetMagnet = _a.targetMagnet;
            return !!targetMagnet;
        },
    },
    highlighting: {
        magnetAdsorbed: {
            name: 'stroke',
            args: {
                attrs: {
                    fill: '#5F95FF',
                    stroke: '#5F95FF',
                },
            },
        },
    },
    resizing: true,
    rotating: true,
    selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
        modifiers: 'shift',
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
};
/**
 * 内置的hook contribution
 * 处理 config上的runtime的注册项
 */
var FlowHooksContribution = /** @class */ (function () {
    function FlowHooksContribution() {
        var _this = this;
        this.toDispose = new xflow_core_1.DisposableCollection();
        this.registerHookHub = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, xflow_core_1.Disposable.create(function () { })];
            });
        }); };
        this.registerHook = function (hooks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toDispose, disposables;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                toDispose = new xflow_core_1.DisposableCollection();
                disposables = [
                    hooks.addNode.registerHook({
                        name: 'flow-add-node',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var cellFactory;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                cellFactory = function (nodeConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var node;
                                    return tslib_1.__generator(this, function (_a) {
                                        node = new node_1.XFlowNode(tslib_1.__assign({}, nodeConfig));
                                        return [2 /*return*/, node];
                                    });
                                }); };
                                args.cellFactory = cellFactory;
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                    hooks.addEdge.registerHook({
                        name: 'flow-add-edge',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var cellFactory;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                cellFactory = function (edgeConfig) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var cell;
                                    return tslib_1.__generator(this, function (_a) {
                                        delete edgeConfig.id;
                                        cell = new x6_1.Shape.Edge({
                                            source: {
                                                cell: edgeConfig.source,
                                                port: edgeConfig.sourcePortId,
                                            },
                                            target: {
                                                cell: edgeConfig.target,
                                                port: edgeConfig.targetPortId,
                                            },
                                            attrs: {
                                                line: {
                                                    stroke: '#A2B1C3',
                                                    strokeWidth: 2,
                                                    targetMarker: {
                                                        name: 'block',
                                                        width: 12,
                                                        height: 8,
                                                    },
                                                },
                                            },
                                            zIndex: -1,
                                            data: tslib_1.__assign({}, edgeConfig),
                                        });
                                        return [2 /*return*/, cell];
                                    });
                                }); };
                                args.cellFactory = cellFactory;
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                    hooks.graphOptions.registerHook({
                        name: 'assign options ',
                        handler: function (args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                Object.assign(args, exports.flowOptions);
                                return [2 /*return*/];
                            });
                        }); },
                    }),
                ];
                toDispose.pushAll(disposables);
                return [2 /*return*/, xflow_core_1.Disposable.create(function () { })];
            });
        }); };
    }
    FlowHooksContribution = tslib_1.__decorate([
        xflow_core_1.ManaSyringe.singleton({ contrib: xflow_core_2.IHookContribution })
    ], FlowHooksContribution);
    return FlowHooksContribution;
}());
exports.FlowHooksContribution = FlowHooksContribution;
//# sourceMappingURL=flow.js.map