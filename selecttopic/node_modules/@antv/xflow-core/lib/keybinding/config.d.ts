import type { IKeyBinding, IRegisterKeybindingFunction } from './interface';
import type { IModuleConfig } from '../xflow-main/interface';
export declare namespace NsContext {
    const CONFIG_TYPE = "CONTEXT_CONFIG";
    interface IRenderConfig {
        keybindings: IKeyBinding[];
    }
}
export declare class KeybindingConfig implements IModuleConfig {
    /** CONFIG_TYPE */
    readonly CONFIG_TYPE = "CONTEXT_CONFIG";
    /** 外部注册context的方法 */
    private keybindingFunc;
    /** 是否已加载 */
    private isMounted;
    setKeybindingFunc: (fn: IRegisterKeybindingFunction) => void;
    setMountState: () => void;
    getConfig: () => Promise<{
        CONFIG_TYPE: string;
        registerKeybindingFunc: IRegisterKeybindingFunction;
    }>;
    dispose: () => void;
}
