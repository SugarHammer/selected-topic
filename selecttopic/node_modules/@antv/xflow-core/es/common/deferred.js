export class Deferred {
    constructor() {
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (...args) => {
                this.isResolved = true;
                resolve(...args);
            };
            this.reject = (...args) => {
                this.isRejected = true;
                reject(...args);
            };
        });
    }
}
//# sourceMappingURL=deferred.js.map