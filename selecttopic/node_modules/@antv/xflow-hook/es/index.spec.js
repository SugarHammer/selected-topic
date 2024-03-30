import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HookHub } from './index';
describe('test HookHub class', () => {
    const spy = {
        console: jest.spyOn(console, 'log').mockImplementation(() => { }),
    };
    beforeEach(() => {
        /** 监听console调用， 屏蔽console msg */
        spy.console = jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    afterEach(() => {
        spy.console.mockClear();
    });
    const mockHandler = jest.fn();
    test('HookHub should get empty hooks list after init ', () => {
        const hooks = new HookHub();
        expect(hooks.getHooks()).toHaveLength(0);
    });
    test('HookHub can register hooks and dispose', () => __awaiter(void 0, void 0, void 0, function* () {
        const hooks = new HookHub();
        const hookMeta = {
            name: 'hook1',
            handler: mockHandler,
        };
        const disposable = hooks.registerHook(hookMeta);
        expect(disposable).toMatchObject({
            dispose: expect.any(Function),
        });
        const innerHooks = yield hooks.getHooks([], false);
        expect(innerHooks).toHaveLength(1);
        expect(innerHooks).toMatchObject([hookMeta]);
        disposable.dispose();
        expect(yield hooks.getHooks([])).toHaveLength(0);
    }));
    test('HookHub can sort hooks by using before after ', () => __awaiter(void 0, void 0, void 0, function* () {
        const hooks = new HookHub();
        const hookMeta = {
            name: 'hook1',
            handler: mockHandler,
        };
        const disposable = hooks.registerHook(hookMeta);
        expect(disposable).toMatchObject({
            dispose: expect.any(Function),
        });
        const innerHooks = yield hooks.getHooks([], true);
        expect(innerHooks).toHaveLength(1);
        expect(innerHooks).toMatchObject([hookMeta]);
        disposable.dispose();
        expect(yield hooks.getHooks([])).toHaveLength(0);
    }));
    test('HookHub can call hooks ', () => __awaiter(void 0, void 0, void 0, function* () {
        const hooks = new HookHub();
        const hookMeta = {
            name: 'count_add_one',
            handler: (args) => __awaiter(void 0, void 0, void 0, function* () {
                args.count = args.count + 1;
            }),
        };
        hooks.registerHook(hookMeta);
        const count10 = yield hooks.call({ count: 0 }, (args) => __awaiter(void 0, void 0, void 0, function* () {
            const { count } = args;
            return Object.assign(Object.assign({}, args), { count: count * 10 + '' });
        }));
        expect(count10).toMatchObject({
            count: '10',
        });
        const count1000 = yield hooks.call({ count: 0 }, (args) => __awaiter(void 0, void 0, void 0, function* () {
            const { count } = args;
            return Object.assign(Object.assign({}, args), { count: count * 10 + '' });
        }), [
            {
                name: 'set count to 100',
                handler: (args) => __awaiter(void 0, void 0, void 0, function* () {
                    args.count = 100;
                }),
            },
        ]);
        expect(count1000).toMatchObject({
            count: '1000',
        });
    }));
    test('HookHub hooks can use return null to skip main handler', () => __awaiter(void 0, void 0, void 0, function* () {
        const hooks = new HookHub();
        const hookMeta = {
            name: 'count_add_one',
            handler: (args) => __awaiter(void 0, void 0, void 0, function* () {
                args.count = args.count + 1;
            }),
        };
        hooks.registerHook(hookMeta);
        const mainHandler = jest.fn((_x) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('it never run since second hook return null');
            return {
                count: '',
            };
        }));
        const firstHookHandler = jest.fn((args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('it will run');
            args.count = 100;
        }));
        /** return null handler必须是两个参数*/
        const secondHookHandler = jest.fn((_args, _handler) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('it will stop here');
            return null;
        }));
        const thirdHookHandler = jest.fn((_args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('it cannot run');
        }));
        // call hook handler
        yield hooks.call({ count: 0 }, mainHandler, [
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
        ]);
        expect(spy.console).toBeCalledTimes(2);
        expect(firstHookHandler).toBeCalledTimes(1);
        expect(secondHookHandler).toBeCalledTimes(1);
        expect(thirdHookHandler).toBeCalledTimes(0);
        expect(mainHandler.mock.calls.length).toBe(0);
    }));
    test('HookHub hooks can wrap main handler', () => __awaiter(void 0, void 0, void 0, function* () {
        const hooks = new HookHub();
        const hookMeta = {
            name: 'count_add_one',
            handler: (args) => __awaiter(void 0, void 0, void 0, function* () {
                args.count = args.count + 1;
            }),
        };
        hooks.registerHook(hookMeta);
        // mock hook runtime handler
        const mainHandler = jest.fn((_x) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('run main handler');
            return {
                count: '100',
            };
        }));
        const firstHookHandler = jest.fn((args) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('run first hook handler');
            args.count = 100;
        }));
        /** return null handler必须是两个参数*/
        const secondHookHandler = jest.fn((_args, handler) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('run second hook handler');
            const newHandler = (args) => {
                console.log('run before main handler');
                const result = handler.call(null, args);
                console.log('run after main handler');
                return result;
            };
            return newHandler;
        }));
        // call hook handler
        yield hooks.call({ count: 0 }, mainHandler, [
            {
                name: 'first runtime hook',
                handler: firstHookHandler,
            },
            {
                name: 'it will wrap main handler',
                handler: secondHookHandler,
            },
        ]);
        expect(mainHandler.mock.calls.length).toBe(1);
        expect(spy.console).toHaveBeenCalledTimes(5);
        expect(spy.console.mock.calls).toEqual([
            ['run first hook handler'],
            ['run second hook handler'],
            ['run before main handler'],
            ['run main handler'],
            ['run after main handler'],
        ]);
    }));
});
//# sourceMappingURL=index.spec.js.map