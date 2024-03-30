import { RxModel, NsModel } from '../common/rx-model';
/** 将model和react绑定 */
export declare const useModel: <T>(model: RxModel<T>) => [T, NsModel.ISetValue<T>, boolean];
/** 在组件内新建一个model */
export declare const useComponentCtx: <T>(initialState: T) => [T, NsModel.ISetValue<T>, RxModel<T>, boolean];
