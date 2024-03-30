import type { Syringe } from 'mana-syringe';
import type { IGraphCommand } from '../../command/interface';
import type { HookHub } from '@antv/xflow-hook';
import type { IHooks } from '../../hooks/interface';
import type { Simplify } from '../../common/types';
import { NsGraphMeta } from './graph-meta';
import { NsGraphSaveData } from './graph-save-data';
import { NsGraphLoadData } from './graph-load-data';
import { NsGraphLayout } from './graph-layout';
import { NsGraphRender } from './graph-render';
import { NsGraphResize } from './graph-resize';
import { NsGraphFullscreen } from './graph-fulllscreen';
import { NsGraphZoom } from './graph-zoom';
import { NsGraphCopySelection } from './graph-copy';
import { NsGraphPasteSelection } from './graph-paste';
import { NsGraphToggleMultiSelect } from './graph-toggle-multi-select';
import { NsGraphHistoryUndo } from './graph-history-undo';
import { NsGraphHistoryRedo } from './graph-history-redo';
import { NsGraphHistoryToggle } from './graph-history-toggle';
import { NsGraphHistoryReset } from './graph-history-reset';
import { NsGraphAddTool } from './graph-add-tool';
import { NsGraphDelTool } from './graph-del-tool';
import { NsRedoCmd } from './graph-cmd-redo';
import { NsUndoCmd } from './graph-cmd-undo';
/** 注册Command Handler Class */
export declare const registerGraphCommand: (register: Syringe.Register) => void;
/** app onStart 时, 注册 Command Hooks */
export declare const hookhubList: {
    command: IGraphCommand;
    hookKey: string;
    createHook?: () => HookHub;
}[];
/** Command hook类型*/
export interface ICmdHooks extends IHooks, NsGraphMeta.ICmdHooks, NsGraphLoadData.ICmdHooks, NsGraphSaveData.ICmdHooks, NsGraphLayout.ICmdHooks, NsGraphRender.ICmdHooks, NsGraphResize.ICmdHooks, NsGraphHistoryUndo.ICmdHooks, NsGraphHistoryRedo.ICmdHooks, NsGraphHistoryReset.ICmdHooks, NsGraphHistoryToggle.ICmdHooks, NsRedoCmd.ICmdHooks, NsUndoCmd.ICmdHooks, NsGraphZoom.ICmdHooks, NsGraphToggleMultiSelect.ICmdHooks, NsGraphCopySelection.ICmdHooks, NsGraphPasteSelection.ICmdHooks, NsGraphAddTool.ICmdHooks, NsGraphDelTool.ICmdHooks {
}
/** Command 参数类型*/
export declare namespace NsGraphCmd {
    namespace GraphMeta {
        type IArgs = Simplify<NsGraphMeta.IArgs>;
        type IResult = Simplify<NsGraphMeta.IResult>;
    }
    namespace GraphLoadData {
        type IArgs = Simplify<NsGraphLoadData.IArgs>;
        type IResult = Simplify<NsGraphLoadData.IResult>;
    }
    namespace SaveGraphData {
        type IArgs = Simplify<NsGraphSaveData.IArgs>;
        type IResult = Simplify<NsGraphSaveData.IResult>;
    }
    namespace GraphRender {
        type IArgs = Simplify<NsGraphRender.IArgs>;
        type IResult = Simplify<NsGraphRender.IResult>;
    }
    namespace GraphLayout {
        type IArgs = Simplify<NsGraphLayout.IArgs>;
        type IResult = Simplify<NsGraphLayout.IResult>;
    }
    namespace GraphResize {
        type IArgs = Simplify<NsGraphResize.IArgs>;
        type IResult = Simplify<NsGraphResize.IResult>;
    }
    namespace GraphHistoryRedo {
        type IArgs = Simplify<NsGraphHistoryRedo.IArgs>;
        type IResult = Simplify<NsGraphHistoryRedo.IResult>;
    }
    namespace GraphHistoryUndo {
        type IArgs = Simplify<NsGraphHistoryUndo.IArgs>;
        type IResult = Simplify<NsGraphHistoryUndo.IResult>;
    }
    namespace GraphHistoryReset {
        type IArgs = Simplify<NsGraphHistoryReset.IArgs>;
        type IResult = Simplify<NsGraphHistoryReset.IResult>;
    }
    namespace GraphHistoryToggle {
        type IArgs = Simplify<NsGraphHistoryToggle.IArgs>;
        type IResult = Simplify<NsGraphHistoryToggle.IResult>;
    }
    namespace UndoCmd {
        type IArgs = Simplify<NsUndoCmd.IArgs>;
        type IResult = Simplify<NsUndoCmd.IResult>;
    }
    namespace RedoCmd {
        type IArgs = Simplify<NsRedoCmd.IArgs>;
        type IResult = Simplify<NsRedoCmd.IResult>;
    }
    namespace GraphZoom {
        type IArgs = Simplify<NsGraphZoom.IArgs>;
        type IResult = Simplify<NsGraphZoom.IResult>;
    }
    namespace GraphFullscreen {
        type IArgs = Simplify<NsGraphFullscreen.IArgs>;
        type IResult = Simplify<NsGraphFullscreen.IResult>;
    }
    namespace GraphToggleMultiSelect {
        type IArgs = Simplify<NsGraphToggleMultiSelect.IArgs>;
        type IResult = Simplify<NsGraphToggleMultiSelect.IResult>;
    }
    namespace GraphCopySelection {
        type IArgs = Simplify<NsGraphCopySelection.IArgs>;
        type IResult = Simplify<NsGraphCopySelection.IResult>;
    }
    namespace GraphPasteSelection {
        type IArgs = Simplify<NsGraphPasteSelection.IArgs>;
        type IResult = Simplify<NsGraphPasteSelection.IResult>;
    }
    namespace GraphAddTool {
        type IArgs = Simplify<NsGraphAddTool.IArgs>;
        type IResult = Simplify<NsGraphAddTool.IResult>;
    }
    namespace GraphDelTool {
        type IArgs = Simplify<NsGraphDelTool.IArgs>;
        type IResult = Simplify<NsGraphDelTool.IResult>;
    }
}
