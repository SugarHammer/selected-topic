"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCommandRegistry = exports.NCommand = void 0;
var tslib_1 = require("tslib");
var mana_syringe_1 = require("mana-syringe");
var rx_model_1 = require("../common/rx-model");
var disposable_1 = require("../common/disposable");
var interface_1 = require("../xflow-main/interface");
var interface_2 = require("./interface");
require("reflect-metadata");
var NCommand;
(function (NCommand) {
    /* Determine whether object is a Command */
    function is(arg) {
        return !!arg && arg === Object(arg) && 'id' in arg;
    }
    NCommand.is = is;
    /** Comparator function for when sorting commands */
    function compareCommands(a, b) {
        if (a.label && b.label) {
            var aCommand = (a.category ? "".concat(a.category, ": ").concat(a.label) : a.label).toLowerCase();
            var bCommand = (b.category ? "".concat(b.category, ": ").concat(b.label) : b.label).toLowerCase();
            return aCommand.localeCompare(bCommand);
        }
        else {
            return 0;
        }
    }
    NCommand.compareCommands = compareCommands;
    /**
     * Determine if two commands are equal.
     *
     * @param a the first command for comparison.
     * @param b the second command for comparison.
     */
    function equals(a, b) {
        return (a.id === b.id && a.label === b.label && a.iconName === b.iconName && a.category === b.category);
    }
    NCommand.equals = equals;
})(NCommand = exports.NCommand || (exports.NCommand = {}));
var GraphCommandRegistry = /** @class */ (function () {
    function GraphCommandRegistry(contributionProvider) {
        var _this = this;
        this.contributionProvider = contributionProvider;
        /**
         * undo cmd后将命令存储在队列中给redo调用
         */
        this.redoStack = [];
        /**
         * executeCommand后将命令存储在队列中给undo调用
         */
        this.undoStack = [];
        /**
         * 储存所有注册的command
         */
        this.commands = new Map();
        /**
         * 储存所有注册的command factory
         */
        this.factories = new Map();
        /**
         * 储存所有注册的command handler disposables
         */
        this.disposables = new Map();
        /**
         * 监听cmdregistry的变化
         */
        this.cmdChangeEvent = new rx_model_1.RxModel(null);
        /**
         * 在Command实例间共享变量
         */
        this.Globals = new rx_model_1.RxModel(new Map());
        /** 设置command间的共享变量 */
        this.setGlobal = function (key, value) {
            _this.Globals.setValue(function (map) {
                map.set(key, value);
            });
        };
        /** 获取共享变量 */
        this.getGlobal = function (key) {
            var map = _this.Globals.getValue();
            return map.get(key);
        };
        /**
         * 执行undo stack中最后一条Command
         */
        this.undoCommand = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cmd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.undoStack.pop();
                        if (!cmd) {
                            console.error('empty undo stack');
                            return [2 /*return*/];
                        }
                        /* 执行命令的undo方法 */
                        return [4 /*yield*/, cmd.undo()
                            /* 执行后塞到redo的栈中 */
                        ];
                    case 1:
                        /* 执行命令的undo方法 */
                        _a.sent();
                        /* 执行后塞到redo的栈中 */
                        this.redoStack.push(cmd);
                        /* 触发事件回调 */
                        this.cmdChangeEvent.setValue(null);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * 执行redo stack中最后一条Command
         */
        this.redoCommand = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var cmd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.redoStack.pop();
                        if (!cmd) {
                            console.error('empty undo stack');
                            return [2 /*return*/];
                        }
                        /* 执行命令的undo */
                        return [4 /*yield*/, cmd.redo()
                            /* 执行后塞到undo的栈中 */
                        ];
                    case 1:
                        /* 执行命令的undo */
                        _a.sent();
                        /* 执行后塞到undo的栈中 */
                        this.undoStack.push(cmd);
                        /* 触发事件回调 */
                        this.cmdChangeEvent.setValue(null);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * 注册一批可单独dispose的Command
         * @param externalRegisterFn ICommandRegisterFunction
         */
        this.registerDisposableCommand = function (externalRegisterFn) {
            var toDispose = new disposable_1.DisposableCollection();
            var disposableRegistry = {
                registerCommand: function (command, factory) {
                    var disposable = _this.registerCommand(command, factory);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            return toDispose;
        };
    }
    Object.defineProperty(GraphCommandRegistry.prototype, "watchChange", {
        /**
         * 监听cmdregistry的变化
         */
        get: function () {
            return this.cmdChangeEvent.watch;
        },
        enumerable: false,
        configurable: true
    });
    GraphCommandRegistry.prototype.onStart = function () {
        var contributions = this.contributionProvider.getContributions();
        for (var _i = 0, contributions_1 = contributions; _i < contributions_1.length; _i++) {
            var contribItem = contributions_1[_i];
            contribItem.registerGraphCommands(this);
        }
    };
    GraphCommandRegistry.prototype.executeCommandPipeline = function (cmdOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, _i, cmdOptions_1, cmdOption, cmdCtx, _a, args, hooks;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        res = null;
                        _i = 0, cmdOptions_1 = cmdOptions;
                        _b.label = 1;
                    case 1:
                        if (!(_i < cmdOptions_1.length)) return [3 /*break*/, 5];
                        cmdOption = cmdOptions_1[_i];
                        cmdCtx = res === null || res === void 0 ? void 0 : res.contextProvider();
                        return [4 /*yield*/, (cmdOption === null || cmdOption === void 0 ? void 0 : cmdOption.getCommandOption(cmdCtx))];
                    case 2:
                        _a = _b.sent(), args = _a.args, hooks = _a.hooks;
                        return [4 /*yield*/, this.executeCommand(cmdOption === null || cmdOption === void 0 ? void 0 : cmdOption.commandId, args, hooks)];
                    case 3:
                        res = _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        /* 触发事件回调 */
                        this.cmdChangeEvent.setValue(null);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /** 执行 Command：会在undo stack中push cmd */
    GraphCommandRegistry.prototype.executeCommand = function (commandId, cmdArgs, hook) {
        if (hook === void 0) { hook = []; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var factory, cmd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        factory = this.getFactory(commandId);
                        if (!factory) return [3 /*break*/, 3];
                        return [4 /*yield*/, factory.createCommand(commandId, cmdArgs, hook)];
                    case 1:
                        cmd = (_a.sent());
                        return [4 /*yield*/, cmd.execute()];
                    case 2:
                        _a.sent();
                        if (cmd.isUndoable()) {
                            this.undoStack.push(cmd);
                        }
                        /* 触发事件回调 */
                        this.cmdChangeEvent.setValue(null);
                        return [2 /*return*/, cmd];
                    case 3: throw Object.assign(new Error("The command '".concat(commandId, "' cannot be executed. There are no active handlers available for the command.")), { code: 'NO_ACTIVE_HANDLER' });
                }
            });
        });
    };
    /** 执行 unod Command：不会在undo stack中push新的command记录 */
    GraphCommandRegistry.prototype.executeUndoCommand = function (commandId, cmdArgs, hook) {
        if (hook === void 0) { hook = []; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var factory, cmd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        factory = this.getFactory(commandId);
                        if (!factory) return [3 /*break*/, 3];
                        return [4 /*yield*/, factory.createCommand(commandId, cmdArgs, hook)];
                    case 1:
                        cmd = _a.sent();
                        return [4 /*yield*/, cmd.execute()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, cmd];
                    case 3: throw Object.assign(new Error("The command '".concat(commandId, "' cannot be executed. There are no active handlers available for the command.")), { code: 'NO_ACTIVE_HANDLER' });
                }
            });
        });
    };
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    GraphCommandRegistry.prototype.createCommand = function (commandId, cmdArgs, hook) {
        if (hook === void 0) { hook = []; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var factory, cmd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        factory = this.getFactory(commandId);
                        if (!factory) return [3 /*break*/, 2];
                        return [4 /*yield*/, factory.createCommand(commandId, cmdArgs, hook)];
                    case 1:
                        cmd = _a.sent();
                        return [2 /*return*/, cmd];
                    case 2: throw Object.assign(new Error("The command '".concat(commandId, "' cannot be executed. There are no active handlers available for the command.")), { code: 'NO_ACTIVE_HANDLER' });
                }
            });
        });
    };
    Object.defineProperty(GraphCommandRegistry.prototype, "isUndoable", {
        /**
         * 检查是否注册了Command
         */
        get: function () {
            return this.undoStack.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphCommandRegistry.prototype, "isRedoable", {
        /**
         * 检查是否注册了Command
         */
        get: function () {
            return this.redoStack.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 检查是否注册了Command
     */
    GraphCommandRegistry.prototype.hasCommand = function (commandId) {
        return this.commands.has(commandId);
    };
    /**
     * Get a command for the given command identifier.
     */
    GraphCommandRegistry.prototype.getCommand = function (id) {
        return this.commands.get(id);
    };
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    GraphCommandRegistry.prototype.registerCommand = function (command, factory) {
        var _this = this;
        if (this.factories.has(command.id)) {
            console.warn("A command ".concat(command.id, " is already registered."));
            return disposable_1.Disposable.NULL;
        }
        var toDispose = new disposable_1.DisposableCollection(this.doRegisterCommand(command), this.registerFactory(command.id, factory), disposable_1.Disposable.create(function () { return _this.disposables.delete(command.id); }));
        this.disposables.set(command.id, toDispose);
        return toDispose;
    };
    GraphCommandRegistry.prototype.doRegisterCommand = function (command) {
        var _this = this;
        this.commands.set(command.id, command);
        return disposable_1.Disposable.create(function () { return _this.disposables.delete(command.id); });
    };
    /**
     * Unregister command from the registry
     *
     * @param id
     */
    GraphCommandRegistry.prototype.unregisterCommand = function (commandOrId) {
        var id = NCommand.is(commandOrId) ? commandOrId.id : commandOrId;
        var disposableCmd = this.disposables.get(id);
        if (disposableCmd) {
            disposableCmd.dispose();
        }
    };
    /**
     * 检查commandId是否有Factory
     */
    GraphCommandRegistry.prototype.hasFactory = function (commandId) {
        var factory = this.factories.get(commandId);
        return !!factory;
    };
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    GraphCommandRegistry.prototype.getFactory = function (commandId) {
        var factory = this.factories.get(commandId);
        return factory;
    };
    /**
     * Register the given handler for the given command identifier.
     *
     * If there is already a handler for the given command
     * then the given handler is registered as more specific, and
     * has higher priority during enablement, visibility and toggle state evaluations.
     */
    GraphCommandRegistry.prototype.registerFactory = function (commandId, factory, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (this.hasFactory(commandId) && force === false) {
            console.error('cannot register command:', commandId);
        }
        this.factories.set(commandId, factory);
        return disposable_1.Disposable.create(function () {
            _this.factories.delete(commandId);
        });
    };
    /**
     * Returns with all handlers for the given command. If the command does not have any handlers,
     * or the command is not registered, returns an empty array.
     */
    GraphCommandRegistry.prototype.getAllFactories = function () {
        return Array.from(this.factories.entries());
    };
    GraphCommandRegistry = tslib_1.__decorate([
        (0, mana_syringe_1.singleton)({
            contrib: [interface_1.IFrontendApplicationContribution, interface_2.IGraphCommandService],
        }),
        tslib_1.__param(0, (0, mana_syringe_1.contrib)(interface_2.IGraphCommandContribution)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], GraphCommandRegistry);
    return GraphCommandRegistry;
}());
exports.GraphCommandRegistry = GraphCommandRegistry;
//# sourceMappingURL=graph-command.js.map