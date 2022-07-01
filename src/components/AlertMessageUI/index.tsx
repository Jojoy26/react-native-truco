import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { AnimatedText } from './styles';

const AlertMessageUI = () => {
  const alertMessage = useContextSelector(
    GameUIContext,
    state => state.alertMessage,
  );

  const setAlertMessage = useContextSelector(
    GameUIContext,
    state => state.setAlertMessage,
  );

  const isMounted = useRef(true);

  const animation = useSharedValue(0);

  const height = Dimensions.get('screen').height;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animation.value,
            [0, 1],
            [0.6, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(animation.value, [0, 1], [0, 1], Extrapolate.CLAMP),
      bottom: interpolate(
        animation.value,
        [0, 1],
        [0, height * 0.3],
        Extrapolate.CLAMP,
      ),
    };
  });

  const setAlertMessageMiddleware = () => {
    if (isMounted.current) {
      setAlertMessage({ message: '' });
    }
  };

  useEffect((): any => {
    if (alertMessage !== null) {
      animation.value = withTiming(1);
      setTimeout(() => {
        animation.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(setAlertMessageMiddleware);
          }
        });
      }, 2000);
    }
    return () => (isMounted.current = false);
  }, [alertMessage]);

  return (
    <AnimatedText style={animatedStyle}>{alertMessage.message}</AnimatedText>
  );
};

export default AlertMessageUI;
