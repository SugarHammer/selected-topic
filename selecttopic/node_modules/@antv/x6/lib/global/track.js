"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var version_1 = require("./version");
function track() {
    if (config_1.Config.trackable) {
        var host = 'https://kcart.alipay.com/web/bi.do';
        var img = new Image();
        var metadata = __assign(__assign({}, config_1.Config.trackInfo), { version: version_1.version, pg: document.URL, r: new Date().getTime(), x6: true, page_type: 'syslog' });
        var data = encodeURIComponent(JSON.stringify([metadata]));
        img.src = host + "?BIProfile=merge&d=" + data;
    }
}
if (process.env.NODE_ENV !== 'development' && config_1.Config.trackable) {
    setTimeout(track, 3000);
}
//# sourceMappingURL=track.js.map