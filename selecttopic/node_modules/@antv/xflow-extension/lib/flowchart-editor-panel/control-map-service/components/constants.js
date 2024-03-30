"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowStrokeMaps = exports.ArrowMaps = exports.DisableArrowConfig = exports.ArrowConfig = exports.DefaultEdgeConfig = exports.FormItemHeight = exports.PREFIX = void 0;
exports.PREFIX = 'flowchart-editor';
exports.FormItemHeight = 24;
/** 边默认配置 */
exports.DefaultEdgeConfig = {
    attrs: {
        line: {
            stroke: '#A2B1C3',
            strokeWidth: 1,
        },
        text: {
            fill: '#000',
            fontSize: 12,
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
    },
};
exports.ArrowConfig = {
    width: 12,
    height: 8,
    name: 'block',
};
exports.DisableArrowConfig = {
    width: 0,
    height: 0,
    name: '',
};
exports.ArrowMaps = {
    target: {
        sourceMarker: exports.DisableArrowConfig,
        targetMarker: exports.ArrowConfig,
    },
    source: {
        sourceMarker: exports.ArrowConfig,
        targetMarker: exports.DisableArrowConfig,
    },
    all: {
        sourceMarker: exports.ArrowConfig,
        targetMarker: exports.ArrowConfig,
    },
    none: {
        sourceMarker: exports.DisableArrowConfig,
        targetMarker: exports.DisableArrowConfig,
    },
};
exports.ArrowStrokeMaps = {
    solid: [0, 0],
    dash: [5, 5],
};
//# sourceMappingURL=constants.js.map