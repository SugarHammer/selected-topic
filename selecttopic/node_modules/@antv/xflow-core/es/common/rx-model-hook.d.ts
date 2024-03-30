import React from 'react';
import { RxModel, NsModel } from './rx-model';
/** 用于判断model是否Mount */
export declare const useIsMountedRef: () => React.MutableRefObject<boolean>;
/** 判断model是否Mount */
export declare const useModel: <T>(model: RxModel<T>) => [T, NsModel.ISetValue<T>, boolean];
/** 在组件内部新建一个model */
export declare const createComponentModel: <T>(initialState: T) => [T, NsModel.ISetValue<T>, RxModel<T>, boolean];
/**
 * useModelAsync：
 * watch model的值，
 * 把model的值通过useState和组件状态关联起来
 */
export declare const useModelAsync: <T extends unknown, InitialState = T>(args: {
    getModel: () => Promise<NsModel.IModel<T>>;
    initialState: InitialState;
}) => [T | InitialState, React.Dispatch<React.SetStateAction<T>>, NsModel.IModel<T>];
