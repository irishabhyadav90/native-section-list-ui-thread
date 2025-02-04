import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
interface SectionHeaderProps {
    title: string;
    headerHeight: number;
    renderSectionHeader?: (title: string) => React.ReactElement;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    headerHeight,
    renderSectionHeader,
}) => {
    if (renderSectionHeader) {
        return renderSectionHeader(title);
    }

    return (
        <Animated.View style={[styles.sectionHeader, { height: headerHeight }]}>
            <Animated.Text style={styles.sectionHeaderText}>{title}</Animated.Text>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    }
});