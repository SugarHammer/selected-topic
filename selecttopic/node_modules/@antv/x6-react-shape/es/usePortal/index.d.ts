import React from 'react';
import type { Graph } from '@antv/x6';
export declare function createPortal(uniqViewId: string): {
    Portal: React.FC<Record<string, any>>;
    setGraph: (graph: Graph) => void;
};
export declare function usePortal(uniqViewId: string): [React.FC<Record<string, any>>, (graph: Graph) => void];
