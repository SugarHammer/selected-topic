"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorPrefix = void 0;
var executionEnvironment_1 = require("./executionEnvironment");
var memoized = {};
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var testStyle = executionEnvironment_1.canUseDOM ? document.createElement('div').style : {};
var hyphenPattern = /-(.)/g;
function camelize(str) {
    return str.replace(hyphenPattern, function (_, char) { return char.toUpperCase(); });
}
function getWithPrefix(name) {
    for (var i = 0; i < prefixes.length; i += 1) {
        var prefixedName = prefixes[i] + name;
        if (prefixedName in testStyle) {
            return prefixedName;
        }
    }
    return null;
}
function getVendorPrefix(property) {
    var name = camelize(property);
    if (memoized[name] === undefined) {
        var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
    }
    return memoized[name];
}
exports.getVendorPrefix = getVendorPrefix;
//# sourceMappingURL=getVendorPrefix.js.map