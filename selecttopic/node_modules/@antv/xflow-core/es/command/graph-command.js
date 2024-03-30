import { __awaiter, __decorate, __metadata, __param } from "tslib";
import { contrib, Contribution, singleton } from 'mana-syringe';
import { RxModel } from '../common/rx-model';
import { Disposable, DisposableCollection } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { IGraphCommandService, IGraphCommandContribution } from './interface';
import 'reflect-metadata';
export var NCommand;
(function (NCommand) {
    /* Determine whether object is a Command */
    function is(arg) {
        return !!arg && arg === Object(arg) && 'id' in arg;
    }
    NCommand.is = is;
    /** Comparator function for when sorting commands */
    function compareCommands(a, b) {
        if (a.label && b.label) {
            const aCommand = (a.category ? `${a.category}: ${a.label}` : a.label).toLowerCase();
            const bCommand = (b.category ? `${b.category}: ${b.label}` : b.label).toLowerCase();
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
})(NCommand || (NCommand = {}));
let GraphCommandRegistry = class GraphCommandRegistry {
    constructor(contributionProvider) {
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
        this.cmdChangeEvent = new RxModel(null);
        /**
         * 在Command实例间共享变量
         */
        this.Globals = new RxModel(new Map());
        /** 设置command间的共享变量 */
        this.setGlobal = (key, value) => {
            this.Globals.setValue(map => {
                map.set(key, value);
            });
        };
        /** 获取共享变量 */
        this.getGlobal = (key) => {
            const map = this.Globals.getValue();
            return map.get(key);
        };
        /**
         * 执行undo stack中最后一条Command
         */
        this.undoCommand = () => __awaiter(this, void 0, void 0, function* () {
            /* 获取可以undo的Command */
            const cmd = this.undoStack.pop();
            if (!cmd) {
                console.error('empty undo stack');
                return;
            }
            /* 执行命令的undo方法 */
            yield cmd.undo();
            /* 执行后塞到redo的栈中 */
            this.redoStack.push(cmd);
            /* 触发事件回调 */
            this.cmdChangeEvent.setValue(null);
        });
        /**
         * 执行redo stack中最后一条Command
         */
        this.redoCommand = () => __awaiter(this, void 0, void 0, function* () {
            /* 获取可以redo的Command */
            const cmd = this.redoStack.pop();
            if (!cmd) {
                console.error('empty undo stack');
                return;
            }
            /* 执行命令的undo */
            yield cmd.redo();
            /* 执行后塞到undo的栈中 */
            this.undoStack.push(cmd);
            /* 触发事件回调 */
            this.cmdChangeEvent.setValue(null);
        });
        /**
         * 注册一批可单独dispose的Command
         * @param externalRegisterFn ICommandRegisterFunction
         */
        this.registerDisposableCommand = (externalRegisterFn) => {
            const toDispose = new DisposableCollection();
            const disposableRegistry = {
                registerCommand: (command, factory) => {
                    const disposable = this.registerCommand(command, factory);
                    toDispose.push(disposable);
                    return disposable;
                },
            };
            externalRegisterFn(disposableRegistry);
            return toDispose;
        };
    }
    /**
     * 监听cmdregistry的变化
     */
    get watchChange() {
        return this.cmdChangeEvent.watch;
    }
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribItem of contributions) {
            contribItem.registerGraphCommands(this);
        }
    }
    executeCommandPipeline(cmdOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = null;
            for (const cmdOption of cmdOptions) {
                const cmdCtx = res === null || res === void 0 ? void 0 : res.contextProvider();
                const { args, hooks } = yield (cmdOption === null || cmdOption === void 0 ? void 0 : cmdOption.getCommandOption(cmdCtx));
                res = yield this.executeCommand(cmdOption === null || cmdOption === void 0 ? void 0 : cmdOption.commandId, args, hooks);
            }
            /* 触发事件回调 */
            this.cmdChangeEvent.setValue(null);
            return res;
        });
    }
    /** 执行 Command：会在undo stack中push cmd */
    executeCommand(commandId, cmdArgs, hook = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.getFactory(commandId);
            if (factory) {
                const cmd = (yield factory.createCommand(commandId, cmdArgs, hook));
                yield cmd.execute();
                if (cmd.isUndoable()) {
                    this.undoStack.push(cmd);
                }
                /* 触发事件回调 */
                this.cmdChangeEvent.setValue(null);
                return cmd;
            }
            throw Object.assign(new Error(`The command '${commandId}' cannot be executed. There are no active handlers available for the command.`), { code: 'NO_ACTIVE_HANDLER' });
        });
    }
    /** 执行 unod Command：不会在undo stack中push新的command记录 */
    executeUndoCommand(commandId, cmdArgs, hook = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.getFactory(commandId);
            if (factory) {
                const cmd = yield factory.createCommand(commandId, cmdArgs, hook);
                yield cmd.execute();
                return cmd;
            }
            throw Object.assign(new Error(`The command '${commandId}' cannot be executed. There are no active handlers available for the command.`), { code: 'NO_ACTIVE_HANDLER' });
        });
    }
    /**
     * Execute the active handler for the given command and arguments.
     *
     * Reject if a command cannot be executed.
     */
    createCommand(commandId, cmdArgs, hook = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = this.getFactory(commandId);
            if (factory) {
                const cmd = yield factory.createCommand(commandId, cmdArgs, hook);
                return cmd;
            }
            throw Object.assign(new Error(`The command '${commandId}' cannot be executed. There are no active handlers available for the command.`), { code: 'NO_ACTIVE_HANDLER' });
        });
    }
    /**
     * 检查是否注册了Command
     */
    get isUndoable() {
        return this.undoStack.length > 0;
    }
    /**
     * 检查是否注册了Command
     */
    get isRedoable() {
        return this.redoStack.length > 0;
    }
    /**
     * 检查是否注册了Command
     */
    hasCommand(commandId) {
        return this.commands.has(commandId);
    }
    /**
     * Get a command for the given command identifier.
     */
    getCommand(id) {
        return this.commands.get(id);
    }
    /**
     * Register the given command and handler if present.
     *
     * Throw if a command is already registered for the given command identifier.
     */
    registerCommand(command, factory) {
        if (this.factories.has(command.id)) {
            console.warn(`A command ${command.id} is already registered.`);
            return Disposable.NULL;
        }
        const toDispose = new DisposableCollection(this.doRegisterCommand(command), this.registerFactory(command.id, factory), Disposable.create(() => this.disposables.delete(command.id)));
        this.disposables.set(command.id, toDispose);
        return toDispose;
    }
    doRegisterCommand(command) {
        this.commands.set(command.id, command);
        return Disposable.create(() => this.disposables.delete(command.id));
    }
    /**
     * Unregister command from the registry
     *
     * @param id
     */
    unregisterCommand(commandOrId) {
        const id = NCommand.is(commandOrId) ? commandOrId.id : commandOrId;
        const disposableCmd = this.disposables.get(id);
        if (disposableCmd) {
            disposableCmd.dispose();
        }
    }
    /**
     * 检查commandId是否有Factory
     */
    hasFactory(commandId) {
        const factory = this.factories.get(commandId);
        return !!factory;
    }
    /**
     * Get a visible handler for the given command or `undefined`.
     */
    getFactory(commandId) {
        const factory = this.factories.get(commandId);
        return factory;
    }
    /**
     * Register the given handler for the given command identifier.
     *
     * If there is already a handler for the given command
     * then the given handler is registered as more specific, and
     * has higher priority during enablement, visibility and toggle state evaluations.
     */
    registerFactory(commandId, factory, force = false) {
        if (this.hasFactory(commandId) && force === false) {
            console.error('cannot register command:', commandId);
        }
        this.factories.set(commandId, factory);
        return Disposable.create(() => {
            this.factories.delete(commandId);
        });
    }
    /**
     * Returns with all handlers for the given command. If the command does not have any handlers,
     * or the command is not registered, returns an empty array.
     */
    getAllFactories() {
        return Array.from(this.factories.entries());
    }
};
GraphCommandRegistry = __decorate([
    singleton({
        contrib: [IFrontendApplicationContribution, IGraphCommandService],
    }),
    __param(0, contrib(IGraphCommandContribution)),
    __metadata("design:paramtypes", [Object])
], GraphCommandRegistry);
export { GraphCommandRegistry };
//# sourceMappingURL=graph-command.js.map