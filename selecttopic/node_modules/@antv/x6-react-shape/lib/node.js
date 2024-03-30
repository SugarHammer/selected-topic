"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactShape = void 0;
var x6_1 = require("@antv/x6");
var ReactShape = /** @class */ (function (_super) {
    __extends(ReactShape, _super);
    function ReactShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReactShape.prototype, "component", {
        get: function () {
            return this.getComponent();
        },
        set: function (val) {
            this.setComponent(val);
        },
        enumerable: false,
        configurable: true
    });
    ReactShape.prototype.getComponent = function () {
        return this.store.get('component');
    };
    ReactShape.prototype.setComponent = function (component, options) {
        if (options === void 0) { options = {}; }
        if (component == null) {
            this.removeComponent(options);
        }
        else {
            this.store.set('component', component, options);
        }
        return this;
    };
    ReactShape.prototype.removeComponent = function (options) {
        if (options === void 0) { options = {}; }
        this.store.remove('component', options);
        return this;
    };
    return ReactShape;
}(x6_1.Node));
exports.ReactShape = ReactShape;
(function (ReactShape) {
    function getMarkup(simple, useForeignObject, primer) {
        if (primer === void 0) { primer = 'rect'; }
        var markup = [];
        var content = useForeignObject
            ? x6_1.Markup.getForeignObjectMarkup()
            : {
                tagName: 'g',
                selector: 'content',
            };
        if (simple) {
            markup.push(content);
        }
        else {
            markup.push.apply(markup, [
                {
                    tagName: primer,
                    selector: 'body',
                },
                content,
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ]);
        }
        return markup;
    }
    ReactShape.config({
        view: 'react-shape-view',
        markup: getMarkup(false, true),
        attrs: {
            body: {
                fill: 'none',
                stroke: 'none',
                refWidth: '100%',
                refHeight: '100%',
            },
            fo: {
                refWidth: '100%',
                refHeight: '100%',
            },
            label: {
                fontSize: 14,
                fill: '#333',
                refX: '50%',
                refY: '50%',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
            },
        },
        propHooks: function (metadata) {
            if (metadata.markup == null) {
                var primer = metadata.primer;
                var useForeignObject = metadata.useForeignObject !== false;
                if (primer && primer !== 'rect') {
                    metadata.markup = getMarkup(false, useForeignObject, primer);
                    var attrs = {};
                    if (primer === 'circle') {
                        attrs = {
                            refCx: '50%',
                            refCy: '50%',
                            refR: '50%',
                        };
                    }
                    else if (primer === 'ellipse') {
                        attrs = {
                            refCx: '50%',
                            refCy: '50%',
                            refRx: '50%',
                            refRy: '50%',
                        };
                    }
                    metadata.attrs = x6_1.ObjectExt.merge({}, {
                        body: __assign({ refWidth: null, refHeight: null }, attrs),
                    }, metadata.attrs || {});
                }
                else {
                    if (metadata.simple) {
                        metadata.markup = getMarkup(true, useForeignObject);
                        metadata.attrs = x6_1.ObjectExt.merge({}, {
                            body: null,
                            label: null,
                        }, metadata.attrs || {});
                    }
                }
            }
            return metadata;
        },
    });
    x6_1.Node.registry.register('react-shape', ReactShape, true);
})(ReactShape = exports.ReactShape || (exports.ReactShape = {}));
exports.ReactShape = ReactShape;
//# sourceMappingURL=node.js.map