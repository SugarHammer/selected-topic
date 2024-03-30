"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
describe('sort utils', function () {
    test('it should sort hooks when use IHook after attributes', function () {
        var mockHandler = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var hook1 = { name: 'hook1', handler: mockHandler, after: 'hook2' };
        var hook2 = { name: 'hook2', handler: mockHandler, after: 'hook3' };
        var hook3 = { name: 'hook3', handler: mockHandler, after: 'hook4' };
        var hook4 = { name: 'hook4', handler: mockHandler, after: 'hook5' };
        var hook5 = { name: 'hook5', handler: mockHandler };
        var hooks = [hook1, hook2, hook3, hook4, hook5];
        var hookMap = new Map();
        hookMap.set('hook1', hook1);
        hookMap.set('hook2', hook2);
        hookMap.set('hook3', hook3);
        hookMap.set('hook4', hook4);
        hookMap.set('hook5', hook5);
        expect(utils_1.HookUtils.sort(hooks, hookMap)).toEqual([hook5, hook4, hook3, hook2, hook1]);
    });
    test('it should sort hooks when use IHook before attributes', function () {
        var mockHandler = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var hook1 = { name: 'hook1', handler: mockHandler };
        var hook2 = { name: 'hook2', handler: mockHandler, before: 'hook1' };
        var hook3 = { name: 'hook3', handler: mockHandler, before: 'hook2' };
        var hook4 = { name: 'hook4', handler: mockHandler, before: 'hook3' };
        var hook5 = { name: 'hook5', handler: mockHandler, before: 'hook4' };
        var hooks = [hook1, hook2, hook3, hook4, hook5];
        var hookMap = new Map();
        hookMap.set('hook1', hook1);
        hookMap.set('hook2', hook2);
        hookMap.set('hook3', hook3);
        hookMap.set('hook4', hook4);
        hookMap.set('hook5', hook5);
        expect(utils_1.HookUtils.sort(hooks, hookMap)).toEqual([hook5, hook4, hook3, hook2, hook1]);
    });
});
describe('err utils test', function () {
    test('it can create error with context', function () {
        // given
        var code = 'MY ERROR';
        var message = 'error message string';
        var context = { a: 1, b: 2 };
        // when
        var err = new utils_1.ErrorUtils.HookError(code, message, context);
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('MY ERROR: error message string');
        expect(err.contexts.a).toEqual(1);
        expect(err.contexts.b).toEqual(2);
    });
    test('it can create hook argument error', function () {
        // given
        var mockHandler = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var hook1 = { name: 'hook1', handler: mockHandler };
        // when
        var err = utils_1.ErrorUtils.InvalidHookArguments(hook1);
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_ARGS_LENGTH: hook handlers must have 0 to 2 arguments but got 0');
    });
    test('it can create hook argument error', function () {
        // given & when
        var err = utils_1.ErrorUtils.HookBeforeError();
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_BEFORE: hook require a before dependency but not exist in hookmap');
    });
    test('it can create hook argument error', function () {
        // given & when
        var err = utils_1.ErrorUtils.HookAfterError();
        //then
        expect(err instanceof Error).toBe(true);
        expect(err.message).toEqual('INVALID_HOOK_AFTER: hook require a after dependency but not exist in hookmap');
    });
});
describe('Deferred utils', function () {
    test('Deferred should resolve value async', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var booleanDefer, value;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    booleanDefer = new utils_1.Deferred();
                    // when
                    setTimeout(function () {
                        booleanDefer.resolve('successs');
                    }, 0);
                    return [4 /*yield*/, booleanDefer.promise
                        // then
                    ];
                case 1:
                    value = _a.sent();
                    // then
                    expect(value).toBe('successs');
                    expect(booleanDefer.isResolved).toBe(true);
                    expect(booleanDefer.isRejected).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    test('Deferred should reject value async', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var booleanDefer, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    booleanDefer = new utils_1.Deferred();
                    // when
                    setTimeout(function () {
                        booleanDefer.reject('error');
                    }, 0);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, booleanDefer.promise];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1).toBe('error');
                    expect(booleanDefer.isResolved).toBe(false);
                    expect(booleanDefer.isRejected).toBe(true);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=utils.spec.js.map