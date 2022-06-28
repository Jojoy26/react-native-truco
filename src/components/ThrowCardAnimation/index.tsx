import React, { forwardRef, ReactNode, useImperativeHandle } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  index: number;
  cardCount: number;
  animationValue: SharedValue<number>;
  children: ReactNode;
};

const ThrowCardAnimation = forwardRef(
  ({ index, cardCount, children, animationValue }: Props, ref) => {
    const translateXGoalValue = useSharedValue(0);
    const translateYGoal = Dimensions.get('screen').height / 2 - 108 - 10;

    useImperativeHandle(ref, () => ({
      // setTranslateXGoal will be called in FlipCard when player touch in the card
      // This function is for calculate how much the card need to translate in X axis to get the center of screen
      setTranslateXGoal() {
        if (cardCount === 3) {
          if (index === 0) {
            translateXGoalValue.value = 65 + 40;
          } else if (index === 1) {
            translateXGoalValue.value = 0;
          } else if (index === 2) {
            translateXGoalValue.value = (65 + 40) * -1;
          }
        } else if (cardCount === 2) {
          if (index === 0) {
            translateXGoalValue.value = 40 / 2 + 28.8;
          } else if (index === 1) {
            translateXGoalValue.value = (40 / 2 + 28.8) * -1;
          }
        } else if (cardCount === 1) {
          translateXGoalValue.value = 0;
        }
      },
    }));

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              animationValue.value,
              [0, 1],
              [0, translateYGoal * -1],
              Extrapolate.CLAMP,
            ),
          },
          {
            translateX: interpolate(
              animationValue.value,
              [0, 1],
              [0, translateXGoalValue.value],
              Extrapolate.CLAMP,
            ),
          },
        ],
        opacity: interpolate(
          animationValue.value,
          [0, 1],
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    });

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
  },
);

export default ThrowCardAnimation;
