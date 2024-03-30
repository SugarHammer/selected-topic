"use strict";
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
exports.appendUtils = void 0;
var util_1 = require("../util");
var appendUtils = function (graph, app) {
    var x6Graph = graph;
    /** 更新节点指定数据
     * @param {id} string 节点 id
     * @param {key} string 需要更新的字段
     * @param {data} object 更新内容
     */
    var updateNodeKeyById = function (id, key, data) {
        var currentNode = x6Graph.getCellById(id);
        if (currentNode) {
            x6Graph.getCellById(id).prop(key, __assign(__assign({}, currentNode[key]), data));
        }
    };
    x6Graph.updateNodeKeyById = updateNodeKeyById;
    x6Graph.getGraphData = util_1.getGraphData;
    x6Graph.loadData = function (data) {
        (0, util_1.excLoadData)(app, data);
    };
    return x6Graph;
};
exports.appendUtils = appendUtils;
