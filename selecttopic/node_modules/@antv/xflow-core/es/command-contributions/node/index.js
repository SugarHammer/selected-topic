/** commands */
import { NsAddNode, AddNodeCommand } from './node-add';
import { NsDelNode, DelNodeCommand } from './node-del';
import { NsSelectNode, SelectNodeCommand } from './node-select';
import { NsMoveNode, MoveNodeCommand } from './node-move';
import { NsUpdateNode, UpdateNodeCommand } from './node-update';
import { NsCenterNode, CenterNodeCommand } from './node-center';
import { NsFrontNode, FrontNodeCommand } from './node-front';
import { NsBackNode, BackNodeCommand } from './node-back';
import { NsHighlightNode, HighlightNodeCommand } from './node-highlight';
import { NsUpdateNodePort, UpdateNodePort } from './node-update-port';
/** 注册Command Handler Class */
export const registerNodeCommand = (register) => {
    register(AddNodeCommand);
    register(DelNodeCommand);
    register(SelectNodeCommand);
    register(MoveNodeCommand);
    register(UpdateNodeCommand);
    register(CenterNodeCommand);
    register(FrontNodeCommand);
    register(BackNodeCommand);
    register(HighlightNodeCommand);
    register(UpdateNodePort);
};
/** app onStart 时, 注册 Command Hooks */
export const hookhubList = [
    NsAddNode,
    NsDelNode,
    NsSelectNode,
    NsMoveNode,
    NsUpdateNode,
    NsCenterNode,
    NsFrontNode,
    NsBackNode,
    NsHighlightNode,
    NsUpdateNodePort,
];
//# sourceMappingURL=index.js.map