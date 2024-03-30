import React from 'react';
import { createModule } from '../module';
import { useExtensionRegistry } from '../../xflow-main/components/extension-context';
import { KeybindingConfig } from '../config';
export const KeyBindings = props => {
    const { config } = props;
    /** 获取配置中心 */
    const extensionRegistry = useExtensionRegistry();
    /** 获取ContextService的配置 */
    const keybindingConfig = React.useMemo(() => (config ? config : new KeybindingConfig()), [config]);
    React.useEffect(() => {
        const disposable = extensionRegistry.addCoreModule({
            config: keybindingConfig,
            createModule,
        });
        /** resolve */
        keybindingConfig.setMountState();
        return () => {
            disposable.dispose();
            keybindingConfig.dispose();
        };
    }, [extensionRegistry, keybindingConfig]);
    return null;
};
export const createKeybindingConfig = (addOptions) => (value) => {
    /** bridge config and value */
    const valueContainer = React.useMemo(() => ({ getValue: () => ({}) }), []);
    valueContainer.getValue = () => value;
    const hookConfig = React.useMemo(() => {
        const config = new KeybindingConfig();
        addOptions(config, valueContainer);
        return config;
    }, [valueContainer]);
    return hookConfig;
};
//# sourceMappingURL=index.js.map