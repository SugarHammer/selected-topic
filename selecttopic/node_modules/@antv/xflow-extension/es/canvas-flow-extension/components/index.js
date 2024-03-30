import { __awaiter } from "tslib";
import React from 'react';
import { useExtensionRegistry } from '@antv/xflow-core';
import { createFlowExtensionModule } from '../module';
export const FlowGraphExtension = () => {
    /** 获取扩展Registry */
    const extensionRegistry = useExtensionRegistry();
    const config = React.useMemo(() => ({
        CONFIG_TYPE: 'DAG_EXTENSION',
        getConfig: () => __awaiter(void 0, void 0, void 0, function* () { }),
    }), []);
    React.useEffect(() => {
        /** 注册 extension 到 Registry */
        const disposable = extensionRegistry.addExtension({
            config: config,
            createModule: createFlowExtensionModule,
        });
        /** 添加 classname */
        extensionRegistry.addContainerClassNames('flow-extension-container');
        return () => {
            disposable.dispose();
        };
    }, [config, extensionRegistry]);
    return null;
};
//# sourceMappingURL=index.js.map