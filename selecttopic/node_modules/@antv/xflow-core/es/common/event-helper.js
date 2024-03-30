import { Disposable } from './disposable';
export const disposableSubscribe = (target, eventName, cb) => {
    target.on(eventName, cb);
    return Disposable.create(() => {
        target.off(eventName, cb);
    });
};
//# sourceMappingURL=event-helper.js.map