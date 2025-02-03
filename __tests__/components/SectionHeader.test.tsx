import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { SectionHeader } from '../../components/SectionHeader';

describe('SectionHeader', () => {
    const mockTitle = 'Test Section';
    const mockHeaderHeight = 40;

    it('renders default header with correct title and height', () => {
        const { getByText, root } = render(
            <SectionHeader
                title={mockTitle}
                headerHeight={mockHeaderHeight}
            />
        );

        expect(getByText(mockTitle)).toBeTruthy();
        expect(root.props.style).toHaveProperty('height', mockHeaderHeight);
    });

    it('uses custom header renderer when provided', () => {
        const customRenderer = (title: string) => <Text>Custom Header: {title}</Text>;
        const { getByText } = render(
            <SectionHeader
                title={mockTitle}
                headerHeight={mockHeaderHeight}
                renderSectionHeader={customRenderer}
            />
        );

        expect(getByText('Custom Header: Test Section')).toBeTruthy();
    });
});