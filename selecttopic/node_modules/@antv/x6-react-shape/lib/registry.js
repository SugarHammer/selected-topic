"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = void 0;
var x6_1 = require("@antv/x6");
exports.registry = x6_1.Registry.create({
    type: 'react componnet',
});
x6_1.Graph.registerReactComponent = exports.registry.register;
x6_1.Graph.unregisterReactComponent = exports.registry.unregister;
//# sourceMappingURL=registry.js.map