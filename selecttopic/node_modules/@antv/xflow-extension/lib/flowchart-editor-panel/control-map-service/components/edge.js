"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeService = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var form_wrapper_1 = require("../../form-wrapper");
var fields_1 = require("./fields");
var constants_1 = require("./constants");
var EdgeComponent = function (props) {
    var config = props.config, _a = props.plugin, plugin = _a === void 0 ? {} : _a;
    var updateEdge = plugin.updateEdge;
    var _b = (0, react_1.useState)(tslib_1.__assign(tslib_1.__assign({}, constants_1.DefaultEdgeConfig), config)), edgeConfig = _b[0], setEdgeConfig = _b[1];
    (0, react_1.useEffect)(function () {
        setEdgeConfig(tslib_1.__assign(tslib_1.__assign({}, constants_1.DefaultEdgeConfig), config));
    }, [config]);
    var getAttrs = function (key, type) {
        var _a;
        if (type === void 0) { type = 'line'; }
        var _b = edgeConfig.attrs, attrs = _b === void 0 ? {} : _b;
        return (_a = attrs[type]) === null || _a === void 0 ? void 0 : _a[key];
    };
    var getArrowValue = function () {
        var _a, _b, _c, _d, _e;
        var _f = edgeConfig.attrs, attrs = _f === void 0 ? {} : _f;
        var _g = attrs.line, line = _g === void 0 ? {} : _g;
        if (((_a = line.sourceMarker) === null || _a === void 0 ? void 0 : _a.name) && ((_b = line.targetMarker) === null || _b === void 0 ? void 0 : _b.name)) {
            return 'all';
        }
        if (!((_c = line.sourceMarker) === null || _c === void 0 ? void 0 : _c.name) && !((_d = line.targetMarker) === null || _d === void 0 ? void 0 : _d.name)) {
            return 'none';
        }
        if ((_e = line.sourceMarker) === null || _e === void 0 ? void 0 : _e.name) {
            return 'source';
        }
        return 'target';
    };
    var getSrokeDashValue = function () {
        var _a = edgeConfig.attrs, attrs = _a === void 0 ? {} : _a;
        var _b = attrs.line, line = _b === void 0 ? {} : _b;
        return line.strokeDasharray ? 'dash' : 'solid';
    };
    var onEdgeConfigChange = function (key, value, type) {
        var _a, _b, _c, _d, _e;
        var _f, _g;
        if (type === void 0) { type = 'line'; }
        /** 全量更新，简化逻辑 */
        if (key === 'arrow') {
            setEdgeConfig(tslib_1.__assign(tslib_1.__assign({}, edgeConfig), { attrs: tslib_1.__assign(tslib_1.__assign({}, edgeConfig.attrs), (_a = {}, _a[type] = tslib_1.__assign(tslib_1.__assign({}, (_f = edgeConfig.attrs) === null || _f === void 0 ? void 0 : _f[type]), value), _a)) }));
        }
        else {
            setEdgeConfig(tslib_1.__assign(tslib_1.__assign({}, edgeConfig), (_b = {}, _b[key] = value, _b.attrs = tslib_1.__assign(tslib_1.__assign({}, edgeConfig.attrs), (_c = {}, _c[type] = tslib_1.__assign(tslib_1.__assign({}, (_g = edgeConfig.attrs) === null || _g === void 0 ? void 0 : _g[type]), (_d = {}, _d[key] = value, _d)), _c)), _b)));
        }
        updateEdge((_e = {},
            _e[key] = value,
            _e), type, key === 'arrow' ? 'arrow' : '');
    };
    return (react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-body") },
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u5185\u5BB9"),
            react_1.default.createElement(fields_1.InputFiled, { label: "\u6807\u7B7E", value: edgeConfig.label, onChange: function (value) {
                    onEdgeConfigChange('label', value);
                } })),
        react_1.default.createElement("h5", { style: { marginBottom: 12 } }, "\u6837\u5F0F"),
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group"), style: { marginBottom: 0 } },
            react_1.default.createElement("h5", null, "\u7EBF"),
            react_1.default.createElement(fields_1.SelectField, { label: "\u7BAD\u5934", value: getArrowValue(), width: "100%", options: [
                    {
                        label: '正向',
                        value: 'target',
                    },
                    {
                        label: '逆向',
                        value: 'source',
                    },
                    {
                        label: '双向',
                        value: 'all',
                    },
                    {
                        label: '无',
                        value: 'none',
                    },
                ], onChange: function (value) {
                    onEdgeConfigChange('arrow', constants_1.ArrowMaps[value], 'line');
                } }),
            react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-edge-stroke-style") },
                react_1.default.createElement(fields_1.SelectField, { label: "\u7EBF\u5F62", width: 68, value: getSrokeDashValue(), options: [
                        {
                            label: '实线',
                            value: 'solid',
                        },
                        {
                            label: '虚线',
                            value: 'dash',
                        },
                    ], onChange: function (value) {
                        onEdgeConfigChange('strokeDasharray', constants_1.ArrowStrokeMaps[value], 'line');
                    } }),
                react_1.default.createElement(fields_1.InputNumberFiled, { value: getAttrs('strokeWidth'), min: 1, onChange: function (value) {
                        onEdgeConfigChange('strokeWidth', value, 'line');
                    } })),
            react_1.default.createElement(fields_1.ColorPicker, { label: "\u8FB9\u6846", value: getAttrs('stroke'), onChange: function (value) {
                    onEdgeConfigChange('stroke', value, 'line');
                } })),
        react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-panel-group") },
            react_1.default.createElement("h5", null, "\u6807\u7B7E"),
            react_1.default.createElement("div", { className: "".concat(constants_1.PREFIX, "-edge-text-style") },
                react_1.default.createElement(fields_1.InputNumberFiled, { label: "\u5B57\u53F7", min: 10, width: 68, value: getAttrs('fontSize', 'text') || 12, onChange: function (value) {
                        onEdgeConfigChange('fontSize', value, 'text');
                    } }),
                react_1.default.createElement(fields_1.ColorPicker, { value: getAttrs('fill', 'text') || '#000', onChange: function (value) {
                        onEdgeConfigChange('fill', value, 'text');
                    } })))));
};
var EdgeService = function (props) {
    return (react_1.default.createElement(form_wrapper_1.FlowchartFormWrapper, tslib_1.__assign({}, props, { type: "edge" }), function (config, plugin) { return react_1.default.createElement(EdgeComponent, tslib_1.__assign({}, props, { plugin: plugin, config: config })); }));
};
exports.EdgeService = EdgeService;
//# sourceMappingURL=edge.js.map