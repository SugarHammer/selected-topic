import { __awaiter } from "tslib";
import { HookUtils, ErrorUtils, Deferred } from './utils';
describe('sort utils', () => {
    test('it should sort hooks when use IHook after attributes', () => {
        const mockHandler = () => __awaiter(void 0, void 0, void 0, function* () { });
        const hook1 = { name: 'hook1', handler: mockHandler, after: 'hook2' };
        const hook2 = { name: 'hook2', handler: mockHandler, after: 'hook3' };
        const hook3 = { name: 'hook3', handler: mockHandler, after: 'hook4' };
        const hook4 = { name: 'hook4', handler: mockHandler, after: 'hook5' };
        const hook5 = { name: 'hook5', handler: mockHandler };
        const hooks = [hook1, hook2, hook3, hook4, hook5];
        const hookMap = new Map();
        hookMap.set('hook1', hook1);
        hookMap.set('hook2', hook2);
        hookMap.set('hook3', hook3);
        hookMap.set('hook4', hook4);
        hookMap.set('hook5', hook5);
        expect(HookUtils.sort(hooks, hookMap)).toEqual([hook5, hook4, hook3, hook2, hook1]);
    });
    test('it should sort hooks when use IHook before attributes', () => {
        const mockHandler = () => __awaiter(void 0, void 0, void 0, function* () { });
        const hook1 = { name: 'hook1', handler: mockHandler };
        const hook2 = { name: 'hook2', handler: mockHandler, before: 'hook1' };
        const hook3 = { name: 'hook3', handler: mockHandler, before: 'hook2' };
        const hook4 = { name: 'hook4', handler: mockHandler, before: 'hook3' };
        const hook5 = { name: 'hook5', handler: mockHandler, before: 'hook4' };
        const hooks = [hook1, hook2, hook3, hook4, hook5];
        const hookMap = new Map();
        hookMap.set('hook1', hook1);
        hookMap.set('hook2', hook2);
        hookMap.set('hook3', hook3);
        hookMap.set('hook4', hook4);
        hookMap.set('hook5', hook5);
        expect(HookUtils.sort(hooks, hookMap)).toEqual([hook5, hook4, hook3, hook2, hook1]);
    });
});
describe('err utils test', () => {
    test('it can create error with context', () => {
        // given
        const code = 'MY ERROR';
        const message = 'error message string';
        const context = { a: 1, b: 2 };
        // when
        const err = new ErrorUtils.HookError(code, message, context);
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('MY ERROR: error message string');
        expect(err.contexts.a).toEqual(1);
        expect(err.contexts.b).toEqual(2);
    });
    test('it can create hook argument error', () => {
        // given
        const mockHandler = () => __awaiter(void 0, void 0, void 0, function* () { });
        const hook1 = { name: 'hook1', handler: mockHandler };
        // when
        const err = ErrorUtils.InvalidHookArguments(hook1);
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_ARGS_LENGTH: hook handlers must have 0 to 2 arguments but got 0');
    });
    test('it can create hook argument error', () => {
        // given & when
        const err = ErrorUtils.HookBeforeError();
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_BEFORE: hook require a before dependency but not exist in hookmap');
    });
    test('it can create hook argument error', () => {
        // given & when
        const err = ErrorUtils.HookAfterError();
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_AFTER: hook require a after dependency but not exist in hookmap');
    });
});
describe('Deferred utils', () => {
    test('Deferred should resolve value async', () => __awaiter(void 0, void 0, void 0, function* () {
        // given
        const booleanDefer = new Deferred();
        // when
        setTimeout(() => {
            booleanDefer.resolve('successs');
        }, 0);
        const value = yield booleanDefer.promise;
        // then
        expect(value).toBe('successs');
        expect(booleanDefer.isResolved).toBe(true);
        expect(booleanDefer.isRejected).toBe(false);
    }));
    test('Deferred should reject value async', () => __awaiter(void 0, void 0, void 0, function* () {
        // given
        const booleanDefer = new Deferred();
        // when
        setTimeout(() => {
            booleanDefer.reject('error');
        }, 0);
        try {
            yield booleanDefer.promise;
        }
        catch (error) {
            expect(error).toBe('error');
            expect(booleanDefer.isResolved).toBe(false);
            expect(booleanDefer.isRejected).toBe(true);
        }
    }));
});
//# sourceMappingURL=utils.spec.js.map