import React, { useEffect } from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { AnimatedText } from './styles';

const MessageUI = () => {
  const message = useContextSelector(GameUIContext, state => state.message);
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animation.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(animation.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    };
  });

  useEffect(() => {
    if (message !== null) {
      animation.value = withTiming(1);
      setTimeout(() => {
        animation.value = withTiming(0);
      }, 1200);
    }
  }, [message]);

  return (
    <>
      {message !== null ? (
        <AnimatedText style={animatedStyle}>{message}</AnimatedText>
      ) : null}
    </>
  );
};

export default MessageUI;
