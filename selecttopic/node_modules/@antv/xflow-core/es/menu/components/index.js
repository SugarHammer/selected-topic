import { __awaiter } from "tslib";
import React from 'react';
import { createModule } from '../module';
import { useExtensionRegistry } from '../../xflow-main/components/extension-context';
export const MenuRegistry = props => {
    const {} = props;
    /** 获取配置中心 */
    const extensionRegistry = useExtensionRegistry();
    React.useEffect(() => {
        const disposable = extensionRegistry.addCoreModule({
            config: { CONFIG_TYPE: 'MenuRegistry', getConfig: () => __awaiter(void 0, void 0, void 0, function* () { }) },
            createModule,
        });
        return () => {
            disposable.dispose();
        };
        /* eslint-disable-next-line  */
    }, []);
    return null;
};
MenuRegistry.defaultProps = { XFlowModuleType: 'MenuRegistry' };
//# sourceMappingURL=index.js.map