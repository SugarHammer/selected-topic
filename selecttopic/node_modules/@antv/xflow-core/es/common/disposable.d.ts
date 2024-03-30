import { Emitter } from 'mana-common';
export interface Disposable {
    /**
     * Dispose this object.
     */
    dispose: () => void;
}
export declare namespace Disposable {
    function is(arg: any): arg is Disposable;
    function create(func: () => void): Disposable;
    const NULL: Disposable;
}
export declare class DisposableCollection implements Disposable {
    protected readonly disposables: Disposable[];
    protected readonly onDisposeEmitter: Emitter<void>;
    constructor(...toDispose: Disposable[]);
    /**
     * This event is fired only once
     * on first dispose of not empty collection.
     */
    get onDispose(): import("mana-common").Event<void>;
    protected checkDisposed(): void;
    get disposed(): boolean;
    private disposingElements;
    dispose(): Promise<void>;
    push(disposable: Disposable): Disposable;
    pushAll(disposables: Disposable[]): Disposable[];
}
