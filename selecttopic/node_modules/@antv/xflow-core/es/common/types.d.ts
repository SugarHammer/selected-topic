export declare type MaybeArray<T> = T | T[];
export declare type MaybePromise<T> = T | PromiseLike<T>;
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer I)[] ? RecursivePartial<I>[] : RecursivePartial<T[P]>;
};
export declare type Simplify<T> = Pick<T, keyof T>;
export declare type Newable<T> = new (...args: any[]) => T;
export declare type ClassOf<T> = Newable<T>;
export declare type Abstract<T> = {
    prototype: T;
};
export declare type Token<T> = string | symbol | Newable<T> | Abstract<T>;
