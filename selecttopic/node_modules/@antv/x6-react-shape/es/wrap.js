import React from 'react';
import { FunctionExt } from '@antv/x6';
export class Wrap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.scheduledAnimationFrame = false;
        this.throttleUpdateFunc = () => {
            if (this.scheduledAnimationFrame) {
                return;
            }
            this.scheduledAnimationFrame = true;
            window.requestAnimationFrame(() => {
                this.setState((state) => {
                    this.scheduledAnimationFrame = false;
                    return { tick: state.tick + 1 };
                });
            });
        };
        this.onChange = (e) => {
            if (Wrap.throttleChangeTypes.includes(e.key)) {
                this.throttleUpdateFunc();
                return;
            }
            // eslint-disable-next-line react/no-access-state-in-setstate
            this.setState({ tick: this.state.tick + 1 });
        };
        this.state = { tick: 0 };
    }
    componentDidMount() {
        this.props.node.on('change:*', this.onChange);
    }
    componentWillUnmount() {
        this.props.node.off('change:*', this.onChange);
    }
    clone(elem) {
        const { node } = this.props;
        return typeof elem.type === 'string'
            ? React.cloneElement(elem)
            : React.cloneElement(elem, { node });
    }
    render() {
        const { graph, node, component } = this.props;
        if (React.isValidElement(component)) {
            return this.clone(component);
        }
        if (typeof component === 'function') {
            // Calling the component function on every change of the node.
            const ret = FunctionExt.call(component, graph, node);
            if (React.isValidElement(ret)) {
                return this.clone(ret);
            }
        }
        return component;
    }
}
Wrap.throttleChangeTypes = ['position', 'size'];
//# sourceMappingURL=wrap.js.map