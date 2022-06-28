import React, { ReactNode, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  onAnimationEnd: () => void;
};

const OponentThrowCardAnimation = ({ children, onAnimationEnd }: Props) => {
  const animation = useSharedValue(0);
  const translateYGoal = Dimensions.get('screen').height / 2 - 216;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animation.value,
            [0, 1],
            [0.3, 1],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            animation.value,
            [0, 1],
            [0, translateYGoal],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        animation.value,
        [0, 1],
        [0.3, 0.7],
        Extrapolate.CLAMP,
      ),
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, { duration: 300 }, isFinished => {
      if (isFinished) {
        runOnJS(onAnimationEnd)();
      }
    });
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default OponentThrowCardAnimation;
