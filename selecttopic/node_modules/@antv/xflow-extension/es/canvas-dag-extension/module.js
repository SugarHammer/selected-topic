import 'reflect-metadata';
import { ManaSyringe } from '@antv/xflow-core';
import { DagHooksContribution } from './contributions/dag';
import { QueryGraphStatusCommand } from './contributions/command';
export * from './x6-extension/edge';
export * from './x6-extension/node';
import { IComponentConfig } from './interface';
/** 依赖扩展模块，必须要加载 */
const createDagExtensionModule = config => {
    return ManaSyringe.Module(register => {
        /** 扩展 runtime hook */
        register(DagHooksContribution);
        register(QueryGraphStatusCommand);
        register(IComponentConfig, {
            useValue: config,
        });
    });
};
export { createDagExtensionModule };
//# sourceMappingURL=module.js.map