import React from 'react';
/** xflow classname prefix context */
declare class ConfigProvider {
    private xflowPrefixCls;
    getXflowPrefixCls: (pkgName: string) => string;
    setXflowPrefixCls: (prefixCls: string) => string;
}
interface IContext {
    configProvider: ConfigProvider;
}
export declare const XFlowConfigProviderContext: React.Context<IContext>;
export declare const useConfigContext: () => IContext;
export declare const useXflowPrefixCls: (pkgName: string) => string;
export {};
