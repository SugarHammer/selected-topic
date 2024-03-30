"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphResizeCommand = exports.NsGraphResize = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsGraphResize;
(function (NsGraphResize) {
    /** Command: 用于注册named factory */
    NsGraphResize.command = constant_1.XFlowGraphCommands.GRAPH_RESIZE;
    /** hookName */
    NsGraphResize.hookKey = 'graphResize';
})(NsGraphResize = exports.NsGraphResize || (exports.NsGraphResize = {}));
var GraphResizeCommand = /** @class */ (function () {
    /** 画布resize命令 */
    function GraphResizeCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, config, clientHeight, clientWidth, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, this.ctx.getGraphConfig()];
                    case 1:
                        config = _b.sent();
                        clientHeight = config.rootContainer.clientHeight;
                        clientWidth = config.rootContainer.clientWidth;
                        return [4 /*yield*/, hooks.graphResize.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, _a, width, _b, height;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _c.sent();
                                            _a = handlerArgs.width, width = _a === void 0 ? clientWidth : _a, _b = handlerArgs.height, height = _b === void 0 ? clientHeight : _b;
                                            x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.resize(width, height);
                                            return [2 /*return*/, {}];
                                    }
                                });
                            }); }, 
                            /** execute command 时创建的hook */
                            runtimeHook)
                            /** 设置结果 */
                        ];
                    case 2:
                        result = _b.sent();
                        /** 设置结果 */
                        this.ctx.setResult(result);
                        return [2 /*return*/, this];
                }
            });
        }); };
        /** undo cmd */
        this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.ctx.undo();
                return [2 /*return*/, this];
            });
        }); };
        /** redo cmd */
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
    GraphResizeCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphResizeCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphResizeCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphResizeCommand.prototype, "init", null);
    GraphResizeCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphResize.command.id },
        })
        /** 画布resize命令 */
    ], GraphResizeCommand);
    return GraphResizeCommand;
}());
exports.GraphResizeCommand = GraphResizeCommand;
//# sourceMappingURL=graph-resize.js.map