"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelBody = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var antd_1 = require("antd");
var schema_form_1 = require("./schema-form");
var index_1 = require("./schema-form/control-map/index");
var PanelBody = function (props) {
    var _a = props.schema, schema = _a === void 0 ? { tabs: [] } : _a, triggerUpdate = props.triggerUpdate, onFieldsChange = props.onFieldsChange, afterUpdatingCb = props.afterUpdatingCb, defaultControlRender = props.defaultControlRender, loading = props.loading, controlMapService = props.controlMapService, _b = props.defaultControls, defaultControls = _b === void 0 ? [] : _b;
    var controlMapCache = react_1.default.useMemo(function () {
        var controlMap = (0, index_1.makeControlMap)(tslib_1.__spreadArray(tslib_1.__spreadArray([], index_1.xflowDefaultControls, true), defaultControls, true));
        if (controlMapService) {
            controlMapService(controlMap);
        }
        return controlMap;
    }, [controlMapService, defaultControls]);
    if (loading) {
        return (react_1.default.createElement("div", { className: "".concat(props.prefixClz, "-body"), style: tslib_1.__assign(tslib_1.__assign({}, props.style), { display: 'flex', justifyContent: 'center', alignItems: 'center' }) },
            react_1.default.createElement(antd_1.Spin, { spinning: true })));
    }
    return (react_1.default.createElement("div", { className: "".concat(props.prefixClz, "-body"), style: props.style },
        schema.tabs.length > 0 && (react_1.default.createElement(schema_form_1.SchemaForm, { schema: schema, onFieldsChange: onFieldsChange, controlMap: controlMapCache, defaultControlRender: defaultControlRender, afterUpdatingCb: afterUpdatingCb, triggerUpdate: triggerUpdate })),
        schema.tabs.length === 0 && react_1.default.createElement(antd_1.Empty, { style: { paddingTop: '64px' } })));
};
exports.PanelBody = PanelBody;
//# sourceMappingURL=panel-body.js.map