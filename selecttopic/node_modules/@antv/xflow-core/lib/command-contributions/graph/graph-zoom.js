"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphZoomCommand = exports.NsGraphZoom = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsGraphZoom;
(function (NsGraphZoom) {
    /** Command: 用于注册named factory */
    NsGraphZoom.command = constant_1.XFlowGraphCommands.GRAPH_ZOOM;
    /** zoom options */
    NsGraphZoom.MAX_SCALE = 1.5;
    NsGraphZoom.MIN_SCALE = 0.05;
    /** default zoom options */
    NsGraphZoom.defaultZoomOptions = {
        maxScale: NsGraphZoom.MAX_SCALE,
        minScale: NsGraphZoom.MIN_SCALE,
    };
    /** hookName */
    NsGraphZoom.hookKey = 'graphZoom';
})(NsGraphZoom = exports.NsGraphZoom || (exports.NsGraphZoom = {}));
var GraphZoomCommand = /** @class */ (function () {
    /** 画布缩放命令 */
    function GraphZoomCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.graphZoom.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var x6Graph, factor, _a, zoomFitPadding, _b, zoomOptions;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this.ctx.getX6Graph()];
                                        case 1:
                                            x6Graph = _c.sent();
                                            factor = handlerArgs.factor, _a = handlerArgs.zoomFitPadding, zoomFitPadding = _a === void 0 ? 12 : _a, _b = handlerArgs.zoomOptions, zoomOptions = _b === void 0 ? NsGraphZoom.defaultZoomOptions : _b;
                                            if (typeof factor === 'number') {
                                                x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.zoom(factor, zoomOptions || {});
                                            }
                                            else if (factor === 'fit') {
                                                x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.zoomToFit(tslib_1.__assign(tslib_1.__assign({}, zoomOptions), { padding: zoomFitPadding }));
                                            }
                                            else if (factor === 'real') {
                                                x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.scale(1);
                                                x6Graph === null || x6Graph === void 0 ? void 0 : x6Graph.centerContent();
                                            }
                                            return [2 /*return*/, { factor: factor, zoomFitPadding: zoomFitPadding, zoomOptions: zoomOptions }];
                                    }
                                });
                            }); }, 
                            /** execute command 时创建的hook */
                            runtimeHook)
                            /** 设置结果 */
                        ];
                    case 1:
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
    GraphZoomCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphZoomCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphZoomCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphZoomCommand.prototype, "init", null);
    GraphZoomCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphZoom.command.id },
        })
        /** 画布缩放命令 */
    ], GraphZoomCommand);
    return GraphZoomCommand;
}());
exports.GraphZoomCommand = GraphZoomCommand;
//# sourceMappingURL=graph-zoom.js.map