/** commands */
import { NsAddEdge, AddEdgeCommand } from './edge-add';
import { NsDelEdge, DelEdgeCommand } from './edge-del';
import { NsUpdateEdge, UpdateEdgeCommand } from './edge-update';
import { NsHighlightEdge, HighlightEdgeCommand } from './edge-highlight';
import { NsFrontEdge, FrontEdgeCommand } from './edge-front';
import { NsBackEdge, BackEdgeCommand } from './edge-back';
/** 注册Command Handler Class */
export const registerEdgeCommand = (register) => {
    register(AddEdgeCommand);
    register(DelEdgeCommand);
    register(UpdateEdgeCommand);
    register(HighlightEdgeCommand);
    register(FrontEdgeCommand);
    register(BackEdgeCommand);
};
/** app onStart 时, 注册 Command Hooks */
export const hookhubList = [NsAddEdge, NsDelEdge, NsUpdateEdge, NsHighlightEdge, NsFrontEdge, NsBackEdge];
//# sourceMappingURL=index.js.map