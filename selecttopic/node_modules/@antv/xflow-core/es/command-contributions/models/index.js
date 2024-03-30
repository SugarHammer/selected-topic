/** commands */
import { NsUpdateModelCommand, UpdateModelCommand } from './update-model';
/** 注册Command Handler Class */
export const registerModelServiceCommand = (register) => {
    register(UpdateModelCommand);
};
/** app onStart 时, 注册 Command Hooks */
export const hookhubList = [NsUpdateModelCommand];
//# sourceMappingURL=index.js.map