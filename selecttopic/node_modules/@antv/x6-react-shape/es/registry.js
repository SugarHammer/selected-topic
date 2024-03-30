import { Graph, Registry } from '@antv/x6';
export const registry = Registry.create({
    type: 'react componnet',
});
Graph.registerReactComponent = registry.register;
Graph.unregisterReactComponent = registry.unregister;
//# sourceMappingURL=registry.js.map