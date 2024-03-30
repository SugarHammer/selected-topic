import { __awaiter } from "tslib";
import { BehaviorSubject, asyncScheduler } from 'rxjs';
import { throttleTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { Disposable, DisposableCollection } from './disposable';
import { produce, setAutoFreeze, enableMapSet } from 'immer';
import { Deferred } from './deferred';
// docs:https://immerjs.github.io/immer/map-set
enableMapSet();
// https://immerjs.github.io/immer/freezing
setAutoFreeze(false);
export var NsModel;
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
        return observable.pipe(distinctUntilChanged(), filter(item => isValidValue(item)), throttleTime(17, asyncScheduler, { leading: false, trailing: true }));
    }
    NsModel.defaultPipeFunction = defaultPipeFunction;
})(NsModel || (NsModel = {}));
export class RxModel {
    /** 初始化 */
    constructor(initialValue = NsModel.EMPTY_VALUE, maxSubscription = 30) {
        /** disposable */
        this.toDispose = new DisposableCollection();
        /** 监听model变化 */
        this.watch = (cb, pipeFunction = NsModel.defaultPipeFunction) => {
            if (this.subject$.observers.length + 1 > this.maxSubscription) {
                console.warn(`${this.subject$} reach maxSubscription limitation, please check`);
            }
            const observable = pipeFunction ? pipeFunction(this.subject$) : this.subject$;
            const subscription = observable.subscribe(cb);
            return Disposable.create(() => {
                subscription.unsubscribe();
            });
        };
        /** 获取model的值 */
        this.getValue = () => {
            return this.subject$.getValue();
        };
        /** 更新model */
        this.setValue = value => {
            if (!this.subject$) {
                return;
            }
            if (typeof value === 'function') {
                const currentValue = this.subject$.getValue();
                const nextState = produce(currentValue, draft => {
                    value(draft);
                });
                if (NsModel.isValidValue(nextState)) {
                    this.setValue(nextState);
                }
                return;
            }
            this.subject$.next(value);
        };
        /** 是否已有值 */
        this.hasValidValue = () => {
            const value = this.getValue();
            return NsModel.isValidValue(value);
        };
        /** 获取非空的值 */
        this.getValidValue = () => __awaiter(this, void 0, void 0, function* () {
            const deffer = new Deferred();
            /** 返回非空的值 */
            if (this.hasValidValue()) {
                return this.getValue();
            }
            /** 返回会resolve非空值的Promise */
            const d = this.watch(val => {
                if (NsModel.isValidValue(val)) {
                    deffer.resolve(val);
                    d.dispose();
                }
            });
            return deffer.promise;
        });
        /** disposable */
        this.dispose = () => {
            this.toDispose.dispose();
        };
        this.subject$ = new BehaviorSubject(initialValue || NsModel.EMPTY_VALUE);
        this.maxSubscription = maxSubscription;
        this.toDispose.push(Disposable.create(() => {
            this.subject$.complete();
            this.subject$.unsubscribe();
            // @ts-ignore
            this.subject$ = null;
        }));
    }
}
//# sourceMappingURL=rx-model.js.map