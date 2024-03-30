import { Disposable } from './disposable';
interface Target {
    on: (e: any, cb: Function) => void;
    off: (e: any, cb: Function) => void;
}
export declare const disposableSubscribe: (target: Target, eventName: string, cb: Function) => Disposable;
export {};
