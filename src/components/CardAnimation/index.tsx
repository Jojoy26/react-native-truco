import React, { ReactNode, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

type Props = {
  isMine: boolean;
  children: ReactNode;
  index: number;
  onCardAnimationEnd: (isMine: boolean, index: number) => void;
  onAnimationEnd: () => void;
};

const CardAnimation = ({
  isMine,
  children,
  index,
  onCardAnimationEnd,
  onAnimationEnd,
}: Props) => {
  const height = Dimensions.get('screen').height;
  const translateY = height / 2 - 100;

  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animation.value,
            [0, 1],
            [0, isMine ? translateY : translateY * -1],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            animation.value,
            [0, 1],
            [0, -60],
            Extrapolate.CLAMP,
          ),
        },
      ],

      display: `${
        interpolate(animation.value, [0, 1], [0, 1], Extrapolate.CLAMP) !== 1
          ? 'flex'
          : 'none'
      }`,
    };
  });

  useEffect(() => {
    animation.value = withDelay(
      300 * index,
      withTiming(1, { duration: 600 }, isFinished => {
        if (isFinished) {
          runOnJS(onCardAnimationEnd)(isMine, index);
          if (index === 5) {
            runOnJS(onAnimationEnd)();
          }
        }
      }),
    );
  }, []);

  return (
    <Animated.View style={[animatedStyle, { position: 'absolute' }]}>
      {children}
    </Animated.View>
  );
};

export default CardAnimation;
