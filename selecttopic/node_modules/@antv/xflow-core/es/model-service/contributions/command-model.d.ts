import { IGraphCommandService } from '../../command/interface';
import type { IModelService } from '../interface';
import { IModelContribution } from '../interface';
export declare class CommandModelContribution implements IModelContribution {
    /** 获取IGraphCommandService的状态 */
    commands: IGraphCommandService;
    /** 扩展Model */
    registerModel(registry: IModelService): void;
}
