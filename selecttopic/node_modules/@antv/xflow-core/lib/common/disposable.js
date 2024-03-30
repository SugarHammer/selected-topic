"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposableCollection = exports.Disposable = void 0;
var tslib_1 = require("tslib");
var mana_common_1 = require("mana-common");
var Disposable;
(function (Disposable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function is(arg) {
        return !!arg && typeof arg === 'object' && 'dispose' in arg && typeof arg.dispose === 'function';
    }
    Disposable.is = is;
    function create(func) {
        return {
            dispose: func,
        };
    }
    Disposable.create = create;
    Disposable.NULL = create(function () { });
})(Disposable = exports.Disposable || (exports.Disposable = {}));
var DisposableCollection = /** @class */ (function () {
    function DisposableCollection() {
        var toDispose = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            toDispose[_i] = arguments[_i];
        }
        var _this = this;
        this.disposables = [];
        this.onDisposeEmitter = new mana_common_1.Emitter();
        this.disposingElements = false;
        toDispose.forEach(function (d) { return _this.push(d); });
    }
    Object.defineProperty(DisposableCollection.prototype, "onDispose", {
        /**
         * This event is fired only once
         * on first dispose of not empty collection.
         */
        get: function () {
            return this.onDisposeEmitter.event;
        },
        enumerable: false,
        configurable: true
    });
    DisposableCollection.prototype.checkDisposed = function () {
        if (this.disposed && !this.disposingElements) {
            this.onDisposeEmitter.fire(undefined);
            this.onDisposeEmitter.dispose();
        }
    };
    Object.defineProperty(DisposableCollection.prototype, "disposed", {
        get: function () {
            return this.disposables.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    DisposableCollection.prototype.dispose = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var d, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.disposed || this.disposingElements) {
                            return [2 /*return*/];
                        }
                        this.disposingElements = true;
                        _a.label = 1;
                    case 1:
                        if (!!this.disposed) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        d = this.disposables.pop();
                        return [4 /*yield*/, d.dispose()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        this.disposingElements = false;
                        this.checkDisposed();
                        return [2 /*return*/];
                }
            });
        });
    };
    DisposableCollection.prototype.push = function (disposable) {
        var _this = this;
        var disposables = this.disposables;
        disposables.push(disposable);
        var originalDispose = disposable.dispose.bind(disposable);
        var toRemove = Disposable.create(function () {
            var index = disposables.indexOf(disposable);
            if (index !== -1) {
                disposables.splice(index, 1);
            }
            _this.checkDisposed();
        });
        disposable.dispose = function () {
            toRemove.dispose();
            originalDispose();
        };
        return toRemove;
    };
    DisposableCollection.prototype.pushAll = function (disposables) {
        var _this = this;
        return disposables.map(function (disposable) { return _this.push(disposable); });
    };
    return DisposableCollection;
}());
exports.DisposableCollection = DisposableCollection;
//# sourceMappingURL=disposable.js.map