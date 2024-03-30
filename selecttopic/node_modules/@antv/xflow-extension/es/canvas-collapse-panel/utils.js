import { usePositionStyle } from '@antv/xflow-core';
import { PANEL_HEADER_HEIGHT, PANEL_FOOTER_HEIGHT } from './constants';
export const usePanelLyaoutStyle = (config) => {
    const headerHeight = (config && config.headerPosition && config.headerPosition.height) || PANEL_HEADER_HEIGHT;
    const footerHeight = (config.footerPosition && config.footerPosition.height) || PANEL_FOOTER_HEIGHT;
    return {
        headerStyle: usePositionStyle(Object.assign({ height: headerHeight, lineHeight: headerHeight, top: 0, left: 0, right: 0 }, config.headerPosition)),
        bodyStyle: usePositionStyle(Object.assign({ left: 0, right: 0, top: headerHeight, bottom: footerHeight }, config.bodyPosition)),
        footerStyle: usePositionStyle(Object.assign({ left: 0, right: 0, lineHeight: footerHeight, height: footerHeight, bottom: 0 }, config.footerPosition)),
    };
};
//# sourceMappingURL=utils.js.map