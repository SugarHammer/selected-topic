"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionRegistry = exports.useExtensionRegistry = exports.ExtensionRegistryContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var extension_registry_1 = require("./extension-registry");
Object.defineProperty(exports, "ExtensionRegistry", { enumerable: true, get: function () { return extension_registry_1.ExtensionRegistry; } });
/** 通过context收集extension的配置 */
exports.ExtensionRegistryContext = react_1.default.createContext({});
var useExtensionRegistry = function () {
    return react_1.default.useContext(exports.ExtensionRegistryContext);
};
exports.useExtensionRegistry = useExtensionRegistry;
//# sourceMappingURL=extension-context.js.map