import type { IModelRegisterFunction } from './interface';
import type { IModuleConfig } from '../xflow-main/interface';
export declare namespace NsModelServiceConfig {
    const CONFIG_TYPE = "MODEL_SERVICE_CONFIG";
}
export declare class ModelServiceConfig implements IModuleConfig {
    /** CONFIG_TYPE */
    readonly CONFIG_TYPE = "MODEL_SERVICE_CONFIG";
    /** 外部注册context的方法 */
    private registerModelFn?;
    /** CONFIG_TYPE */
    private isMounted;
    registerModel: (registerModel: IModelRegisterFunction) => void;
    setMountState: () => void;
    getConfig: () => Promise<{
        CONFIG_TYPE: string;
        modelRegisterFunc: IModelRegisterFunction;
    }>;
    dispose: () => void;
}
