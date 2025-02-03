import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { SectionListItem } from '../../components/SectionListItem';

describe('SectionListItem', () => {
    const mockItem = 'Test Item';
    const mockRenderItem = (item: string) => <Text>{item}</Text>;
    const mockItemHeight = 50;

    it('uses custom render function', () => {
        const customRender = (item: string) => <Text>Custom {item}</Text>;
        const { getByText } = render(
            <SectionListItem
                item={mockItem}
                renderItem={customRender}
                itemHeight={mockItemHeight}
            />
        );

        expect(getByText('Custom Test Item')).toBeTruthy();
    });
});