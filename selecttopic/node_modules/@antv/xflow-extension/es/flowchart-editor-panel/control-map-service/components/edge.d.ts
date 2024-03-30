import React from 'react';
export declare type MarkerCfg = {
    width?: number;
    height?: number;
    name?: string;
};
export interface IConfig {
    label?: string;
    attrs?: {
        line?: {
            fontSize?: number;
            fontFill?: string;
            strokeWidth?: number;
            sourceMarker?: MarkerCfg;
            targetMarker?: MarkerCfg;
            strokeDasharray?: number[];
        };
    };
}
export declare const EdgeService: React.FC<any>;
