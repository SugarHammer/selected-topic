import React from 'react';
import { createModule } from '../module';
import { ModelServiceConfig } from '../config';
import { useExtensionRegistry } from '../../xflow-main/components/extension-context';
export const ModelServiceRegistry = props => {
    const { config } = props;
    /** 获取配置中心 */
    const extensionRegistry = useExtensionRegistry();
    /** 获取ModelService的配置 */
    const modelServiceConfig = React.useMemo(() => (config ? config : new ModelServiceConfig()), 
    /* eslint-disable-next-line  */
    []);
    React.useEffect(() => {
        const disposable = extensionRegistry.addCoreModule({
            config: modelServiceConfig,
            createModule,
        });
        modelServiceConfig.setMountState();
        return () => {
            disposable.dispose();
            modelServiceConfig.dispose();
        };
        // 不要移除：保证 只生执行一次
        // eslint-disable-next-line
    }, []);
    return null;
};
ModelServiceRegistry.defaultProps = { XFlowModuleType: 'ModelServiceConfig' };
export const createModelServiceConfig = (addOptions) => (value) => {
    /** bridge config and value */
    const valueContainer = React.useMemo(() => ({ getValue: () => ({}) }), []);
    valueContainer.getValue = () => value;
    const hookConfig = React.useMemo(() => {
        const config = new ModelServiceConfig();
        addOptions(config, valueContainer);
        return config;
    }, [valueContainer]);
    return hookConfig;
};
//# sourceMappingURL=index.js.map