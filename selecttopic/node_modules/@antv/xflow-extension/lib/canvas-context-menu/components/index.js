"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuRender = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var x6_react_components_1 = require("@antv/x6-react-components");
var xflow_core_1 = require("@antv/xflow-core");
var interface_1 = require("../interface");
var menu_1 = require("./menu");
var DisposeHelper = function (_a) {
    var toDispose = _a.toDispose;
    react_1.default.useEffect(function () {
        return function () {
            toDispose.dispose();
        };
    }, [toDispose]);
    return null;
};
var ContextMenuRender = function () {
    var domRef = react_1.default.useRef();
    var xflow = (0, xflow_core_1.useXFlowApp)();
    var _a = (0, xflow_core_1.useModelAsync)({
        /** 绑定Model到state */
        getModel: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, interface_1.CONTEXT_MENU_MODEL.getModel(xflow.modelService)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        /** 设置state的默认值 */
        initialState: {
            anchor: null,
            menuModel: null,
            target: null,
            customRender: null,
            toDispose: null,
        },
    }), state = _a[0], renderModel = _a[2];
    var target = state.target, anchor = state.anchor, menuModel = state.menuModel, customRender = state.customRender, toDispose = state.toDispose;
    if (!target || !anchor || !menuModel) {
        return null;
    }
    var onMaskClick = function () {
        renderModel.setValue({
            anchor: null,
            menuModel: null,
            target: null,
            customRender: null,
            toDispose: null,
        });
    };
    var overlay = customRender ? (react_1.default.createElement(customRender, {
        target: target,
        modelService: xflow.modelService,
        onHide: onMaskClick,
    })) : (react_1.default.createElement(menu_1.XFlowMenu, { target: target, menuModel: menuModel, onHide: onMaskClick }));
    return (react_1.default.createElement("div", { className: "xflow-menu-mask", ref: domRef, onClick: onMaskClick, onContextMenu: function (e) {
            e.preventDefault();
            e.stopPropagation();
        } },
        react_1.default.createElement(DisposeHelper, { toDispose: toDispose }),
        react_1.default.createElement(x6_react_components_1.Dropdown, { visible: true, getPopupContainer: function () { return domRef.current; }, overlay: overlay },
            react_1.default.createElement("div", { className: "xflow-context-menu-anchor", style: { top: anchor.y, left: anchor.x } }))));
};
exports.ContextMenuRender = ContextMenuRender;
//# sourceMappingURL=index.js.map