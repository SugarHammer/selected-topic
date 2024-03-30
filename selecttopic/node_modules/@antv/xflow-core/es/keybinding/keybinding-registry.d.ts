import { Contribution } from 'mana-syringe';
import { DisposableCollection, Disposable } from '../common/disposable';
import { IFrontendApplicationContribution } from '../xflow-main/interface';
import { IGraphProvider } from '../xflow-main/graph/graph-provider';
import type { IKeyBinding, IKeybindingRegistry } from './interface';
import { IKeyBindingContribution } from './interface';
export declare class KeyBindingRegistry implements IFrontendApplicationContribution, IKeybindingRegistry {
    /** disposables */
    private toDispose;
    /** disposables */
    private keyBindingMap;
    /** disposables */
    private enabledKeyBindingMap;
    /** KeyBinding 配置 */
    private optionProvider;
    /** GraphCommandRegistry 用于执行 */
    private commandService;
    /** IModelService 实例 */
    private modelService;
    /** context 扩展点 */
    protected readonly contributionProvider: Contribution.Provider<IKeyBindingContribution>;
    /**
     *  app启动时, 注册keybinding的扩展
     */
    onStart(): void;
    /**
     * app停止的逻辑
     */
    onStop(): void;
    /** 注册用户定义在config中的keybinding */
    protected registerExternalKeybindings: () => Promise<Disposable>;
    /** 注册可Dispose的Keybinding */
    registerKeybinding: (keybindings?: IKeyBinding[]) => DisposableCollection;
    /**
     * 启用keybinding, 用于触发command
     * @param id contextId
     */
    enableKeyBindings: (keybindingId: string) => Promise<Disposable>;
    /**
     * 禁用keybinding
     */
    disableKeyBindings: (ids: string[]) => void;
    /**
     * 执行command
     */
    protected runCommand: (keybinding: IKeyBinding) => (e: KeyboardEvent) => Promise<void>;
    /**
     * 获取画布实例
     */
    private getX6Graph;
    protected readonly graphProvider: IGraphProvider;
}
