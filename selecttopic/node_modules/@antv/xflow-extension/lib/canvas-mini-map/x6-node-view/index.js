"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleNodeView = void 0;
var tslib_1 = require("tslib");
var x6_1 = require("@antv/x6");
var SimpleNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleNodeView, _super);
    function SimpleNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleNodeView.prototype.renderMarkup = function () {
        return this.renderJSONMarkup({
            tagName: 'rect',
            selector: 'body',
        });
    };
    SimpleNodeView.prototype.update = function () {
        _super.prototype.update.call(this, {
            body: {
                refWidth: '100%',
                refHeight: '100%',
                fill: SimpleNodeView.nodeFillColor,
            },
        });
    };
    SimpleNodeView.nodeFillColor = '#31d0c6';
    SimpleNodeView.setNodeFillColor = function (color) {
        SimpleNodeView.nodeFillColor = color;
    };
    return SimpleNodeView;
}(x6_1.NodeView));
exports.SimpleNodeView = SimpleNodeView;
//# sourceMappingURL=index.js.map