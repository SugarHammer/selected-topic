"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
var react_1 = __importStar(require("react"));
var Portal;
(function (Portal) {
    var active = false;
    var dispatch;
    var reducer = function (state, action) {
        var payload = action.payload;
        switch (action.type) {
            case 'add': {
                var index = state.findIndex(function (item) { return item.id === payload.id; });
                if (index >= 0) {
                    state[index] = payload;
                    return __spreadArray([], state, true);
                }
                return __spreadArray(__spreadArray([], state, true), [payload], false);
            }
            case 'remove': {
                var index = state.findIndex(function (item) { return item.id === payload.id; });
                if (index >= 0) {
                    var result = __spreadArray([], state, true);
                    result.splice(index, 1);
                    return result;
                }
                break;
            }
            default: {
                break;
            }
        }
        return state;
    };
    function connect(id, portal) {
        if (active) {
            dispatch({ type: 'add', payload: { id: id, portal: portal } });
        }
    }
    Portal.connect = connect;
    function disconnect(id) {
        if (active) {
            dispatch({ type: 'remove', payload: { id: id } });
        }
    }
    Portal.disconnect = disconnect;
    function isActive() {
        return active;
    }
    Portal.isActive = isActive;
    function getProvider() {
        // eslint-disable-next-line react/display-name
        return function () {
            active = true;
            var _a = (0, react_1.useReducer)(reducer, []), items = _a[0], mutate = _a[1];
            dispatch = mutate;
            // eslint-disable-next-line react/no-children-prop
            return react_1.default.createElement(react_1.default.Fragment, {
                children: items.map(function (item) { return item.portal; }),
            });
        };
    }
    Portal.getProvider = getProvider;
})(Portal = exports.Portal || (exports.Portal = {}));
//# sourceMappingURL=portal.js.map