"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGroupRender = void 0;
var group_1 = require("./group");
var constants_1 = require("../constants");
var setGroupRender = function (config) {
    config.setNodeRender(constants_1.GROUP_NODE_RENDER_ID, group_1.GroupNode);
};
exports.setGroupRender = setGroupRender;
//# sourceMappingURL=index.js.map