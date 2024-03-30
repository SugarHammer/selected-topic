import type { NsGraph } from '../interface';
export declare class GraphMappingHelper {
    groupNodeMap: Map<string, NsGraph.INodeConfig>;
    nodeMap: Map<string, NsGraph.INodeConfig>;
    nodeMappingRecord: Map<string, string>;
    portMap: Map<string, NsGraph.INodeAnchor>;
    portMappingRecord: Map<string, string>;
    edgeMap: Map<string, NsGraph.IEdgeConfig>;
    edgeMappingRecord: Map<string, string>;
    getNodesByType: (nodes: NsGraph.INodeConfig[]) => {
        normalNodes: NsGraph.INodeConfig[];
        groupNodes: NsGraph.INodeConfig[];
    };
    getNodePorts: (node: NsGraph.INodeConfig) => NsGraph.INodeAnchor[];
    addNodes: (nodes: NsGraph.INodeConfig[]) => void;
    addEdge: (edges: NsGraph.IEdgeConfig[]) => void;
    buildNodeMapping: (currentNode: NsGraph.INodeConfig, nextNode: NsGraph.INodeConfig) => void;
    createEdgeBetweenNodes: (edgeConfig: NsGraph.IEdgeConfig) => NsGraph.IEdgeConfig;
    buildGroupRelations: (groupNode: NsGraph.INodeConfig) => NsGraph.INodeConfig;
}
