"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCmd = exports.QueryGraphStatusCommand = exports.NsGraphStatusCommand = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var constants_1 = require("../constants");
var NsGraphStatusCommand;
(function (NsGraphStatusCommand) {
    var _this = this;
    /** Command: 获取执行状态 */
    NsGraphStatusCommand.MODEL = constants_1.GRAPH_STATUS_INFO;
    /** Command: 用于注册 named factory */
    NsGraphStatusCommand.command = constants_1.XFlowDagCommands.QUERY_GRAPH_STATUS;
    /** hookName */
    NsGraphStatusCommand.hookKey = 'queryGraphStatus';
    /** 状态 类型 */
    var StatusEnum;
    (function (StatusEnum) {
        StatusEnum["SUCCESS"] = "success";
        StatusEnum["PROCESSING"] = "processing";
        StatusEnum["ERROR"] = "error";
        StatusEnum["DEFAULT"] = "default";
        StatusEnum["WARNING"] = "warning";
    })(StatusEnum = NsGraphStatusCommand.StatusEnum || (NsGraphStatusCommand.StatusEnum = {}));
    /** 按status 分类  */
    NsGraphStatusCommand.initStatusMap = function () {
        var _a;
        return (_a = {},
            _a[NsGraphStatusCommand.StatusEnum.DEFAULT] = [],
            _a[NsGraphStatusCommand.StatusEnum.PROCESSING] = [],
            _a[NsGraphStatusCommand.StatusEnum.ERROR] = [],
            _a[NsGraphStatusCommand.StatusEnum.WARNING] = [],
            _a[NsGraphStatusCommand.StatusEnum.SUCCESS] = [],
            _a);
    };
    /** 接口返回 类型 */
    NsGraphStatusCommand.groupByStatus = function (data) {
        var seed = NsGraphStatusCommand.initStatusMap();
        return Object.entries(data).reduce(function (acc, _a) {
            var nodeId = _a[0], value = _a[1];
            acc[value.status].push(nodeId);
            return acc;
        }, seed);
    };
    /** diff status */
    NsGraphStatusCommand.statusDiff = function (cur, next) {
        var items = new Set(tslib_1.__spreadArray(tslib_1.__spreadArray([], cur, true), next, true));
        var diff = { current: [], add: [], remove: [] };
        items.forEach(function (item) {
            if (next.includes(item) && !cur.includes(item)) {
                diff.add.push(item);
            }
            if (!next.includes(item) && cur.includes(item)) {
                diff.remove.push(item);
            }
        });
        return diff;
    };
    NsGraphStatusCommand.shouldStop = function (info) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, [StatusEnum.ERROR, StatusEnum.SUCCESS].includes(info.graphStatus)];
        });
    }); };
})(NsGraphStatusCommand = exports.NsGraphStatusCommand || (exports.NsGraphStatusCommand = {}));
/** 创建节点命令 */
var QueryGraphStatusCommand = /** @class */ (function () {
    function QueryGraphStatusCommand() {
        var _this = this;
        /** 状态缓存 */
        this.statusInfo = NsGraphStatusCommand.initStatusMap();
        /** 获取Model */
        this.getStatusModel = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, modelService, statusModel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = this.contextProvider();
                        modelService = ctx.getModelService();
                        return [4 /*yield*/, constants_1.GRAPH_STATUS_INFO.getModel(modelService)];
                    case 1:
                        statusModel = _a.sent();
                        return [2 /*return*/, statusModel];
                }
            });
        }); };
        /** 更新Model数据 */
        this.updateModelValue = function (callback) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var statusModel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatusModel()];
                    case 1:
                        statusModel = _a.sent();
                        statusModel.setValue(callback);
                        return [2 /*return*/];
                }
            });
        }); };
        /** 停止Looping的flag */
        this.stopCurrentStatusLooping = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var statusModel, subscription;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatusModel()];
                    case 1:
                        statusModel = _a.sent();
                        return [4 /*yield*/, statusModel.getValidValue()];
                    case 2:
                        subscription = (_a.sent()).subscription;
                        subscription.dispose();
                        return [2 /*return*/];
                }
            });
        }); };
        /** 设置停止looping的方法 */
        this.addStopDispose = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var statusModel, subscription;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStatusModel()];
                    case 1:
                        statusModel = _a.sent();
                        return [4 /*yield*/, statusModel.getValidValue()];
                    case 2:
                        subscription = (_a.sent()).subscription;
                        subscription.push({
                            dispose: function () {
                                /** 重制processing的边的状态 */
                                _this.updateEdges(_this.statusInfo, NsGraphStatusCommand.initStatusMap());
                                _this.isLooping = false;
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /** 更新Graph的数据 */
        this.updateGraph = function (curStatusInfo, nextStatusMap, statusMap) {
            /** 更新节点 */
            _this.updateNodes(curStatusInfo, nextStatusMap, statusMap);
            /** 更新边 */
            _this.updateEdges(curStatusInfo, nextStatusMap);
        };
        /** 更新节点数据 */
        this.updateNodeData = function (id, data) {
            var cell = _this.x6Graph.getCellById(id);
            if (!cell) {
                return;
            }
            cell.setData(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, cell.getData()), cell.getSize()), cell.getPosition()), data));
        };
        /** 更新连线数据 */
        this.updateNodes = function (curStatusInfo, nextStatusMap, statusMap) {
            Object.keys(curStatusInfo).forEach(function (status) {
                var nodes = NsGraphStatusCommand.statusDiff(curStatusInfo[status], nextStatusMap[status]);
                nodes.add.forEach(function (id) {
                    _this.updateNodeData(id, statusMap[id]);
                });
                nodes.remove.forEach(function (id) {
                    _this.updateNodeData(id, statusMap[id]);
                });
            });
        };
        /** 更新节点数据 */
        this.updateEdges = function (curStatusInfo, nextStatusMap) {
            var runningNodes = NsGraphStatusCommand.statusDiff(curStatusInfo.processing, nextStatusMap.processing);
            var edges = _this.x6Graph.getEdges();
            edges.forEach(function (edge) {
                var _a;
                var view = (_a = _this.x6Graph) === null || _a === void 0 ? void 0 : _a.findViewByCell(edge.id);
                var target = edge.getTargetCellId();
                if (!target) {
                    return;
                }
                var targetNodeId = target.toString();
                if (!view) {
                    return;
                }
                if (runningNodes.add.includes(targetNodeId)) {
                    /** 新增className */
                    return view.addClass(constants_1.EDGE_PROCESSING_CLASSNAME);
                }
                else if (runningNodes.remove.includes(targetNodeId)) {
                    /** 移除className */
                    return view.removeClass(constants_1.EDGE_PROCESSING_CLASSNAME);
                }
            });
        };
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, _a, args, runtimeHook, hooks, _b, result;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        ctx = this.contextProvider();
                        _a = ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = ctx.getHooks();
                        // 引用
                        _b = this;
                        return [4 /*yield*/, ctx.getX6Graph()];
                    case 1:
                        // 引用
                        _b.x6Graph = _c.sent();
                        return [4 /*yield*/, hooks.queryGraphStatus.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var graphStatusService, _a, shouldStop, doOnce, loopFunction;
                                var _this = this;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            graphStatusService = handlerArgs.graphStatusService, _a = handlerArgs.shouldStop, shouldStop = _a === void 0 ? NsGraphStatusCommand.shouldStop : _a, doOnce = handlerArgs.doOnce;
                                            // 取消已有的循环
                                            return [4 /*yield*/, this.stopCurrentStatusLooping()
                                                // 循环函数
                                            ];
                                        case 1:
                                            // 取消已有的循环
                                            _b.sent();
                                            loopFunction = function (service, loopInterval) {
                                                if (loopInterval === void 0) { loopInterval = 10000; }
                                                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var data, statusGroupMap, isStop;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, service(handlerArgs)
                                                                // 更新全局状态
                                                            ];
                                                            case 1:
                                                                data = _a.sent();
                                                                // 更新全局状态
                                                                this.updateModelValue(function (state) {
                                                                    Object.entries(data.statusMap).forEach(function (_a) {
                                                                        var key = _a[0], value = _a[1];
                                                                        state.statusMap.set(key, value);
                                                                    });
                                                                    state.graphStatus = data.graphStatus;
                                                                });
                                                                statusGroupMap = NsGraphStatusCommand.groupByStatus(data.statusMap);
                                                                this.updateGraph(this.statusInfo, statusGroupMap, data.statusMap);
                                                                // 缓存当前状态作为对比数据
                                                                this.statusInfo = statusGroupMap;
                                                                // 延迟
                                                                return [4 /*yield*/, (0, xflow_core_1.delay)(loopInterval)
                                                                    // 判断是否循环
                                                                ];
                                                            case 2:
                                                                // 延迟
                                                                _a.sent();
                                                                // 判断是否循环
                                                                if (!this.isLooping) {
                                                                    return [2 /*return*/];
                                                                }
                                                                if (!shouldStop) return [3 /*break*/, 4];
                                                                return [4 /*yield*/, shouldStop(data, handlerArgs)];
                                                            case 3:
                                                                isStop = _a.sent();
                                                                if (isStop) {
                                                                    return [2 /*return*/];
                                                                }
                                                                _a.label = 4;
                                                            case 4: 
                                                            // 执行下次调用
                                                            return [4 /*yield*/, loopFunction(service, loopInterval)];
                                                            case 5:
                                                                // 执行下次调用
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            };
                                            // 从参数更新循环的FLAG
                                            this.isLooping = handlerArgs.loop === undefined ? true : handlerArgs.loop;
                                            // 添加可以停止loop的回调
                                            return [4 /*yield*/, this.addStopDispose()
                                                // 执行
                                            ];
                                        case 2:
                                            // 添加可以停止loop的回调
                                            _b.sent();
                                            if (!doOnce) return [3 /*break*/, 4];
                                            return [4 /*yield*/, doOnce(handlerArgs)];
                                        case 3:
                                            _b.sent();
                                            _b.label = 4;
                                        case 4:
                                            loopFunction(graphStatusService, handlerArgs.loopInterval);
                                            return [2 /*return*/, {}];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 2:
                        result = _c.sent();
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
    QueryGraphStatusCommand.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        xflow_core_1.ManaSyringe.inject(xflow_core_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], QueryGraphStatusCommand.prototype, "contextProvider", void 0);
    QueryGraphStatusCommand = tslib_1.__decorate([
        xflow_core_1.ManaSyringe.injectable({
            token: { token: xflow_core_1.ICommandHandler, named: NsGraphStatusCommand.command.id },
        })
    ], QueryGraphStatusCommand);
    return QueryGraphStatusCommand;
}());
exports.QueryGraphStatusCommand = QueryGraphStatusCommand;
var execCmd = function () { };
exports.execCmd = execCmd;
//# sourceMappingURL=command.js.map