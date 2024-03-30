"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disposableSubscribe = void 0;
var disposable_1 = require("./disposable");
var disposableSubscribe = function (target, eventName, cb) {
    target.on(eventName, cb);
    return disposable_1.Disposable.create(function () {
        target.off(eventName, cb);
    });
};
exports.disposableSubscribe = disposableSubscribe;
//# sourceMappingURL=event-helper.js.map