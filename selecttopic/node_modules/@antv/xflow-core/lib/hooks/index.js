"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHookConfig = exports.IHookContribution = exports.IHookService = exports.HookRegistry = exports.HookConfig = void 0;
var interface_1 = require("./interface");
Object.defineProperty(exports, "IHookService", { enumerable: true, get: function () { return interface_1.IHookService; } });
Object.defineProperty(exports, "IHookContribution", { enumerable: true, get: function () { return interface_1.IHookContribution; } });
var components_1 = require("./components");
Object.defineProperty(exports, "createHookConfig", { enumerable: true, get: function () { return components_1.createHookConfig; } });
Object.defineProperty(exports, "HookRegistry", { enumerable: true, get: function () { return components_1.HookRegistry; } });
var config_1 = require("./config");
Object.defineProperty(exports, "HookConfig", { enumerable: true, get: function () { return config_1.HookConfig; } });
//# sourceMappingURL=index.js.map