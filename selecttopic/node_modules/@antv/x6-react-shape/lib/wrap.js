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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrap = void 0;
var react_1 = __importDefault(require("react"));
var x6_1 = require("@antv/x6");
var Wrap = /** @class */ (function (_super) {
    __extends(Wrap, _super);
    function Wrap(props) {
        var _this = _super.call(this, props) || this;
        _this.scheduledAnimationFrame = false;
        _this.throttleUpdateFunc = function () {
            if (_this.scheduledAnimationFrame) {
                return;
            }
            _this.scheduledAnimationFrame = true;
            window.requestAnimationFrame(function () {
                _this.setState(function (state) {
                    _this.scheduledAnimationFrame = false;
                    return { tick: state.tick + 1 };
                });
            });
        };
        _this.onChange = function (e) {
            if (Wrap.throttleChangeTypes.includes(e.key)) {
                _this.throttleUpdateFunc();
                return;
            }
            // eslint-disable-next-line react/no-access-state-in-setstate
            _this.setState({ tick: _this.state.tick + 1 });
        };
        _this.state = { tick: 0 };
        return _this;
    }
    Wrap.prototype.componentDidMount = function () {
        this.props.node.on('change:*', this.onChange);
    };
    Wrap.prototype.componentWillUnmount = function () {
        this.props.node.off('change:*', this.onChange);
    };
    Wrap.prototype.clone = function (elem) {
        var node = this.props.node;
        return typeof elem.type === 'string'
            ? react_1.default.cloneElement(elem)
            : react_1.default.cloneElement(elem, { node: node });
    };
    Wrap.prototype.render = function () {
        var _a = this.props, graph = _a.graph, node = _a.node, component = _a.component;
        if (react_1.default.isValidElement(component)) {
            return this.clone(component);
        }
        if (typeof component === 'function') {
            // Calling the component function on every change of the node.
            var ret = x6_1.FunctionExt.call(component, graph, node);
            if (react_1.default.isValidElement(ret)) {
                return this.clone(ret);
            }
        }
        return component;
    };
    Wrap.throttleChangeTypes = ['position', 'size'];
    return Wrap;
}(react_1.default.PureComponent));
exports.Wrap = Wrap;
//# sourceMappingURL=wrap.js.map