/**
 * 全量 Command，用户通过 name 指定，支持配置式和命令式
 * enum Command {Undo, Redo, SaveGraphData,frontNode,backNode}
 */
export declare const CommandPool: {
    UNDO_CMD: string;
    REDO_CMD: string;
    SAVE_GRAPH_DATA: string;
    FRONT_NODE: string;
    BACK_NODE: string;
    MULTI_SELECT: string;
    ADD_GROUP: string;
    DEL_GROUP: string;
    COPY: string;
    PASTE: string;
};
