import { __awaiter, __decorate, __metadata } from "tslib";
import { ManaSyringe, DisposableCollection, MenuItemType, IModelContribution, IModelService, RxModel, Disposable, } from '@antv/xflow-core';
import { MODELS } from '@antv/xflow-core';
import { CONTEXT_MENU_MODEL } from '../interface';
import { ContextMenuConfig } from '../config';
const { inject, singleton } = ManaSyringe;
/**
 * IModelContribution
 */
let CanvasContextMenuContribution = class CanvasContextMenuContribution {
    constructor() {
        /** 注册 model */
        this.toDispose = new DisposableCollection();
        /** 获取 MenuModel */
        this.getMenuModelValue = (contextMenuInfo) => __awaiter(this, void 0, void 0, function* () {
            const config = yield this.menuConfig.getConfig();
            /** 获取坐标 */
            const { anchor, type, cell } = contextMenuInfo;
            /** 获取Menu */
            const toDispose = new DisposableCollection();
            this.toDispose.push(toDispose);
            const data = cell ? cell.getData() : null;
            const menuModel = new RxModel({
                id: 'menuroot',
                type: MenuItemType.Root,
                submenu: [],
            });
            toDispose.push(Disposable.create(() => {
                menuModel.dispose();
            }));
            const renderProps = {
                toDispose,
                anchor: anchor,
                target: { data, type },
                customRender: null,
                menuModel: menuModel,
            };
            if (config.menuCustomRender) {
                renderProps.customRender = yield config.menuCustomRender(contextMenuInfo, this.modelService);
            }
            if (config.menuModelService) {
                yield config.menuModelService(contextMenuInfo, renderProps.menuModel, this.modelService, toDispose);
            }
            return renderProps;
        });
    }
    /** 注册 MenuModel */
    registerModel(registry) {
        const toDispose = [
            registry.registerModel({
                id: CONTEXT_MENU_MODEL.id,
                getInitialValue: () => null,
                watchChange: (self, modelService) => __awaiter(this, void 0, void 0, function* () {
                    const contextMenuModel = yield MODELS.CONTEXTMENU_TARGET.getModel(modelService);
                    return contextMenuModel.watch((contextMenuInfo) => __awaiter(this, void 0, void 0, function* () {
                        const contextMenuValue = yield this.getMenuModelValue(contextMenuInfo);
                        self.setValue(contextMenuValue);
                    }));
                }),
            }),
        ];
        this.toDispose.pushAll(toDispose);
    }
};
__decorate([
    inject(ContextMenuConfig),
    __metadata("design:type", ContextMenuConfig)
], CanvasContextMenuContribution.prototype, "menuConfig", void 0);
__decorate([
    inject(IModelService),
    __metadata("design:type", Object)
], CanvasContextMenuContribution.prototype, "modelService", void 0);
CanvasContextMenuContribution = __decorate([
    singleton({ contrib: [IModelContribution] })
], CanvasContextMenuContribution);
export { CanvasContextMenuContribution };
//# sourceMappingURL=model.js.map