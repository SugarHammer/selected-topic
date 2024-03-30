import { __awaiter, __decorate, __metadata } from "tslib";
import { singleton, inject } from 'mana-syringe';
import { IGraphCommandService } from '../../command/interface';
import { COMMAND_REDOABLE, COMMAND_UNDOABLE, COMMAND_GLOBALS } from '../constant';
import { IModelContribution } from '../interface';
let CommandModelContribution = class CommandModelContribution {
    /** 扩展Model */
    registerModel(registry) {
        /** 是否可以redo */
        registry.registerModel({
            id: COMMAND_REDOABLE.id,
            getInitialValue: () => this.commands.isRedoable,
            watchChange: (model) => __awaiter(this, void 0, void 0, function* () {
                const disposable = this.commands.watchChange(() => {
                    model.setValue(this.commands.isRedoable);
                });
                return disposable;
            }),
        });
        /** 是否可以undo */
        registry.registerModel({
            id: COMMAND_UNDOABLE.id,
            getInitialValue: () => this.commands.isUndoable,
            watchChange: (model) => __awaiter(this, void 0, void 0, function* () {
                const disposable = this.commands.watchChange(() => {
                    model.setValue(this.commands.isUndoable);
                });
                return disposable;
            }),
        });
        /** command 执行结果 */
        registry.registerModel({
            id: COMMAND_GLOBALS.id,
            modelFactory: () => {
                return this.commands.Globals;
            },
        });
    }
};
__decorate([
    inject(IGraphCommandService),
    __metadata("design:type", Object)
], CommandModelContribution.prototype, "commands", void 0);
CommandModelContribution = __decorate([
    singleton({ contrib: IModelContribution })
], CommandModelContribution);
export { CommandModelContribution };
//# sourceMappingURL=command-model.js.map