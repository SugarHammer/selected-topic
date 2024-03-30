export declare class Deferred<T> {
    isResolved: boolean;
    isRejected: boolean;
    resolve: (value?: T) => void;
    reject: (err?: any) => void;
    promise: Promise<T>;
    constructor();
}
