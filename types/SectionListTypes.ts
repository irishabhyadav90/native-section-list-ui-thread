export interface Section<T> {
    title: string;
    data: T[];
}

export interface SectionBreakpoint {
    y: number;
    title: string;
}

export interface SectionDimensions {
    headerHeight: number;
    itemHeight: number;
}

export interface SectionListProps<T> {
    sections: Section<T>[];
    dimensions?: Partial<SectionDimensions>;
    renderItem: (item: T) => React.ReactElement;
    renderSectionHeader?: (title: string) => React.ReactElement;
    renderStickyHeader?: (title: string) => React.ReactElement;
    onSectionChange?: (sectionTitle: string) => void;
    headerAnimationConfig?: {
        duration?: number;
        opacity?: boolean;
        translate?: boolean;
    };
}