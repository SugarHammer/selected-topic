"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxModel = exports.NsModel = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var disposable_1 = require("./disposable");
var immer_1 = require("immer");
var deferred_1 = require("./deferred");
// docs:https://immerjs.github.io/immer/map-set
(0, immer_1.enableMapSet)();
// https://immerjs.github.io/immer/freezing
(0, immer_1.setAutoFreeze)(false);
var NsModel;
(function (NsModel) {
    /**
     * observable 空值，当作model ready的变量
     * 空值不会触发subscrition
     */
    NsModel.EMPTY_VALUE = Symbol('EMPTY_MODEL_VALUE');
    /** 判断是否是空 */
    function isValidValue(val) {
        return val !== NsModel.EMPTY_VALUE;
    }
    NsModel.isValidValue = isValidValue;
    /** 默认的对事件性能优化方法：只在value不同时才触发，同时增加throttle */
    function defaultPipeFunction(observable) {
        return observable.pipe((0, operators_1.distinctUntilChanged)(), (0, operators_1.filter)(function (item) { return isValidValue(item); }), (0, operators_1.throttleTime)(17, rxjs_1.asyncScheduler, { leading: false, trailing: true }));
    }
    NsModel.defaultPipeFunction = defaultPipeFunction;
})(NsModel = exports.NsModel || (exports.NsModel = {}));
var RxModel = /** @class */ (function () {
    /** 初始化 */
    function RxModel(initialValue, maxSubscription) {
        if (initialValue === void 0) { initialValue = NsModel.EMPTY_VALUE; }
        if (maxSubscription === void 0) { maxSubscription = 30; }
        var _this = this;
        /** disposable */
        this.toDispose = new disposable_1.DisposableCollection();
        /** 监听model变化 */
        this.watch = function (cb, pipeFunction) {
            if (pipeFunction === void 0) { pipeFunction = NsModel.defaultPipeFunction; }
            if (_this.subject$.observers.length + 1 > _this.maxSubscription) {
                console.warn("".concat(_this.subject$, " reach maxSubscription limitation, please check"));
            }
            var observable = pipeFunction ? pipeFunction(_this.subject$) : _this.subject$;
            var subscription = observable.subscribe(cb);
            return disposable_1.Disposable.create(function () {
                subscription.unsubscribe();
            });
        };
        /** 获取model的值 */
        this.getValue = function () {
            return _this.subject$.getValue();
        };
        /** 更新model */
        this.setValue = function (value) {
            if (!_this.subject$) {
                return;
            }
            if (typeof value === 'function') {
                var currentValue = _this.subject$.getValue();
                var nextState = (0, immer_1.produce)(currentValue, function (draft) {
                    value(draft);
                });
                if (NsModel.isValidValue(nextState)) {
                    _this.setValue(nextState);
                }
                return;
            }
            _this.subject$.next(value);
        };
        /** 是否已有值 */
        this.hasValidValue = function () {
            var value = _this.getValue();
            return NsModel.isValidValue(value);
        };
        /** 获取非空的值 */
        this.getValidValue = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var deffer, d;
            return tslib_1.__generator(this, function (_a) {
                deffer = new deferred_1.Deferred();
                /** 返回非空的值 */
                if (this.hasValidValue()) {
                    return [2 /*return*/, this.getValue()];
                }
                d = this.watch(function (val) {
                    if (NsModel.isValidValue(val)) {
                        deffer.resolve(val);
                        d.dispose();
                    }
                });
                return [2 /*return*/, deffer.promise];
            });
        }); };
        /** disposable */
        this.dispose = function () {
            _this.toDispose.dispose();
        };
        this.subject$ = new rxjs_1.BehaviorSubject(initialValue || NsModel.EMPTY_VALUE);
        this.maxSubscription = maxSubscription;
        this.toDispose.push(disposable_1.Disposable.create(function () {
            _this.subject$.complete();
            _this.subject$.unsubscribe();
            // @ts-ignore
            _this.subject$ = null;
        }));
    }
    return RxModel;
}());
exports.RxModel = RxModel;
//# sourceMappingURL=rx-model.js.map