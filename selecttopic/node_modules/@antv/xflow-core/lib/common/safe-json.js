"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJson = void 0;
// safe json
function safeJson(jsonStr, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    try {
        var obj = JSON.parse(jsonStr);
        return obj || defaultValue;
    }
    catch (error) {
        console.error(error);
        return defaultValue;
    }
}
exports.safeJson = safeJson;
//# sourceMappingURL=safe-json.js.map