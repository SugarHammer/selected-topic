"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphLayoutCommand = exports.NsGraphLayout = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var AntvLayout = tslib_1.__importStar(require("@antv/layout"));
var interface_1 = require("../../command/interface");
var constant_1 = require("../constant");
/** 画布图数据执行布局算法命令 */
var NsGraphLayout;
(function (NsGraphLayout) {
    /** Command: 用于注册named factory */
    NsGraphLayout.command = constant_1.XFlowGraphCommands.GRAPH_LAYOUT;
    /** hookName */
    NsGraphLayout.hookKey = 'graphLayout';
})(NsGraphLayout = exports.NsGraphLayout || (exports.NsGraphLayout = {}));
var GraphLayoutCommand = /** @class */ (function () {
    /** 画布布局命令 */
    function GraphLayoutCommand() {
        var _this = this;
        /** 执行cmd */
        this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, args, runtimeHook, hooks, result;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ctx.getArgs(), args = _a.args, runtimeHook = _a.hooks;
                        hooks = this.ctx.getHooks();
                        return [4 /*yield*/, hooks.graphLayout.call(args, function (handlerArgs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var layoutType, layoutOptions, customLayout, innerLayout, layoutFunc;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            layoutType = handlerArgs.layoutType, layoutOptions = handlerArgs.layoutOptions, customLayout = handlerArgs.customLayout;
                                            innerLayout = function (graphData) {
                                                var clz = AntvLayout.Layouts[layoutType];
                                                var antVLayout = new clz(tslib_1.__assign({}, layoutOptions));
                                                return antVLayout.layout(graphData);
                                            };
                                            layoutFunc = customLayout || innerLayout;
                                            return [4 /*yield*/, layoutFunc(handlerArgs.graphData)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, { graphData: handlerArgs.graphData }];
                                    }
                                });
                            }); }, runtimeHook)
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
    GraphLayoutCommand.prototype.init = function () {
        this.ctx = this.contextProvider();
    };
    GraphLayoutCommand.prototype.isUndoable = function () {
        return this.ctx.isUndoable();
    };
    tslib_1.__decorate([
        (0, mana_syringe_1.inject)(interface_1.ICommandContextProvider),
        tslib_1.__metadata("design:type", Object)
    ], GraphLayoutCommand.prototype, "contextProvider", void 0);
    tslib_1.__decorate([
        (0, mana_syringe_1.postConstruct)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], GraphLayoutCommand.prototype, "init", null);
    GraphLayoutCommand = tslib_1.__decorate([
        (0, mana_syringe_1.injectable)({
            token: { token: interface_1.ICommandHandler, named: NsGraphLayout.command.id },
        })
        /** 画布布局命令 */
    ], GraphLayoutCommand);
    return GraphLayoutCommand;
}());
exports.GraphLayoutCommand = GraphLayoutCommand;
//# sourceMappingURL=graph-layout.js.map