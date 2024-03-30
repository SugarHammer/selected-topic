// safe json
export function safeJson(jsonStr, defaultValue = null) {
    try {
        const obj = JSON.parse(jsonStr);
        return obj || defaultValue;
    }
    catch (error) {
        console.error(error);
        return defaultValue;
    }
}
//# sourceMappingURL=safe-json.js.map