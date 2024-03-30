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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getProps, getGraphInstance, getAppInstance } from './global';
import { XFlowGraphCommands } from '@antv/xflow';
export var Log = window.console;
export var getGraphData = function (flowchartId) { return __awaiter(void 0, void 0, void 0, function () {
    var app, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = getAppInstance(flowchartId);
                return [4 /*yield*/, app.executeCommand(XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
                        saveGraphDataService: function (graphMeta, graphData) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                data = graphData;
                                return [2 /*return*/];
                            });
                        }); },
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
export var excLoadData = function (app, data) { return __awaiter(void 0, void 0, void 0, function () {
    var res, graphData;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!((_a = data === null || data === void 0 ? void 0 : data.nodes) === null || _a === void 0 ? void 0 : _a.length)) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, app.executeCommand(XFlowGraphCommands.LOAD_DATA.id, {
                        loadDataService: function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, data];
                            });
                        }); },
                    })];
            case 1:
                res = _c.sent();
                graphData = ((_b = res === null || res === void 0 ? void 0 : res.contextProvider()) === null || _b === void 0 ? void 0 : _b.getResult()).graphData;
                /** 3. 画布内容渲染 */
                return [4 /*yield*/, app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
                        graphData: graphData,
                    })];
            case 2:
                /** 3. 画布内容渲染 */
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getFlowchartId = function (e) {
    var _a, _b, _c;
    var currentNode = (_a = e === null || e === void 0 ? void 0 : e.e) === null || _a === void 0 ? void 0 : _a.currentTarget;
    if (!currentNode) {
        return (_b = document.getElementsByClassName('xflow-canvas-container')[0]) === null || _b === void 0 ? void 0 : _b.getAttribute('data-flowchart-id');
    }
    var containter = null;
    while (!containter) {
        var current = currentNode.getElementsByClassName('xflow-canvas-container');
        if ((current === null || current === void 0 ? void 0 : current.length) > 0) {
            containter = current;
        }
        currentNode = currentNode.parentNode;
    }
    return (_c = containter[0]) === null || _c === void 0 ? void 0 : _c.getAttribute('data-flowchart-id');
};
/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
export var debounce = function (func, delay, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var that = this;
        if (immediate) {
            func.apply(that, args);
            immediate = false;
            return;
        }
        clearTimeout(timer);
        timer = window.setTimeout(function () {
            func.apply(that, args);
        }, delay);
    };
};
export var getGraphHistory = function (flowchartId) {
    return getGraphInstance(flowchartId).history;
};
/** 更新配置时通知上传执行保存 */
export var onConfigChange = debounce(function (config, flowchartId) {
    var configChange = getProps(flowchartId, 'onConfigChange');
    if (!configChange || typeof configChange !== 'function') {
        return;
    }
    return configChange(__assign({ data: getGraphData(flowchartId) }, config));
}, 300, true);
