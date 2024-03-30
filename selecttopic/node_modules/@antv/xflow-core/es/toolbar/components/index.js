import { __awaiter } from "tslib";
import React from 'react';
import { createModule } from '../module';
import { useExtensionRegistry } from '../../xflow-main/components/extension-context';
export const ToolbarRegistry = props => {
    const {} = props;
    /** 获取配置中心 */
    const extensionRegistry = useExtensionRegistry();
    React.useEffect(() => {
        const disposable = extensionRegistry.addCoreModule({
            config: { CONFIG_TYPE: 'ToolbarRegistry', getConfig: () => __awaiter(void 0, void 0, void 0, function* () { }) },
            createModule,
        });
        return () => {
            disposable.dispose();
        };
    }, [extensionRegistry]);
    return null;
};
ToolbarRegistry.defaultProps = { XFlowModuleType: 'ToolbarRegistry' };
//# sourceMappingURL=index.js.map