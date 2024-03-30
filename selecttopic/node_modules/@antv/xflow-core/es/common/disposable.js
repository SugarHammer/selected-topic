import { __awaiter } from "tslib";
import { Emitter } from 'mana-common';
export var Disposable;
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
    Disposable.NULL = create(() => { });
})(Disposable || (Disposable = {}));
export class DisposableCollection {
    constructor(...toDispose) {
        this.disposables = [];
        this.onDisposeEmitter = new Emitter();
        this.disposingElements = false;
        toDispose.forEach(d => this.push(d));
    }
    /**
     * This event is fired only once
     * on first dispose of not empty collection.
     */
    get onDispose() {
        return this.onDisposeEmitter.event;
    }
    checkDisposed() {
        if (this.disposed && !this.disposingElements) {
            this.onDisposeEmitter.fire(undefined);
            this.onDisposeEmitter.dispose();
        }
    }
    get disposed() {
        return this.disposables.length === 0;
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.disposed || this.disposingElements) {
                return;
            }
            this.disposingElements = true;
            while (!this.disposed) {
                try {
                    const d = this.disposables.pop();
                    yield d.dispose();
                }
                catch (e) {
                    console.error(e);
                }
            }
            this.disposingElements = false;
            this.checkDisposed();
        });
    }
    push(disposable) {
        const { disposables } = this;
        disposables.push(disposable);
        const originalDispose = disposable.dispose.bind(disposable);
        const toRemove = Disposable.create(() => {
            const index = disposables.indexOf(disposable);
            if (index !== -1) {
                disposables.splice(index, 1);
            }
            this.checkDisposed();
        });
        disposable.dispose = () => {
            toRemove.dispose();
            originalDispose();
        };
        return toRemove;
    }
    pushAll(disposables) {
        return disposables.map(disposable => this.push(disposable));
    }
}
//# sourceMappingURL=disposable.js.map