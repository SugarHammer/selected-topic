"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandRegistryModule = exports.GraphCommandRegistry = exports.IGraphCommandFactory = exports.IGraphCommandContribution = exports.ICommandContextProvider = exports.IGraphCommandService = exports.ICommandHandler = void 0;
/** Command */
var graph_command_1 = require("./graph-command");
Object.defineProperty(exports, "GraphCommandRegistry", { enumerable: true, get: function () { return graph_command_1.GraphCommandRegistry; } });
var module_1 = require("./module");
Object.defineProperty(exports, "commandRegistryModule", { enumerable: true, get: function () { return module_1.commandRegistryModule; } });
var interface_1 = require("./interface");
Object.defineProperty(exports, "IGraphCommandContribution", { enumerable: true, get: function () { return interface_1.IGraphCommandContribution; } });
Object.defineProperty(exports, "ICommandHandler", { enumerable: true, get: function () { return interface_1.ICommandHandler; } });
Object.defineProperty(exports, "IGraphCommandService", { enumerable: true, get: function () { return interface_1.IGraphCommandService; } });
Object.defineProperty(exports, "IGraphCommandFactory", { enumerable: true, get: function () { return interface_1.IGraphCommandFactory; } });
Object.defineProperty(exports, "ICommandContextProvider", { enumerable: true, get: function () { return interface_1.ICommandContextProvider; } });
//# sourceMappingURL=index.js.map