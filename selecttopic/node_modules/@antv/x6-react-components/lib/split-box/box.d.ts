import React from 'react';
export declare class Box extends React.PureComponent<Box.Props> {
    render(): JSX.Element;
}
export declare namespace Box {
    interface Props {
        style?: React.CSSProperties;
        className?: string;
        currentSize?: number | string;
        oppositeSize?: number | string;
        index: 1 | 2;
        vertical: boolean;
        isPrimary: boolean;
        refIt: React.LegacyRef<HTMLDivElement>;
    }
}
