import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

interface StickyHeaderProps {
    headerStyle: any;
    currentSection: SharedValue<string>;
    renderStickyHeader?: (title: string) => React.ReactElement;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
    headerStyle,
    currentSection,
    renderStickyHeader,
}) => {
    if (renderStickyHeader) {
        return <Animated.View style={headerStyle}>
            {renderStickyHeader(currentSection.value)}
        </Animated.View>;
    }

    return (
        <Animated.View style={headerStyle}>
            <Animated.Text style={styles.stickyHeaderText}>
                {currentSection.value}
            </Animated.Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    stickyHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});