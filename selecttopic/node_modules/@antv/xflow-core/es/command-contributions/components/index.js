import React from 'react';
import { useExtensionRegistry } from '../../xflow-main/components/extension-context';
import { createModule } from '../module';
import { CommandConfig } from '../config';
export const CommandsRegistry = props => {
    /** 生成配置中心 */
    const extensionRegistry = useExtensionRegistry();
    /** 获取ContextMenu的配置 */
    const config = React.useMemo(() => (props.config ? props.config : new CommandConfig()), 
    /* eslint-disable-next-line  */
    []);
    React.useEffect(() => {
        extensionRegistry.addCoreModule({
            config: config,
            createModule,
        });
        /* eslint-disable-next-line  */
    }, []);
    return null;
};
export const createCmdConfig = (addOptions) => (value) => {
    /** bridge config and value */
    const valueContainer = React.useMemo(() => ({ getValue: () => ({}) }), []);
    valueContainer.getValue = () => value;
    const hookConfig = React.useMemo(() => {
        const config = new CommandConfig();
        addOptions(config, valueContainer);
        return config;
    }, [valueContainer]);
    return hookConfig;
};
//# sourceMappingURL=index.js.map