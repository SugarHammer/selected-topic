import { __awaiter, __decorate } from "tslib";
import { Container, injectable } from 'mana-syringe';
import { commandRegistryModule } from '../module';
import { IGraphCommandService, ICommandHandler, IGraphCommandFactory } from '../interface';
import { GraphCommandRegistry } from '../graph-command';
describe('GraphCommandRegistry Test', () => {
    let container = null;
    let commandService = null;
    let commandRegistry = null;
    let commandFactory = null;
    beforeEach(() => {
        container = new Container();
        /** ICommandHandler 工厂 */
        container.register(IGraphCommandFactory, {
            useFactory: context => {
                return (commandId) => {
                    const child = context.container.createChild();
                    /** 实例化CommandHandler */
                    const commandHandler = child.getNamed(ICommandHandler, commandId);
                    return commandHandler;
                };
            },
        });
        container.load(commandRegistryModule);
        commandService = container.get(IGraphCommandService);
        commandRegistry = container.get(GraphCommandRegistry);
        commandFactory = container.get(IGraphCommandFactory);
    });
    it('should register new command', () => {
        // given
        const mockCommnad = {
            id: 'test-id',
            label: 'test-node-command-label',
            category: 'node',
        };
        let MockCommand = class MockCommand {
            constructor() {
                this.contextProvider = () => {
                    return {};
                };
                this.execute = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
                this.undo = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
                this.redo = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
                this.isUndoable = () => {
                    return false;
                };
            }
        };
        MockCommand = __decorate([
            injectable({
                token: { token: ICommandHandler, named: mockCommnad.id },
            })
        ], MockCommand);
        // when
        container.register(MockCommand);
        commandRegistry.registerCommand(mockCommnad, {
            createCommand: commandFactory,
        });
        // then
        expect(commandRegistry.hasCommand(mockCommnad.id)).toBe(true);
    });
    it('should create command after exxcute command', () => __awaiter(void 0, void 0, void 0, function* () {
        // given
        const mockCommnad = {
            id: 'test-id',
            label: 'test-node-command-label',
            category: 'node',
        };
        let MockCommand = class MockCommand {
            constructor() {
                this.contextProvider = () => {
                    return {};
                };
                this.isUndoable = () => {
                    return false;
                };
                this.execute = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
                this.undo = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
                this.redo = () => __awaiter(this, void 0, void 0, function* () {
                    return this;
                });
            }
        };
        MockCommand = __decorate([
            injectable({
                token: { token: ICommandHandler, named: mockCommnad.id },
            })
        ], MockCommand);
        container.register(MockCommand);
        commandRegistry.registerCommand(mockCommnad, {
            createCommand: commandFactory,
        });
        // when
        const cmdHandler = yield commandService.executeCommand(mockCommnad.id, {});
        // then
        expect(cmdHandler instanceof MockCommand).toBe(true);
    }));
});
//# sourceMappingURL=graph-command.spec.js.map