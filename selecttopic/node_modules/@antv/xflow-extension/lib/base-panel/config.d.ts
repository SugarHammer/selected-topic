/** baseConfig */
export declare class PropsProxy<T> {
    /** 设置组件的props */
    getValue: () => T;
    /** dispose */
    dispose(): void;
}
/** baseConfig */
export declare class PanelBaseConfig {
    /** instance id */
    moduleId: string;
    /** uuid */
    constructor(moduleId: string);
    /** dispose */
    dispose(): void;
}
