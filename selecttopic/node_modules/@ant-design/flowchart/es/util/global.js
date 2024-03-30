export var globalProps = {};
/** 设置全局状态 */
export var setProps = function (props, flowchartId, container) {
    globalProps[flowchartId] = {
        config: props,
        container: container,
    };
};
var graphInstance = new Map();
var appInstance = new Map();
export var setInstance = function (x6graph, app, flowchartId) {
    graphInstance.set("".concat(flowchartId, "-x6graph"), x6graph);
    appInstance.set("".concat(flowchartId, "-app"), app);
};
export var getGraphInstance = function (flowchartId) {
    return graphInstance.get("".concat(flowchartId, "-x6graph"));
};
export var getAppInstance = function (flowchartId) {
    return appInstance.get("".concat(flowchartId, "-app"));
};
/** 获取全局状态 */
export var getProps = function (flowchartId, key) {
    var _a, _b;
    return (_b = (_a = globalProps[flowchartId]) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b[key];
};
export var getContainer = function (flowchartId, type) {
    var _a, _b;
    if (type === void 0) { type = 'container'; }
    return (_b = (_a = globalProps[flowchartId]) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.current;
};
