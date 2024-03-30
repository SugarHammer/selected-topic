"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowchartFormPanel = exports.CONTAINER_CLASS = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var icons_1 = require("@ant-design/icons");
var canvas_json_schema_form_1 = require("../canvas-json-schema-form");
var base_panel_1 = require("../base-panel");
var form_schema_service_1 = require("./form-schema-service");
var control_map_service_1 = require("./control-map-service");
exports.CONTAINER_CLASS = 'xflow-editor-panel-collpase';
var FlowchartFormPanel = function (props) {
    var _a = (0, react_1.useState)(false), collpased = _a[0], setCollpased = _a[1];
    var _b = props.controlMapService, controlMapService = _b === void 0 ? control_map_service_1.defaultControlMapService : _b, _c = props.formSchemaService, formSchemaService = _c === void 0 ? form_schema_service_1.defaultFormSchemaService : _c, _d = props.position, position = _d === void 0 ? { width: 240, top: 0, bottom: 0, right: 0 } : _d, _e = props.show, show = _e === void 0 ? true : _e, rest = tslib_1.__rest(props, ["controlMapService", "formSchemaService", "position", "show"]);
    if (!show) {
        return null;
    }
    var _f = position.width, width = _f === void 0 ? 200 : _f, right = position.right;
    return (react_1.default.createElement(base_panel_1.WorkspacePanel, { className: exports.CONTAINER_CLASS, position: tslib_1.__assign(tslib_1.__assign({}, position), { right: !collpased ? right : -width }) },
        react_1.default.createElement("div", { className: "".concat(exports.CONTAINER_CLASS, "-wrapper") },
            react_1.default.createElement(canvas_json_schema_form_1.JsonSchemaForm, tslib_1.__assign({ targetType: ['node', 'edge', 'canvas', 'group'], controlMapService: controlMapService, formSchemaService: formSchemaService, position: tslib_1.__assign(tslib_1.__assign({}, position), { top: 0 }), prefixClz: "xflow-form-editor" }, rest)),
            react_1.default.createElement("div", { className: "".concat(exports.CONTAINER_CLASS, "-icon"), style: {
                    top: 21,
                    left: !collpased ? -10 : -20,
                    borderRadius: !collpased ? '50%' : '50% 0 0  50%',
                    borderRight: !collpased ? '' : 'none',
                }, onClick: function () {
                    setCollpased(!collpased);
                } }, collpased ? react_1.default.createElement(icons_1.DoubleLeftOutlined, null) : react_1.default.createElement(icons_1.DoubleRightOutlined, null)))));
};
exports.FlowchartFormPanel = FlowchartFormPanel;
//# sourceMappingURL=form-panel.js.map