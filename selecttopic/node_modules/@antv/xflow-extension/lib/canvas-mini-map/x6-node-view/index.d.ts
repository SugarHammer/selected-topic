import { NodeView } from '@antv/x6';
export declare class SimpleNodeView extends NodeView {
    static nodeFillColor: string;
    static setNodeFillColor: (color: string) => void;
    protected renderMarkup(): void;
    update(): void;
}
