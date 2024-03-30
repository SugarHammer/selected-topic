import { Node, Markup, ObjectExt } from '@antv/x6';
export class ReactShape extends Node {
    get component() {
        return this.getComponent();
    }
    set component(val) {
        this.setComponent(val);
    }
    getComponent() {
        return this.store.get('component');
    }
    setComponent(component, options = {}) {
        if (component == null) {
            this.removeComponent(options);
        }
        else {
            this.store.set('component', component, options);
        }
        return this;
    }
    removeComponent(options = {}) {
        this.store.remove('component', options);
        return this;
    }
}
(function (ReactShape) {
    function getMarkup(simple, useForeignObject, primer = 'rect') {
        const markup = [];
        const content = useForeignObject
            ? Markup.getForeignObjectMarkup()
            : {
                tagName: 'g',
                selector: 'content',
            };
        if (simple) {
            markup.push(content);
        }
        else {
            markup.push(...[
                {
                    tagName: primer,
                    selector: 'body',
                },
                content,
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ]);
        }
        return markup;
    }
    ReactShape.config({
        view: 'react-shape-view',
        markup: getMarkup(false, true),
        attrs: {
            body: {
                fill: 'none',
                stroke: 'none',
                refWidth: '100%',
                refHeight: '100%',
            },
            fo: {
                refWidth: '100%',
                refHeight: '100%',
            },
            label: {
                fontSize: 14,
                fill: '#333',
                refX: '50%',
                refY: '50%',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
            },
        },
        propHooks(metadata) {
            if (metadata.markup == null) {
                const primer = metadata.primer;
                const useForeignObject = metadata.useForeignObject !== false;
                if (primer && primer !== 'rect') {
                    metadata.markup = getMarkup(false, useForeignObject, primer);
                    let attrs = {};
                    if (primer === 'circle') {
                        attrs = {
                            refCx: '50%',
                            refCy: '50%',
                            refR: '50%',
                        };
                    }
                    else if (primer === 'ellipse') {
                        attrs = {
                            refCx: '50%',
                            refCy: '50%',
                            refRx: '50%',
                            refRy: '50%',
                        };
                    }
                    metadata.attrs = ObjectExt.merge({}, {
                        body: Object.assign({ refWidth: null, refHeight: null }, attrs),
                    }, metadata.attrs || {});
                }
                else {
                    if (metadata.simple) {
                        metadata.markup = getMarkup(true, useForeignObject);
                        metadata.attrs = ObjectExt.merge({}, {
                            body: null,
                            label: null,
                        }, metadata.attrs || {});
                    }
                }
            }
            return metadata;
        },
    });
    Node.registry.register('react-shape', ReactShape, true);
})(ReactShape || (ReactShape = {}));
//# sourceMappingURL=node.js.map