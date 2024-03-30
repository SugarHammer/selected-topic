/**
 * XFlow画布数据
 */
export var NsGraph;
(function (NsGraph) {
    /** 节点锚点位置：上/下/左/右 */
    let AnchorGroup;
    (function (AnchorGroup) {
        AnchorGroup["TOP"] = "top";
        AnchorGroup["BOTTOM"] = "bottom";
        AnchorGroup["RIGHT"] = "right";
        AnchorGroup["LEFT"] = "left";
    })(AnchorGroup = NsGraph.AnchorGroup || (NsGraph.AnchorGroup = {}));
    /** 锚点类型： 输入/输出 */
    let AnchorType;
    (function (AnchorType) {
        AnchorType["INPUT"] = "input";
        AnchorType["OUTPUT"] = "output";
    })(AnchorType = NsGraph.AnchorType || (NsGraph.AnchorType = {}));
})(NsGraph || (NsGraph = {}));
//# sourceMappingURL=interface.js.map