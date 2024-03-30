"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var module_1 = require("../module");
var interface_1 = require("../interface");
var graph_command_1 = require("../graph-command");
describe('GraphCommandRegistry Test', function () {
    var container = null;
    var commandService = null;
    var commandRegistry = null;
    var commandFactory = null;
    beforeEach(function () {
        container = new mana_syringe_1.Container();
        /** ICommandHandler 工厂 */
        container.register(interface_1.IGraphCommandFactory, {
            useFactory: function (context) {
                return function (commandId) {
                    var child = context.container.createChild();
                    /** 实例化CommandHandler */
                    var commandHandler = child.getNamed(interface_1.ICommandHandler, commandId);
                    return commandHandler;
                };
            },
        });
        container.load(module_1.commandRegistryModule);
        commandService = container.get(interface_1.IGraphCommandService);
        commandRegistry = container.get(graph_command_1.GraphCommandRegistry);
        commandFactory = container.get(interface_1.IGraphCommandFactory);
    });
    it('should register new command', function () {
        // given
        var mockCommnad = {
            id: 'test-id',
            label: 'test-node-command-label',
            category: 'node',
        };
        var MockCommand = /** @class */ (function () {
            function MockCommand() {
                var _this = this;
                this.contextProvider = function () {
                    return {};
                };
                this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, this];
                    });
                }); };
                this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, this];
                    });
                }); };
                this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, this];
                    });
                }); };
                this.isUndoable = function () {
                    return false;
                };
            }
            MockCommand = tslib_1.__decorate([
                (0, mana_syringe_1.injectable)({
                    token: { token: interface_1.ICommandHandler, named: mockCommnad.id },
                })
            ], MockCommand);
            return MockCommand;
        }());
        // when
        container.register(MockCommand);
        commandRegistry.registerCommand(mockCommnad, {
            createCommand: commandFactory,
        });
        // then
        expect(commandRegistry.hasCommand(mockCommnad.id)).toBe(true);
    });
    it('should create command after exxcute command', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mockCommnad, MockCommand, cmdHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCommnad = {
                        id: 'test-id',
                        label: 'test-node-command-label',
                        category: 'node',
                    };
                    MockCommand = /** @class */ (function () {
                        function MockCommand() {
                            var _this = this;
                            this.contextProvider = function () {
                                return {};
                            };
                            this.isUndoable = function () {
                                return false;
                            };
                            this.execute = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    return [2 /*return*/, this];
                                });
                            }); };
                            this.undo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    return [2 /*return*/, this];
                                });
                            }); };
                            this.redo = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    return [2 /*return*/, this];
                                });
                            }); };
                        }
                        MockCommand = tslib_1.__decorate([
                            (0, mana_syringe_1.injectable)({
                                token: { token: interface_1.ICommandHandler, named: mockCommnad.id },
                            })
                        ], MockCommand);
                        return MockCommand;
                    }());
                    container.register(MockCommand);
                    commandRegistry.registerCommand(mockCommnad, {
                        createCommand: commandFactory,
                    });
                    return [4 /*yield*/, commandService.executeCommand(mockCommnad.id, {})
                        // then
                    ];
                case 1:
                    cmdHandler = _a.sent();
                    // then
                    expect(cmdHandler instanceof MockCommand).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=graph-command.spec.js.map