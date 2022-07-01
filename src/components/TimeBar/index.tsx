import React, { useEffect } from 'react';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Container, AnimatedBar } from './styles';

type Props = {
  seconds: number;
};

const TimeBar = ({ seconds }: Props) => {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(
        animation.value,
        [0, 1],
        [0, 100],
        Extrapolate.CLAMP,
      )}%`,
    };
  });

  useEffect(() => {
    animation.value = withTiming(1, { duration: seconds * 1000 });
  }, []);

  return (
    <Container>
      <AnimatedBar style={animatedStyle} />
    </Container>
  );
};

export default TimeBar;
