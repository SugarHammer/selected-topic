"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePanelLyaoutStyle = void 0;
var tslib_1 = require("tslib");
var xflow_core_1 = require("@antv/xflow-core");
var constants_1 = require("./constants");
var usePanelLyaoutStyle = function (config, noSchema) {
    var headerHeight = (config && config.headerPosition && config.headerPosition.height) || constants_1.PANEL_HEADER_HEIGHT;
    var footerHeight = (config.footerPosition && config.footerPosition.height) || constants_1.PANEL_FOOTER_HEIGHT;
    return {
        headerStyle: (0, xflow_core_1.usePositionStyle)(tslib_1.__assign(tslib_1.__assign({ height: 0, top: 0, left: 0, right: 0 }, (noSchema ? { height: headerHeight, lineHeight: headerHeight } : {})), config.headerPosition)),
        bodyStyle: (0, xflow_core_1.usePositionStyle)(tslib_1.__assign(tslib_1.__assign({ left: 0, right: 0, top: 0 }, (noSchema ? { top: headerHeight, bottom: footerHeight } : { bottom: footerHeight })), config.bodyPosition)),
        footerStyle: (0, xflow_core_1.usePositionStyle)(tslib_1.__assign(tslib_1.__assign({ left: 0, right: 0, lineHeight: footerHeight, height: footerHeight, bottom: 0 }, (noSchema ? { lineHeight: footerHeight, height: footerHeight } : { bottom: 0 })), config.footerPosition)),
    };
};
exports.usePanelLyaoutStyle = usePanelLyaoutStyle;
//# sourceMappingURL=utils.js.map