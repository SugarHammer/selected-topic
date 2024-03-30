import type { Observable } from 'rxjs';
import { Disposable } from './disposable';
import type { Draft } from 'immer';
export declare namespace NsModel {
    /** model的类型 */
    interface IModel<T> {
        /** 传入一个回调函数来订阅model的变化 */
        watch: IWatch<T>;
        /** 更新model: 支持传值或者传入更新函数 */
        setValue: ISetValue<T>;
        /** 获取model的值 */
        getValue: () => T | EmptyType;
        /** 是否有非空的值 */
        hasValidValue: () => boolean;
        /** 通过Promise获取一个非空值 */
        getValidValue: () => Promise<T>;
    }
    /** 更新model的方法 */
    interface ISetValue<T> {
        /** 直接设置一个新的值 */
        (value: T): void;
        /** 通过函数的参数获取state，并通过immer的方式来更新这个state */
        (producer: (s: Draft<T>) => void): void;
    }
    /** 订阅model的方法 */
    interface IWatch<T> {
        (
        /** onChange时会执行的回调 */
        cb: (value: T) => void, 
        /** 可以对事件流进行的处理 */
        pipeFunction?: (observable: Observable<T | EmptyType>) => Observable<T>): Disposable;
    }
    /**
     * observable 空值，当作model ready的变量
     * 空值不会触发subscrition
     */
    const EMPTY_VALUE: unique symbol;
    /** Empty Value 类型 */
    type EmptyType = typeof EMPTY_VALUE;
    /** 判断是否是空 */
    function isValidValue<T>(val: unknown): val is T;
    /** 默认的对事件性能优化方法：只在value不同时才触发，同时增加throttle */
    function defaultPipeFunction<T>(observable: Observable<T | EmptyType>): Observable<T>;
}
export declare class RxModel<T = any> implements NsModel.IModel<T> {
    /** 储存类型 */
    private subject$;
    /** 最大监听数量 */
    private maxSubscription;
    /** disposable */
    private toDispose;
    /** 初始化 */
    constructor(initialValue?: T | NsModel.EmptyType, maxSubscription?: number);
    /** 监听model变化 */
    watch: NsModel.IWatch<T>;
    /** 获取model的值 */
    getValue: () => typeof NsModel.EMPTY_VALUE | T;
    /** 更新model */
    setValue: NsModel.ISetValue<T>;
    /** 是否已有值 */
    hasValidValue: () => boolean;
    /** 获取非空的值 */
    getValidValue: () => Promise<T>;
    /** disposable */
    dispose: () => void;
}
