import React, { ReactNode } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  animationValue: SharedValue<number>;
  index: Number;
  children: ReactNode;
  isMine: Boolean;
};

const AppearAnimation = ({ animationValue, index, children, isMine }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft:
        index === 0
          ? interpolate(
              animationValue.value,
              [0, 1],
              [isMine ? 60 : 0, 0],
              Extrapolate.CLAMP,
            )
          : interpolate(
              animationValue.value,
              [0, 1],
              [isMine ? 50 : 40, isMine ? 40 : 50],
              Extrapolate.CLAMP,
            ),
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default AppearAnimation;
