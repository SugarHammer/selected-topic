"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNodePort = exports.NsUpdateNodePort = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var constant_1 = require("../constant");
var disposable_1 = require("../../common/disposable");
var interface_1 = require("../../command/interface");
var NsUpdateNodePort;
(function (NsUpdateNodePort) {
    /** Command: 用于注册named factory */
    NsUpdateNodePort.command = constant_1.XFlowNodeCommands.UPDATE_NODE_PORT;
    /** hookName */
    NsUpdateNodePort.hookKey = 'updateNodePort';
})(NsUpdateNodePort = exports.NsUpdateNodePort || (exports.NsUpdateNodePort = {}));
var UpdateNodePort = /** @class */ (function () {
    /** 创建节点命令 */
    function UpdateNodePort() {
        var _this = this;
        this.getCell = function (graph, node) {
            if (typeof node === 'string') {
                return graph.getCellById(node);
            }
            return node;
        };
        this.getNodeConfig = function (x6Node) {
            var data = x6Node.getData();
            var position = x6Node.getPosition();
            var size = x6Node.getSize();
            return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, data), position), size);
        };
        this.updatePortsOfNodeConfig = function (cell, ports, options) {
            var nodeConfig = _this.getNodeConfig(cell);
            if (_this.isNodeAnchors(nodeConfig.ports)) {
                nodeConfig.ports = tslib_1.__spreadArray([], ports, true);
            }
            if (_this.isPortMetaData(nodeConfig.ports)) {
                nodeConfig.ports.items = tslib_1.__spreadArray([], ports, true);
            }
            cell.setData(nodeConfig, options);
        };
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ctx, _a, args, runtimeHook, hooks, graph, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ctx = this.contextProvider();
                        _a = ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = ctx.getHooks();
                        return [4 /*yield*/, ctx.getX6Graph()];
                    case 1:
                        graph = _b.sent();
                        return [4 /*yield*/, hooks.updateNodePort.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var node, updatePorts, options, commandService, cell, currentPorts, nextPorts;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            node = handlerArgs.node, updatePorts = handlerArgs.updatePorts, options = handlerArgs.options, commandService = handlerArgs.commandService;
                                            cell = this.getCell(graph, node);
                                            if (!cell || cell.isEdge()) {
                                                console.error('node_is _not_exsit', node);
                                                return [2 /*return*/, { err: 'node_is _not_exsit' }];
                                            }
                                            currentPorts = cell.getPorts();
                                            return [4 /*yield*/, updatePorts(tslib_1.__spreadArray([], currentPorts, true), cell, graph)];
                                        case 1:
                                            nextPorts = _a.sent();
                                            if (nextPorts === false) {
                                                return [2 /*return*/, { err: 'service rejected' }];
                                            }
                                            cell.setPropByPath('ports/items', nextPorts, tslib_1.__assign({ rewrite: true }, options));
                                            /** update nodeConfig */
                                            this.updatePortsOfNodeConfig(cell, nextPorts, options);
                                            /** add undo */
                                            ctx.addUndo(disposable_1.Disposable.create(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return tslib_1.__generator(this, function (_a) {
                                                    commandService.executeCommand(constant_1.XFlowNodeCommands.UPDATE_NODE_PORT.id, { node: node, updatePorts: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                                                            return [2 /*return*/, currentPorts];
                                                        }); }); } });
                                                    return [2 /*return*/];
                                                });
                                            }); }));
                                            return [2 /*return*/, { ports: nextPorts }];
                                    }
                                });
                            }); }, runtimeHook)];
                    case 2:
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
    UpdateNodePort.prototype.isNodeAnchors = function (ports) {
        return Array.isArray(ports);
    };
    UpdateNodePort.prototype.isPortMetaData = function (ports) {
        return ports.items && Array.isArray(ports.items);
    };
    UpdateNodePort.prototype.isUndoable = function () {
        var ctx = this.contextProvider();
        return ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], UpdateNodePort.prototype, "contextProvider", void 0);
    UpdateNodePort = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsUpdateNodePort.command.id },
        })
        /** 创建节点命令 */
    ], UpdateNodePort);
    return UpdateNodePort;
}());
exports.UpdateNodePort = UpdateNodePort;
//# sourceMappingURL=node-update-port.js.map