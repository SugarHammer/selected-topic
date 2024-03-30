import React from 'react';
import { RxModel, NsModel } from '../common/rx-model';
/** 判断model是否Mount */
const isRefMounted = (ref) => {
    return ref && ref.current;
};
/** 用于判断model是否Mount */
const useIsMoutedRef = () => {
    /** 记录当前组件的加载状态 */
    const ref = React.useRef(true);
    React.useEffect(() => {
        return () => {
            ref.current = false;
        };
    }, []);
    return ref;
};
/** 将model和react绑定 */
export const useModel = (model) => {
    /** 记录当前组件的加载状态 */
    const ref = useIsMoutedRef();
    const [state, setState] = React.useState(model.getValue());
    React.useEffect(() => {
        const disposeable = model.watch(val => {
            if (isRefMounted(ref)) {
                setState(val);
            }
        });
        return () => {
            disposeable.dispose();
        };
        /* eslint-disable-next-line  */
    }, [model]);
    const value = state;
    const canRender = NsModel.isValidValue(value);
    const setValue = React.useCallback(val => model.setValue(val), [model]);
    return [value, setValue, canRender];
};
/** 在组件内新建一个model */
export const useComponentCtx = (initialState) => {
    const model = React.useMemo(() => new RxModel(initialState), [initialState]);
    /** model 和 state 绑定触发view刷新 */
    const [modelValue, setModelValue, canRender] = useModel(model);
    /** unMount时dispose */
    React.useEffect(() => {
        return () => {
            model.dispose();
        };
    }, [model]);
    return [modelValue, setModelValue, model, canRender];
};
//# sourceMappingURL=utils.js.map