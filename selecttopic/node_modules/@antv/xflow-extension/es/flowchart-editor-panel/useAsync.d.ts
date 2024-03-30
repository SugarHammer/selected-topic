export declare type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
export declare type FunctionReturningPromise = (...args: any[]) => Promise<any>;
export default function useAsync<T extends FunctionReturningPromise>(fn: T): {
    loading: boolean;
    data?: unknown;
};
