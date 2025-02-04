import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedRef,
    useSharedValue,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import { SectionList } from 'react-native';

import { useSectionCalculations } from '@hooks/useSectionCalculations';
import { useAnimatedHeader } from '@hooks/useAnimatedHeader';
import type { SectionListProps } from '@types/SectionListTypes';
import { SectionListItem } from './SectionListItem';
import { SectionHeader } from './SectionHeader';
import { StickyHeader } from './StickyHeader';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export const EnhancedSectionList = <T extends any>({
    sections,
    dimensions,
    renderItem,
    renderSectionHeader,
    renderStickyHeader,
    onSectionChange,
    headerAnimationConfig,
}: SectionListProps<T>) => {
    const scrollY = useSharedValue(0);
    const scrollRef = useAnimatedRef();
    const currentSection = useSharedValue(sections[0].title);

    // Calculate section breakpoints and dimensions
    const { breakpoints, dimensions: finalDimensions } = useSectionCalculations(sections, dimensions);

    // Setup animated header
    const { headerStyle, animationDuration } = useAnimatedHeader({
        scrollY,
        currentSection,
        dimensions: finalDimensions,
        animationConfig: headerAnimationConfig,
    });

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            'worklet';
            scrollY.value = event.contentOffset.y;
            console.log("breakpoints", breakpoints);
            for (let i = breakpoints.length - 1; i >= 0; i--) {
                if (scrollY.value >= breakpoints[i].y) {
                    if (currentSection.value !== breakpoints[i].title) {
                        currentSection.value = withTiming(breakpoints[i].title, {
                            duration: animationDuration
                        });
                        // Notify section change on JS thread
                        runOnJS(onSectionChange)(breakpoints[i].title);
                    }
                    break;
                }
            }
        },
    });

    const renderSectionHeaderComponent = ({ section: { title } }) => (
        <SectionHeader
            title={title}
            headerHeight={finalDimensions.headerHeight}
            renderSectionHeader={renderSectionHeader}
        />
    );

    const renderListItem = ({ item }) => (
        <SectionListItem
            item={item}
            renderItem={renderItem}
            itemHeight={finalDimensions.itemHeight}
        />
    );

    return (
        <View style={styles.container}>
            <AnimatedSectionList
                ref={scrollRef}
                sections={sections}
                renderItem={renderListItem}
                renderSectionHeader={renderSectionHeaderComponent}
                stickySectionHeadersEnabled={true}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
            <StickyHeader
                headerStyle={headerStyle}
                currentSection={currentSection}
                renderStickyHeader={renderStickyHeader}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});