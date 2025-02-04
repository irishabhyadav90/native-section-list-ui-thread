import { useMemo } from 'react';
import type { Section, SectionDimensions } from '@types/SectionListTypes';

const DEFAULT_DIMENSIONS: SectionDimensions = {
    headerHeight: 40,
    itemHeight: 50,
};

export const useSectionCalculations = <T>(
    sections: Section<T>[],
    dimensions: Partial<SectionDimensions> = {}
) => {
    const { headerHeight, itemHeight } = { ...DEFAULT_DIMENSIONS, ...dimensions };

    return useMemo(() => {
        const sectionHeights = sections.map(section => ({
            title: section.title,
            height: headerHeight + (section.data.length * itemHeight)
        }));

        let accumulatedHeight = 0;
        const breakpoints = sectionHeights.map(section => {
            const breakpoint = accumulatedHeight;
            accumulatedHeight += section.height;
            return {
                y: breakpoint,
                title: section.title
            };
        });

        return {
            breakpoints,
            totalHeight: accumulatedHeight,
            dimensions: { headerHeight, itemHeight }
        };
    }, [sections, headerHeight, itemHeight]);
};

