/// <reference types="react" />
import { Graph, Node, Registry } from '@antv/x6';
export declare type Definition = ((this: Graph, node: Node) => React.ReactElement | null | undefined) | React.ReactElement;
export declare const registry: Registry.Registry<Definition, import("@antv/x6/lib/types").KeyValue<Definition>, never>;
declare module '@antv/x6/lib/graph/graph' {
    namespace Graph {
        let registerReactComponent: typeof registry.register;
        let unregisterReactComponent: typeof registry.unregister;
    }
}
