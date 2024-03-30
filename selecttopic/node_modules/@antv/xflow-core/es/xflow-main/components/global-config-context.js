import React from 'react';
import { XFLOW_PREFIX_CLS } from '../../constants';
/** xflow classname prefix context */
class ConfigProvider {
    constructor() {
        this.xflowPrefixCls = XFLOW_PREFIX_CLS;
        this.getXflowPrefixCls = (pkgName) => {
            return `${this.xflowPrefixCls}-${pkgName}`;
        };
        this.setXflowPrefixCls = (prefixCls) => {
            return (this.xflowPrefixCls = prefixCls);
        };
    }
}
export const XFlowConfigProviderContext = React.createContext({
    configProvider: null,
});
export const useConfigContext = () => {
    return React.useContext(XFlowConfigProviderContext);
};
export const useXflowPrefixCls = (pkgName) => {
    const ctx = useConfigContext();
    return React.useMemo(() => {
        if (ctx.configProvider) {
            return ctx.configProvider.getXflowPrefixCls(pkgName);
        }
        return `${XFLOW_PREFIX_CLS}-${pkgName}`;
        /* eslint-disable-next-line  */
    }, [pkgName]);
};
//# sourceMappingURL=global-config-context.js.map