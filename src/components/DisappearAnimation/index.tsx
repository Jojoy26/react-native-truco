import React, { ReactNode, useEffect } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';

type Props = {
  children: ReactNode;
};

const DisappearAnimation = ({ children }: Props) => {
  const disappearAnimation = useContextSelector(
    GameContext,
    state => state.disappearAnimation,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            disappearAnimation.value,
            [0, 1],
            [0, -200],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            disappearAnimation.value,
            [0, 1],
            [1, 0.7],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        disappearAnimation.value,
        [0, 1],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default DisappearAnimation;
