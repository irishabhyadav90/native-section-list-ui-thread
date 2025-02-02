import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SectionListItemProps<T> {
    item: T;
    renderItem: (item: T) => React.ReactElement;
    itemHeight: number;
}

export const SectionListItem = <T,>({
    item,
    renderItem,
    itemHeight,
}: SectionListItemProps<T>) => (
    <View style={[styles.item, { height: itemHeight }]}>
        {renderItem(item)}
    </View>
);

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
});