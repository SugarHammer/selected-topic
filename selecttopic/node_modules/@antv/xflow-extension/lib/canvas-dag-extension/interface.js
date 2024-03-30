"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IComponentConfig = exports.LayoutEnum = void 0;
var xflow_core_1 = require("@antv/xflow-core");
/** 画布布局 */
var LayoutEnum;
(function (LayoutEnum) {
    LayoutEnum["TOP_BOTTOM"] = "TB";
    LayoutEnum["LEFT_RIGHT"] = "LR";
})(LayoutEnum = exports.LayoutEnum || (exports.LayoutEnum = {}));
/** Props Config */
exports.IComponentConfig = xflow_core_1.ManaSyringe.Syringe.defineToken('DAG_EXTENSION_CONFIG');
//# sourceMappingURL=interface.js.map