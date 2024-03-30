import { NsAddGroup, AddGroupCommand } from './group-add';
import { NsDelGroup, DelGroupCommand } from './group-del';
import { NsInitGroup, InitGroupCommand } from './group-init';
import { NsCollapseGroup, CollapseGroupCommand } from './group-toggle-collapse';
/** 注册Command Handler Class */
export const registerGroupCommand = (register) => {
    register(AddGroupCommand);
    register(DelGroupCommand);
    register(InitGroupCommand);
    register(CollapseGroupCommand);
};
/** app onStart 时, 注册 Command Hooks */
export const hookhubList = [NsAddGroup, NsDelGroup, NsInitGroup, NsCollapseGroup];
//# sourceMappingURL=index.js.map