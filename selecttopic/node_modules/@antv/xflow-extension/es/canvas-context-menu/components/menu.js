import { renderMenuOptions } from './menu-render';
import { useModel, useXFlowApp } from '@antv/xflow-core';
export const XFlowMenu = props => {
    const { menuModel, target, onHide } = props;
    const { modelService, commandService } = useXFlowApp();
    const [state] = useModel(menuModel);
    return renderMenuOptions({
        idx: -1,
        target,
        commandService,
        modelService,
        menuOptions: state,
        onHide,
    });
};
//# sourceMappingURL=menu.js.map