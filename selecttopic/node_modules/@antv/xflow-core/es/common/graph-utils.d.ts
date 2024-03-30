import type { Cell, Node, Edge } from '@antv/x6';
import type { NsGraph } from '../interface';
export declare const node2Json: (cell: Node) => {
    id: string;
    width: number;
    height: number;
    x: number;
    y: number;
    group: string;
    groupChildren: string[];
    groupCollapsedSize: any;
    label?: string;
    renderKey?: string;
    isGroup?: boolean;
    ports?: NsGraph.INodeAnchor[] | NsGraph.INodePortMeta;
    attrs?: import("@antv/x6/lib/registry").Attr.CellAttrs;
};
export declare const edge2Json: (cell: Edge) => any;
export declare const cellsToJson: (cells: Cell<Cell.Properties>[]) => {
    nodes: NsGraph.INodeConfig[];
    edges: NsGraph.IEdgeConfig[];
};
