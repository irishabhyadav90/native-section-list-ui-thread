import {
    useAnimatedStyle,
    interpolate,
    SharedValue
} from 'react-native-reanimated';
import type { SectionDimensions } from '@types/SectionListTypes';

interface AnimatedHeaderConfig {
    scrollY: SharedValue<number>;
    currentSection: SharedValue<string>;
    dimensions: SectionDimensions;
    animationConfig?: {
        duration?: number;
        opacity?: boolean;
        translate?: boolean;
    };
}

export const useAnimatedHeader = ({
    scrollY,
    currentSection,
    dimensions,
    animationConfig = {}
}: AnimatedHeaderConfig) => {
    const { headerHeight } = dimensions;
    const {
        duration = 100,
        opacity = true,
        translate = true
    } = animationConfig;

    const headerStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: headerHeight,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
        paddingLeft: 15,
        ...(translate && {
            transform: [{
                translateY: interpolate(
                    scrollY.value,
                    [-1, 0, headerHeight],
                    [0, 0, headerHeight / 2],
                    'clamp'
                ),
            }],
        }),
        ...(opacity && {
            opacity: interpolate(
                scrollY.value,
                [0, headerHeight / 2, headerHeight],
                [1, 0.5, 0],
                'clamp'
            ),
        }),
    }));

    return {
        headerStyle,
        currentSection,
        animationDuration: duration,
    };
};