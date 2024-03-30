"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
// yield delay(1000)
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(true); }, ms); });
}
exports.delay = delay;
//# sourceMappingURL=delay.js.map