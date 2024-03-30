import { Node } from '@antv/x6';
import { Definition } from './registry';
export declare class ReactShape<Properties extends ReactShape.Properties = ReactShape.Properties> extends Node<Properties> {
    get component(): ReactShape.Properties['component'];
    set component(val: ReactShape.Properties['component']);
    getComponent(): ReactShape.Properties['component'];
    setComponent(component: ReactShape.Properties['component'], options?: Node.SetOptions): this;
    removeComponent(options?: Node.SetOptions): this;
}
export declare namespace ReactShape {
    type Primer = 'rect' | 'circle' | 'path' | 'ellipse' | 'polygon' | 'polyline';
    interface Properties extends Node.Properties {
        simple?: boolean;
        primer?: Primer;
        useForeignObject?: boolean;
        component?: Definition | string;
    }
}
export declare namespace ReactShape {
}
