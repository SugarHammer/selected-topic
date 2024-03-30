"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConfigChange = exports.getGraphData = exports.getAppInstance = exports.getGraphInstance = exports.setInstance = exports.getProps = exports.setProps = exports.globalProps = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
// 解决配置共享问题
exports.globalProps = {
    config: {},
};
var setProps = function (props) {
    exports.globalProps.config = Object.assign({}, exports.globalProps.config, props);
};
exports.setProps = setProps;
var getProps = function (key) {
    var _a;
    return (_a = exports.globalProps.config) === null || _a === void 0 ? void 0 : _a[key];
};
exports.getProps = getProps;
var graphInstance = new Map();
var appInstance = new Map();
var setInstance = function (app) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var x6graph;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.getGraphInstance()];
            case 1:
                x6graph = _a.sent();
                graphInstance.set('x6graph', x6graph);
                appInstance.set('app', app);
                return [2 /*return*/];
        }
    });
}); };
exports.setInstance = setInstance;
var getGraphInstance = function () {
    return graphInstance.get('x6graph');
};
exports.getGraphInstance = getGraphInstance;
var getAppInstance = function () {
    return appInstance.get('app');
};
exports.getAppInstance = getAppInstance;
var getGraphData = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var app;
    return tslib_1.__generator(this, function (_a) {
        app = (0, exports.getAppInstance)();
        return [2 /*return*/, app.getGraphData()];
    });
}); };
exports.getGraphData = getGraphData;
/** 更新配置时通知上传执行保存 */
exports.onConfigChange = (0, lodash_1.debounce)(function (config) {
    var configChange = (0, exports.getProps)('onConfigChange');
    if (!configChange || typeof configChange !== 'function') {
        return;
    }
    return configChange(tslib_1.__assign({ data: (0, exports.getGraphData)() }, config));
}, 300, {
    trailing: true,
});
//# sourceMappingURL=util.js.map