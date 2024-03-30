import { HookHub } from '@antv/xflow-hook';
import { Syringe } from 'mana-syringe';
/**
 * extension 应该实现这个扩展点来注册更多的hook
 */
export const IHookService = Syringe.defineToken('IHookService');
/**
 * extension 应该实现这个扩展点来注册更多的hook
 */
export const IHookContribution = Syringe.defineToken('IHookContribution');
export const initHooks = () => ({
    graphOptions: new HookHub(),
    reactNodeRender: new HookHub(),
    reactEdgeLabelRender: new HookHub(),
    afterGraphInit: new HookHub(),
    beforeGraphDestroy: new HookHub(),
    x6Events: new HookHub(),
});
//# sourceMappingURL=interface.js.map