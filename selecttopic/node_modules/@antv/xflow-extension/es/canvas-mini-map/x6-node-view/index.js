import { NodeView } from '@antv/x6';
export class SimpleNodeView extends NodeView {
    renderMarkup() {
        return this.renderJSONMarkup({
            tagName: 'rect',
            selector: 'body',
        });
    }
    update() {
        super.update({
            body: {
                refWidth: '100%',
                refHeight: '100%',
                fill: SimpleNodeView.nodeFillColor,
            },
        });
    }
}
SimpleNodeView.nodeFillColor = '#31d0c6';
SimpleNodeView.setNodeFillColor = (color) => {
    SimpleNodeView.nodeFillColor = color;
};
//# sourceMappingURL=index.js.map