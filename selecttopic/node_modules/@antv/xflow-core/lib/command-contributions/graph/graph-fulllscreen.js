"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphFullscreenCommand = exports.NsGraphFullscreen = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
var NsGraphFullscreen;
(function (NsGraphFullscreen) {
    /** Command: 用于注册named factory */
    NsGraphFullscreen.command = constant_1.XFlowGraphCommands.GRAPH_FULLSCREEN;
    /** hookName */
    NsGraphFullscreen.hookKey = 'graphFullscreen';
})(NsGraphFullscreen = exports.NsGraphFullscreen || (exports.NsGraphFullscreen = {}));
var GraphFullscreenCommand = /** @class */ (function () {
    /** 画布Fullscreen命令 */
    function GraphFullscreenCommand() {
        var _this = this;
        /** 执行Cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, config, appContainer, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, this.ctx.getGraphConfig()
                            // @ts-ignore
                        ];
                    case 1:
                        config = _b.sent();
                        appContainer = config.appContainer;
                        if (!appContainer) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, hooks.graphFullscreen.call(
                            /** 执行hooks pipeline处理args */
                            args, 
                            /** 执行 callback */
                            function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var fulllscreen;
                                var _a, _b;
                                return tslib_1.__generator(this, function (_c) {
                                    fulllscreen = false;
                                    if (!document.fullscreenElement) {
                                        (_a = appContainer.requestFullscreen) === null || _a === void 0 ? void 0 : _a.call(appContainer);
                                        fulllscreen = true;
                                    }
                                    else {
                                        (_b = document.exitFullscreen) === null || _b === void 0 ? void 0 : _b.call(document);
                                    }
                                    return [2 /*return*/, { fulllscreen: fulllscreen }];
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
    GraphFullscreenCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    /** isUndoable */
    GraphFullscreenCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphFullscreenCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphFullscreenCommand.prototype, "init", null);
    GraphFullscreenCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphFullscreen.command.id },
        })
        /** 画布Fullscreen命令 */
    ], GraphFullscreenCommand);
    return GraphFullscreenCommand;
}());
exports.GraphFullscreenCommand = GraphFullscreenCommand;
//# sourceMappingURL=graph-fulllscreen.js.map