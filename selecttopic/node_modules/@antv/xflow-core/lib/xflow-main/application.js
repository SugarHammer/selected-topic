"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendApplication = exports.IFrontendApplicationContribution = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-classes-per-file */
var mana_syringe_1 = require("mana-syringe");
var x6_1 = require("@antv/x6");
var graph_provider_1 = require("../xflow-main/graph/graph-provider");
var interface_1 = require("../command/interface");
var model_service_1 = require("../model-service");
var interface_2 = require("./interface");
var graph_utils_1 = require("../common/graph-utils");
var interface_3 = require("./interface");
Object.defineProperty(exports, "IFrontendApplicationContribution", { enumerable: true, get: function () { return interface_3.IFrontendApplicationContribution; } });
var TIMER_WARNING_THRESHOLD = 100;
var FrontendApplication = /** @class */ (function () {
    function FrontendApplication() {
        var _this = this;
        /** 获取画布实例 */
        this.getGraphInstance = function () {
            return _this.graphProvider.getGraphInstance();
        };
        /** 获取画布配置项 */
        this.getGraphConfig = function () {
            return _this.graphProvider.getGraphOptions();
        };
        /** 获取画布配置项 */
        this.getGraphData = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph, cells;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        cells = graph.getCells();
                        return [2 /*return*/, (0, graph_utils_1.cellsToJson)(cells)];
                }
            });
        }); };
        /** 获取画布所有节点 */
        this.getAllNodes = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        return [2 /*return*/, graph.getNodes()];
                }
            });
        }); };
        /** 获取画布节点 */
        this.getNodeById = function (nodeId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        return [2 /*return*/, graph.getCellById(nodeId)];
                }
            });
        }); };
        /** 获取画布所有连线 */
        this.getAllEdges = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        return [2 /*return*/, graph.getEdges()];
                }
            });
        }); };
        /** 获取画布连线 */
        this.getEdgeById = function (edgeId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        return [2 /*return*/, graph.getCellById(edgeId)];
                }
            });
        }); };
        /** 更新节点样式 */
        this.updateNodeAttrs = function (node, attrs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var x6Node;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(node instanceof x6_1.Node)) return [3 /*break*/, 1];
                        node.setAttrs(attrs);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getNodeById(node)];
                    case 2:
                        x6Node = _a.sent();
                        x6Node.setAttrs(attrs);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /** 更新连线样式 */
        this.updateEdgeAttrs = function (edge, attrs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var x6Edge;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(edge instanceof x6_1.Edge)) return [3 /*break*/, 1];
                        edge.setAttrs(attrs);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getEdgeById(edge)];
                    case 2:
                        x6Edge = _a.sent();
                        x6Edge.setAttrs(attrs);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /** 平移画布 */
        this.translateGraph = function (tx, ty) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var graph, currentTranslate;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphProvider.getGraphInstance()];
                    case 1:
                        graph = _a.sent();
                        currentTranslate = graph.translate();
                        graph.translate(currentTranslate.tx + tx, currentTranslate.ty + ty);
                        return [2 /*return*/];
                }
            });
        }); };
    }
    /** 启动app */
    FrontendApplication.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.startContributions()];
                    case 1:
                        _a.sent();
                        this.registerEventListeners();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 暴露命令的执行接口 */
    FrontendApplication.prototype.executeCommand = function (commandId, cmdArgs, hook) {
        if (hook === void 0) { hook = []; }
        return this.commandService.executeCommand(commandId, cmdArgs, hook);
    };
    /** 暴露命令的批量执行接口 */
    FrontendApplication.prototype.executeCommandPipeline = function (cmdOptions) {
        return this.commandService.executeCommandPipeline(cmdOptions);
    };
    /**
     * Register global event listeners.
     */
    FrontendApplication.prototype.registerEventListeners = function () {
        var _this = this;
        /** 触发app的卸载逻辑 */
        window.addEventListener('unload', function () {
            _this.stopContributions();
        });
    };
    /**
     * Initialize and start the frontend application contributions.
     */
    FrontendApplication.prototype.startContributions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, contribution;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(this.contributions.getContributions());
                        _loop_1 = function (contribution) {
                            var error_1;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!contribution.onStart) return [3 /*break*/, 4];
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this_1.measure("".concat(contribution.constructor.name, ".onStart"), function () {
                                                return contribution.onStart(_this);
                                            })];
                                    case 2:
                                        _c.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        error_1 = _c.sent();
                                        console.error('Could not start contribution', error_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.contributions.getContributions();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        contribution = _a[_i];
                        return [5 /*yield**/, _loop_1(contribution)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stop the frontend application contributions. This is called when the window is unloaded.
     */
    FrontendApplication.prototype.stopContributions = function () {
        console.info('>>> Stopping frontend contributions...');
        for (var _i = 0, _a = this.contributions.getContributions(); _i < _a.length; _i++) {
            var contribution = _a[_i];
            if (contribution.onStop) {
                try {
                    contribution.onStop(this);
                }
                catch (error) {
                    console.error('Could not stop contribution', error);
                }
            }
        }
        console.info('<<< All frontend contributions have been stopped.');
    };
    FrontendApplication.prototype.measure = function (name, fn) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var startMark, endMark, result, _i, _a, item, contribution;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startMark = "".concat(name, "-start");
                        endMark = "".concat(name, "-end");
                        performance.mark(startMark);
                        return [4 /*yield*/, fn()];
                    case 1:
                        result = _b.sent();
                        performance.mark(endMark);
                        performance.measure(name, startMark, endMark);
                        for (_i = 0, _a = performance.getEntriesByName(name); _i < _a.length; _i++) {
                            item = _a[_i];
                            contribution = "Frontend ".concat(item.name);
                            if (item.duration > TIMER_WARNING_THRESHOLD) {
                                console.warn("".concat(contribution, " is slow, took: ").concat(item.duration.toFixed(1), " ms"));
                            }
                            else {
                                console.debug("".concat(contribution, " took: ").concat(item.duration.toFixed(1), " ms"));
                            }
                        }
                        performance.clearMeasures(name);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.contrib)(interface_2.IFrontendApplicationContribution),
        tslib_1.__metadata("design:type", Object)
    ], FrontendApplication.prototype, "contributions", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(graph_provider_1.IGraphProvider),
        tslib_1.__metadata("design:type", Object)
    ], FrontendApplication.prototype, "graphProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.IGraphCommandService),
        tslib_1.__metadata("design:type", Object)
    ], FrontendApplication.prototype, "commandService", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(model_service_1.IModelService),
        tslib_1.__metadata("design:type", Object)
    ], FrontendApplication.prototype, "modelService", void 0);
    FrontendApplication = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)()
    ], FrontendApplication);
    return FrontendApplication;
}());
exports.FrontendApplication = FrontendApplication;
//# sourceMappingURL=application.js.map