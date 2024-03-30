"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.isResolved = true;
                resolve.apply(void 0, args);
            };
            _this.reject = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.isRejected = true;
                reject.apply(void 0, args);
            };
        });
    }
    return Deferred;
}());
exports.Deferred = Deferred;
//# sourceMappingURL=deferred.js.map