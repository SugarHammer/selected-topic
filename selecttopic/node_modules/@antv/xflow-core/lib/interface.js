"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsGraph = void 0;
/**
 * XFlow画布数据
 */
var NsGraph;
(function (NsGraph) {
    /** 节点锚点位置：上/下/左/右 */
    var AnchorGroup;
    (function (AnchorGroup) {
        AnchorGroup["TOP"] = "top";
        AnchorGroup["BOTTOM"] = "bottom";
        AnchorGroup["RIGHT"] = "right";
        AnchorGroup["LEFT"] = "left";
    })(AnchorGroup = NsGraph.AnchorGroup || (NsGraph.AnchorGroup = {}));
    /** 锚点类型： 输入/输出 */
    var AnchorType;
    (function (AnchorType) {
        AnchorType["INPUT"] = "input";
        AnchorType["OUTPUT"] = "output";
    })(AnchorType = NsGraph.AnchorType || (NsGraph.AnchorType = {}));
})(NsGraph = exports.NsGraph || (exports.NsGraph = {}));
//# sourceMappingURL=interface.js.map