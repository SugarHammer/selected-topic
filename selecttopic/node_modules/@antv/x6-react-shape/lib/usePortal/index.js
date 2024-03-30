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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePortal = exports.createPortal = void 0;
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var x6_1 = require("@antv/x6");
var wrap_1 = require("../wrap");
var action = 'react';
function createPortal(uniqViewId) {
    var setGraphRef = { current: function () { } };
    var setGraph = function (graph) {
        setGraphRef.current(graph);
    };
    var add;
    var remove;
    function connect(id, portal) {
        add({ id: id, portal: portal });
    }
    function disconnect(id) {
        remove(id);
    }
    var Portal = function () {
        var _a = (0, react_1.useState)([]), items = _a[0], setItems = _a[1];
        var _b = (0, react_1.useState)(), graph = _b[0], setGraphInstance = _b[1];
        var pendingAddIdsRef = (0, react_1.useRef)([]);
        var pendingAddItemsRef = (0, react_1.useRef)([]);
        setGraphRef.current = setGraphInstance;
        var addItem = (0, react_1.useCallback)(function (payload) {
            var id = payload.id;
            if (pendingAddIdsRef.current.includes(id)) {
                // if in pendingAddIds queue
                var itms = pendingAddItemsRef.current;
                var matchIndex = itms.findIndex(function (item) { return item.id === id; });
                if (matchIndex > -1) {
                    itms[matchIndex] = payload;
                }
                else {
                    itms.push(payload);
                }
                pendingAddItemsRef.current = itms;
            }
            else {
                // if not in pendingAddIds queue
                setItems(function (prevItems) {
                    var nextItems = __spreadArray([], prevItems, true);
                    var matchIndex = nextItems.findIndex(function (item) { return item.id === id; });
                    if (matchIndex > -1) {
                        nextItems[matchIndex] = payload;
                    }
                    else {
                        nextItems.push(payload);
                    }
                    return nextItems;
                });
            }
        }, []);
        add = addItem;
        var removeItem = (0, react_1.useCallback)(function (id) {
            if (pendingAddIdsRef.current.includes(id)) {
                pendingAddIdsRef.current = pendingAddIdsRef.current.filter(function (cId) { return cId !== id; });
            }
            if (pendingAddItemsRef.current.map(function (c) { return c.id; }).includes(id)) {
                pendingAddItemsRef.current = pendingAddItemsRef.current.filter(function (c) { return c.id !== id; });
            }
            setItems(function (itms) { return itms.filter(function (item) { return item.id !== id; }); });
        }, []);
        remove = removeItem;
        var startBatch = (0, react_1.useCallback)(function (args) {
            var name = args.name, data = args.data;
            var _a = (data || {}).cells, cells = _a === void 0 ? [] : _a;
            if (name === 'add') {
                var cellIds = cells
                    .filter(function (cell) { return cell.isNode(); })
                    .map(function (cell) { return cell.id; });
                pendingAddIdsRef.current = Array.from(new Set(__spreadArray(__spreadArray([], pendingAddIdsRef.current, true), cellIds, true)));
            }
        }, []);
        var stopBatch = (0, react_1.useCallback)(function (_a) {
            var name = _a.name;
            if (name === 'add') {
                var pendingAdds_1 = pendingAddItemsRef.current;
                if (pendingAdds_1.length) {
                    var currentPendingAddIds_1 = pendingAdds_1.map(function (pendingAddItem) { return pendingAddItem.id; });
                    pendingAddIdsRef.current = pendingAddIdsRef.current.filter(function (id) { return !currentPendingAddIds_1.includes(id); });
                    pendingAddItemsRef.current = [];
                    setItems(function (prevItems) {
                        var nextItems = __spreadArray([], prevItems, true);
                        pendingAdds_1.forEach(function (pendingAddItem) {
                            var matchIndex = nextItems.findIndex(function (item) { return item.id === pendingAddItem.id; });
                            if (matchIndex > -1) {
                                nextItems[matchIndex] = pendingAddItem;
                            }
                            else {
                                nextItems.push(pendingAddItem);
                            }
                        });
                        return nextItems;
                    });
                }
            }
        }, []);
        (0, react_1.useLayoutEffect)(function () {
            if (graph) {
                graph.on('batch:start', startBatch);
                graph.on('batch:stop', stopBatch);
            }
            return function () {
                if (graph) {
                    graph.off('batch:start', startBatch);
                    graph.off('batch:stop', stopBatch);
                    setItems([]);
                    pendingAddIdsRef.current = [];
                    pendingAddItemsRef.current = [];
                }
            };
        }, [graph, startBatch, stopBatch]);
        return react_1.default.createElement.apply(react_1.default, __spreadArray([react_1.default.Fragment,
            null], items.map(function (item) { return item.portal; }), false));
    };
    var ReactShapeView = /** @class */ (function (_super) {
        __extends(ReactShapeView, _super);
        function ReactShapeView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReactShapeView.prototype.init = function () {
            var _this = this;
            _super.prototype.init.call(this);
            this.cell.on('removed', function () {
                disconnect(_this.cell.id);
            });
        };
        ReactShapeView.prototype.getComponentContainer = function () {
            return this.cell.prop('useForeignObject') === false
                ? this.selectors.content
                : this.selectors.foContent;
        };
        ReactShapeView.prototype.confirmUpdate = function (flag) {
            var _this = this;
            var ret = _super.prototype.confirmUpdate.call(this, flag);
            return this.handleAction(ret, action, function () { return _this.renderReactComponent(); });
        };
        ReactShapeView.prototype.renderReactComponent = function () {
            this.unmountReactComponent();
            var root = this.getComponentContainer();
            var node = this.cell;
            var graph = this.graph;
            if (root) {
                var component = this.graph.hook.getReactComponent(node);
                var elem = react_1.default.createElement(wrap_1.Wrap, { graph: graph, node: node, component: component });
                connect(this.cell.id, react_dom_1.default.createPortal(elem, root));
            }
        };
        ReactShapeView.prototype.unmountReactComponent = function () {
            var root = this.getComponentContainer();
            if (root) {
                react_dom_1.default.unmountComponentAtNode(root);
            }
            return root;
        };
        ReactShapeView.prototype.onMouseDown = function (e, x, y) {
            var target = e.target;
            var tagName = target.tagName.toLowerCase();
            if (tagName === 'input') {
                var type = target.getAttribute('type');
                if (type == null ||
                    [
                        'text',
                        'password',
                        'number',
                        'email',
                        'search',
                        'tel',
                        'url',
                    ].includes(type)) {
                    return;
                }
            }
            _super.prototype.onMouseDown.call(this, e, x, y);
        };
        ReactShapeView.prototype.dispose = function () {
            disconnect(this.cell.id);
            this.unmountReactComponent();
        };
        __decorate([
            x6_1.NodeView.dispose()
        ], ReactShapeView.prototype, "dispose", null);
        return ReactShapeView;
    }(x6_1.NodeView));
    ReactShapeView.config({
        bootstrap: [action],
        actions: {
            component: action,
        },
    });
    x6_1.NodeView.registry.register(uniqViewId, ReactShapeView, true);
    return { Portal: Portal, setGraph: setGraph };
}
exports.createPortal = createPortal;
function usePortal(uniqViewId) {
    var initializedRef = (0, react_1.useRef)(false);
    var PortalContainer = (0, react_1.useState)(function () {
        if (!initializedRef.current) {
            initializedRef.current = true;
            return createPortal(uniqViewId);
        }
        return {}; // won't be used
    })[0];
    return [PortalContainer.Portal, PortalContainer.setGraph];
}
exports.usePortal = usePortal;
//# sourceMappingURL=index.js.map