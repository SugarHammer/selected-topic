import { __awaiter } from "tslib";
import React from 'react';
import { Dropdown } from '@antv/x6-react-components';
import { useXFlowApp, useModelAsync } from '@antv/xflow-core';
import { CONTEXT_MENU_MODEL } from '../interface';
import { XFlowMenu } from './menu';
const DisposeHelper = ({ toDispose }) => {
    React.useEffect(() => {
        return () => {
            toDispose.dispose();
        };
    }, [toDispose]);
    return null;
};
export const ContextMenuRender = () => {
    const domRef = React.useRef();
    const xflow = useXFlowApp();
    const [state, , renderModel] = useModelAsync({
        /** 绑定Model到state */
        getModel: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield CONTEXT_MENU_MODEL.getModel(xflow.modelService);
        }),
        /** 设置state的默认值 */
        initialState: {
            anchor: null,
            menuModel: null,
            target: null,
            customRender: null,
            toDispose: null,
        },
    });
    const { target, anchor, menuModel, customRender, toDispose } = state;
    if (!target || !anchor || !menuModel) {
        return null;
    }
    const onMaskClick = () => {
        renderModel.setValue({
            anchor: null,
            menuModel: null,
            target: null,
            customRender: null,
            toDispose: null,
        });
    };
    const overlay = customRender ? (React.createElement(customRender, {
        target,
        modelService: xflow.modelService,
        onHide: onMaskClick,
    })) : (React.createElement(XFlowMenu, { target: target, menuModel: menuModel, onHide: onMaskClick }));
    return (React.createElement("div", { className: "xflow-menu-mask", ref: domRef, onClick: onMaskClick, onContextMenu: e => {
            e.preventDefault();
            e.stopPropagation();
        } },
        React.createElement(DisposeHelper, { toDispose: toDispose }),
        React.createElement(Dropdown, { visible: true, getPopupContainer: () => domRef.current, overlay: overlay },
            React.createElement("div", { className: "xflow-context-menu-anchor", style: { top: anchor.y, left: anchor.x } }))));
};
//# sourceMappingURL=index.js.map