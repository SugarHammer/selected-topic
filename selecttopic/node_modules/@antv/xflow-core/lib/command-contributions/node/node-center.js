"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterNodeCommand = exports.NsCenterNode = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var constant_1 = require("../constant");
var interface_1 = require("../../command/interface");
var NsCenterNode;
(function (NsCenterNode) {
    NsCenterNode.command = constant_1.XFlowNodeCommands.CENTER_NODE;
    NsCenterNode.hookKey = 'centerNode';
})(NsCenterNode = exports.NsCenterNode || (exports.NsCenterNode = {}));
var CenterNodeCommand = /** @class */ (function () {
    /** 节点在画布居中命令 */
    function CenterNodeCommand() {
        var _this = this;
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.centerNode.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, nodeConfig, x6Node;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _a.sent();
                                            nodeConfig = handlerArgs.nodeConfig;
                                            x6Node = x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.getCellById(nodeConfig === null || nodeConfig === void 0 ? void 0 : nodeConfig.id);
                                            x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.centerCell(x6Node);
                                            return [2 /*return*/, { x6Node: x6Node }];
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
    CenterNodeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    CenterNodeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], CenterNodeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CenterNodeCommand.prototype, "init", null);
    CenterNodeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsCenterNode.command.id },
        })
        /** 节点在画布居中命令 */
    ], CenterNodeCommand);
    return CenterNodeCommand;
}());
exports.CenterNodeCommand = CenterNodeCommand;
//# sourceMappingURL=node-center.js.map