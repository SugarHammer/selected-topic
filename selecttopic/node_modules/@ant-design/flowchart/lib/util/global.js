"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = exports.getProps = exports.getAppInstance = exports.getGraphInstance = exports.setInstance = exports.setProps = exports.globalProps = void 0;
exports.globalProps = {};
/** 设置全局状态 */
var setProps = function (props, flowchartId, container) {
    exports.globalProps[flowchartId] = {
        config: props,
        container: container,
    };
};
exports.setProps = setProps;
var graphInstance = new Map();
var appInstance = new Map();
var setInstance = function (x6graph, app, flowchartId) {
    graphInstance.set("".concat(flowchartId, "-x6graph"), x6graph);
    appInstance.set("".concat(flowchartId, "-app"), app);
};
exports.setInstance = setInstance;
var getGraphInstance = function (flowchartId) {
    return graphInstance.get("".concat(flowchartId, "-x6graph"));
};
exports.getGraphInstance = getGraphInstance;
var getAppInstance = function (flowchartId) {
    return appInstance.get("".concat(flowchartId, "-app"));
};
exports.getAppInstance = getAppInstance;
/** 获取全局状态 */
var getProps = function (flowchartId, key) {
    var _a, _b;
    return (_b = (_a = exports.globalProps[flowchartId]) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b[key];
};
exports.getProps = getProps;
var getContainer = function (flowchartId, type) {
    var _a, _b;
    if (type === void 0) { type = 'container'; }
    return (_b = (_a = exports.globalProps[flowchartId]) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.current;
};
exports.getContainer = getContainer;
