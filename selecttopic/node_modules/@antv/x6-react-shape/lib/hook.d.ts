import { Graph } from '@antv/x6';
import { Definition } from './registry';
import { ReactShape } from './node';
declare module '@antv/x6/lib/graph/hook' {
    namespace Hook {
        interface IHook {
            getReactComponent(this: Graph, node: ReactShape): Definition;
        }
    }
    interface Hook {
        getReactComponent(node: ReactShape): Definition;
    }
}
