import { renderHook } from '@testing-library/react-hooks';
import { useSectionCalculations } from '../../app/hooks/useSectionCalculations';

describe('useSectionCalculations', () => {
    const mockSections = [
        {
            title: 'Section 1',
            data: ['Item 1', 'Item 2'],
        },
        {
            title: 'Section 2',
            data: ['Item 1'],
        },
    ];

    it('calculates correct breakpoints with default dimensions', () => {
        const { result } = renderHook(() => useSectionCalculations(mockSections));

        expect(result.current.breakpoints).toEqual([
            { y: 0, title: 'Section 1' },
            { y: 140, title: 'Section 2' }, // (40 header + 2 * 50 items)
        ]);
        expect(result.current.totalHeight).toBe(230); // (140 + 40 + 1 * 50)
    });

    it('calculates correct breakpoints with custom dimensions', () => {
        const customDimensions = {
            headerHeight: 60,
            itemHeight: 80,
        };

        const { result } = renderHook(() =>
            useSectionCalculations(mockSections, customDimensions)
        );

        expect(result.current.breakpoints).toEqual([
            { y: 0, title: 'Section 1' },
            { y: 220, title: 'Section 2' }, // (60 header + 2 * 80 items)
        ]);
    });

    it('memoizes results for same inputs', () => {
        const { result, rerender } = renderHook(() =>
            useSectionCalculations(mockSections)
        );
        const firstResult = result.current;

        rerender();
        expect(result.current).toBe(firstResult);
    });
});