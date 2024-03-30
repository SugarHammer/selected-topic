import { __awaiter } from "tslib";
import React from 'react';
import { RxModel, NsModel } from './rx-model';
/** 判断model是否Mount */
const isRefMounted = (ref) => {
    return ref && ref.current;
};
/** 用于判断model是否Mount */
export const useIsMountedRef = () => {
    /** 记录当前组件的加载状态 */
    const ref = React.useRef(true);
    React.useEffect(() => {
        return () => {
            ref.current = false;
        };
    }, []);
    return ref;
};
/** 判断model是否Mount */
export const useModel = (model) => {
    /** 记录当前组件的加载状态 */
    const ref = useIsMountedRef();
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
    }, [setState]);
    const value = state;
    const canRender = NsModel.isValidValue(value);
    const setValue = React.useCallback(val => model.setValue(val), [model]);
    return [value, setValue, canRender];
};
/** 在组件内部新建一个model */
export const createComponentModel = (initialState) => {
    /* eslint-disable-next-line  */
    const model = React.useMemo(() => new RxModel(initialState), []);
    /** model 和 state 绑定触发view刷新 */
    /* eslint-disable-next-line  */
    const [modelValue, setModelValue, canRender] = useModel(model);
    /** unMount时dispose */
    /* eslint-disable-next-line  */
    React.useEffect(() => {
        return () => {
            model.dispose();
        };
    }, [model]);
    return [modelValue, setModelValue, model, canRender];
};
/**
 * useModelAsync：
 * watch model的值，
 * 把model的值通过useState和组件状态关联起来
 */
export const useModelAsync = (args) => {
    const { getModel, initialState } = args;
    /** 记录当前组件的加载状态 */
    const isMountedRef = useIsMountedRef();
    const modelRef = React.useRef();
    /** 订阅 model */
    const [state, setState] = React.useState(initialState);
    React.useEffect(() => {
        let d;
        getModel().then((model) => __awaiter(void 0, void 0, void 0, function* () {
            modelRef.current = model;
            const newState = yield model.getValidValue();
            if (!isMountedRef.current) {
                return;
            }
            setState(newState);
            d = model.watch(val => {
                if (isMountedRef.current) {
                    setState(val);
                }
            });
        }));
        return () => {
            if (d && d.dispose) {
                d.dispose();
            }
        };
        /* eslint-disable-next-line  */
    }, []);
    return [state, setState, modelRef.current];
};
//# sourceMappingURL=rx-model-hook.js.map