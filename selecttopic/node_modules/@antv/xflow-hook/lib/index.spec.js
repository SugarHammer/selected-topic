"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
var index_1 = require("./index");
describe('test HookHub class', function () {
    var spy = {
        console: jest.spyOn(console, 'log').mockImplementation(function () { }),
    };
    beforeEach(function () {
        /** 监听console调用， 屏蔽console msg */
        spy.console = jest.spyOn(console, 'log').mockImplementation(function () { });
    });
    afterEach(function () {
        spy.console.mockClear();
    });
    var mockHandler = jest.fn();
    test('HookHub should get empty hooks list after init ', function () {
        var hooks = new index_1.HookHub();
        expect(hooks.getHooks()).toHaveLength(0);
    });
    test('HookHub can register hooks and dispose', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var hooks, hookMeta, disposable, innerHooks, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    hooks = new index_1.HookHub();
                    hookMeta = {
                        name: 'hook1',
                        handler: mockHandler,
                    };
                    disposable = hooks.registerHook(hookMeta);
                    expect(disposable).toMatchObject({
                        dispose: expect.any(Function),
                    });
                    return [4 /*yield*/, hooks.getHooks([], false)];
                case 1:
                    innerHooks = _b.sent();
                    expect(innerHooks).toHaveLength(1);
                    expect(innerHooks).toMatchObject([hookMeta]);
                    disposable.dispose();
                    _a = expect;
                    return [4 /*yield*/, hooks.getHooks([])];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('HookHub can sort hooks by using before after ', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var hooks, hookMeta, disposable, innerHooks, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    hooks = new index_1.HookHub();
                    hookMeta = {
                        name: 'hook1',
                        handler: mockHandler,
                    };
                    disposable = hooks.registerHook(hookMeta);
                    expect(disposable).toMatchObject({
                        dispose: expect.any(Function),
                    });
                    return [4 /*yield*/, hooks.getHooks([], true)];
                case 1:
                    innerHooks = _b.sent();
                    expect(innerHooks).toHaveLength(1);
                    expect(innerHooks).toMatchObject([hookMeta]);
                    disposable.dispose();
                    _a = expect;
                    return [4 /*yield*/, hooks.getHooks([])];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('HookHub can call hooks ', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var hooks, hookMeta, count10, count1000;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hooks = new index_1.HookHub();
                    hookMeta = {
                        name: 'count_add_one',
                        handler: function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                args.count = args.count + 1;
                                return [2 /*return*/];
                            });
                        }); },
                    };
                    hooks.registerHook(hookMeta);
                    return [4 /*yield*/, hooks.call({ count: 0 }, function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var count;
                            return tslib_1.__generator(this, function (_a) {
                                count = args.count;
                                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, args), { count: count * 10 + '' })];
                            });
                        }); })];
                case 1:
                    count10 = _a.sent();
                    expect(count10).toMatchObject({
                        count: '10',
                    });
                    return [4 /*yield*/, hooks.call({ count: 0 }, function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var count;
                            return tslib_1.__generator(this, function (_a) {
                                count = args.count;
                                return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, args), { count: count * 10 + '' })];
                            });
                        }); }, [
                            {
                                name: 'set count to 100',
                                handler: function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        args.count = 100;
                                        return [2 /*return*/];
                                    });
                                }); },
                            },
                        ])];
                case 2:
                    count1000 = _a.sent();
                    expect(count1000).toMatchObject({
                        count: '1000',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('HookHub hooks can use return null to skip main handler', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var hooks, hookMeta, mainHandler, firstHookHandler, secondHookHandler, thirdHookHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hooks = new index_1.HookHub();
                    hookMeta = {
                        name: 'count_add_one',
                        handler: function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                args.count = args.count + 1;
                                return [2 /*return*/];
                            });
                        }); },
                    };
                    hooks.registerHook(hookMeta);
                    mainHandler = jest.fn(function (_x) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('it never run since second hook return null');
                            return [2 /*return*/, {
                                    count: '',
                                }];
                        });
                    }); });
                    firstHookHandler = jest.fn(function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('it will run');
                            args.count = 100;
                            return [2 /*return*/];
                        });
                    }); });
                    secondHookHandler = jest.fn(function (_args, _handler) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('it will stop here');
                            return [2 /*return*/, null];
                        });
                    }); });
                    thirdHookHandler = jest.fn(function (_args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('it cannot run');
                            return [2 /*return*/];
                        });
                    }); });
                    // call hook handler
                    return [4 /*yield*/, hooks.call({ count: 0 }, mainHandler, [
                            {
                                name: 'it will run',
                                handler: firstHookHandler,
                            },
                            {
                                name: 'it will run and stop here',
                                handler: secondHookHandler,
                            },
                            {
                                name: 'it cannot run',
                                handler: thirdHookHandler,
                            },
                        ])];
                case 1:
                    // call hook handler
                    _a.sent();
                    expect(spy.console).toBeCalledTimes(2);
                    expect(firstHookHandler).toBeCalledTimes(1);
                    expect(secondHookHandler).toBeCalledTimes(1);
                    expect(thirdHookHandler).toBeCalledTimes(0);
                    expect(mainHandler.mock.calls.length).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test('HookHub hooks can wrap main handler', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var hooks, hookMeta, mainHandler, firstHookHandler, secondHookHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hooks = new index_1.HookHub();
                    hookMeta = {
                        name: 'count_add_one',
                        handler: function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                args.count = args.count + 1;
                                return [2 /*return*/];
                            });
                        }); },
                    };
                    hooks.registerHook(hookMeta);
                    mainHandler = jest.fn(function (_x) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('run main handler');
                            return [2 /*return*/, {
                                    count: '100',
                                }];
                        });
                    }); });
                    firstHookHandler = jest.fn(function (args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            console.log('run first hook handler');
                            args.count = 100;
                            return [2 /*return*/];
                        });
                    }); });
                    secondHookHandler = jest.fn(function (_args, handler) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var newHandler;
                        return tslib_1.__generator(this, function (_a) {
                            console.log('run second hook handler');
                            newHandler = function (args) {
                                console.log('run before main handler');
                                var result = handler.call(null, args);
                                console.log('run after main handler');
                                return result;
                            };
                            return [2 /*return*/, newHandler];
                        });
                    }); });
                    // call hook handler
                    return [4 /*yield*/, hooks.call({ count: 0 }, mainHandler, [
                            {
                                name: 'first runtime hook',
                                handler: firstHookHandler,
                            },
                            {
                                name: 'it will wrap main handler',
                                handler: secondHookHandler,
                            },
                        ])];
                case 1:
                    // call hook handler
                    _a.sent();
                    expect(mainHandler.mock.calls.length).toBe(1);
                    expect(spy.console).toHaveBeenCalledTimes(5);
                    expect(spy.console.mock.calls).toEqual([
                        ['run first hook handler'],
                        ['run second hook handler'],
                        ['run before main handler'],
                        ['run main handler'],
                        ['run after main handler'],
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map