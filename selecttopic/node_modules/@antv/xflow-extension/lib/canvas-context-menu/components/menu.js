"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XFlowMenu = void 0;
var menu_render_1 = require("./menu-render");
var xflow_core_1 = require("@antv/xflow-core");
var XFlowMenu = function (props) {
    var menuModel = props.menuModel, target = props.target, onHide = props.onHide;
    var _a = (0, xflow_core_1.useXFlowApp)(), modelService = _a.modelService, commandService = _a.commandService;
    var state = (0, xflow_core_1.useModel)(menuModel)[0];
    return (0, menu_render_1.renderMenuOptions)({
        idx: -1,
        target: target,
        commandService: commandService,
        modelService: modelService,
        menuOptions: state,
        onHide: onHide,
    });
};
exports.XFlowMenu = XFlowMenu;
//# sourceMappingURL=menu.js.map