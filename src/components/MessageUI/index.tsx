import React, { useEffect, useRef } from 'react';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { AnimatedText } from './styles';

const MessageUI = () => {
  const message = useContextSelector(GameUIContext, state => state.message);

  const setMessage = useContextSelector(
    GameUIContext,
    state => state.setMessage,
  );

  const isMounted = useRef(true);

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

  const setMessageMiddleware = () => {
    if (isMounted.current) {
      setMessage({ message: '' });
    }
  };

  useEffect((): any => {
    if (message.message !== '') {
      animation.value = withTiming(1);
      setTimeout(() => {
        animation.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(setMessageMiddleware);
          }
        });
      }, 1200);
    }
    return () => (isMounted.current = false);
  }, [message]);

  return <AnimatedText style={animatedStyle}>{message.message}</AnimatedText>;
};

export default MessageUI;
