import { Graph, FunctionExt } from '@antv/x6';
import { registry } from './registry';
Graph.Hook.prototype.getReactComponent = function (node) {
    const getReactComponent = this.options.getReactComponent;
    if (typeof getReactComponent === 'function') {
        const ret = FunctionExt.call(getReactComponent, this.graph, node);
        if (ret != null) {
            return ret;
        }
    }
    let ret = node.getComponent();
    if (typeof ret === 'string') {
        const component = registry.get(ret);
        if (component == null) {
            return registry.onNotFound(ret);
        }
        ret = component;
    }
    return ret;
};
//# sourceMappingURL=hook.js.map