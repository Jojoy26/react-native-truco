import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import AppearAnimation from '../AppearAnimation';
import DisappearAnimation from '../DisappearAnimation';
import ThrowCardAnimation from '../ThrowCardAnimation';

import {
  FrontContainer,
  BackContainer,
  Container,
  BackCardImage,
  FrontCardImage,
} from './styles';

type Props = {
  index: number;
};

const FlipCard = ({ index }: Props) => {
  const playerCards = useContextSelector(
    GameContext,
    state => state.playerCards,
  );
  const throwCard = useContextSelector(GameContext, state => state.throwCard);
  const currentPlayerId = useContextSelector(
    GameContext,
    state => state.currentPlayerId,
  );
  const playerId = useContextSelector(GameContext, state => state.playerId);

  const throwCardAnimationRef = useRef(null);

  const flipAnimation = useSharedValue(0);
  const throwCardAnimation = useSharedValue(0);
  const rotate = useSharedValue(0);

  const runRotate = () => {
    rotate.value = withTiming(1);
  };

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            rotate.value,
            [0, 1],
            [180, 360],
            Extrapolate.CLAMP,
          )}deg`,
        },
      ],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            rotate.value,
            [0, 1],
            [0, 90],
            Extrapolate.CLAMP,
          )}deg`,
        },
      ],
    };
  });

  // Call animation and throwCard function if is in the player turn
  const handleThrowCard = () => {
    if (currentPlayerId.current !== playerId.current) {
      return;
    }

    // Changing currentPlayerId to the player not throw another card before the action arrive to server and change player
    currentPlayerId.current = -10;

    throwCardAnimationRef.current.setTranslateXGoal();
    throwCardAnimation.value = withTiming(1, undefined, isFinished => {
      if (isFinished) {
        runOnJS(throwCard)(index);
      }
    });
  };

  useEffect(() => {
    flipAnimation.value = withTiming(1, { duration: 300 }, isFinished => {
      if (isFinished) {
        runOnJS(runRotate)();
      }
    });
  });

  return (
    <DisappearAnimation>
      <AppearAnimation
        index={index}
        animationValue={flipAnimation}
        isMine={true}>
        <TouchableOpacity onPress={handleThrowCard}>
          <ThrowCardAnimation
            index={index}
            cardCount={playerCards.length}
            animationValue={throwCardAnimation}
            ref={throwCardAnimationRef}>
            <Container>
              <FrontContainer style={frontCardStyle}>
                <FrontCardImage
                  resizeMode="stretch"
                  source={{
                    uri: playerCards[index].image,
                  }}
                />
              </FrontContainer>
              <BackContainer style={backCardStyle}>
                <BackCardImage
                  resizeMode="stretch"
                  source={{
                    uri: 'https://media.istockphoto.com/vectors/playing-card-back-side-vector-id133281126?k=20&m=133281126&s=612x612&w=0&h=_Qn_dc02F4k5NuDni4m1jfMmGNTKgKy6aIBQN5pBKnY=',
                  }}
                />
              </BackContainer>
            </Container>
          </ThrowCardAnimation>
        </TouchableOpacity>
      </AppearAnimation>
    </DisappearAnimation>
  );
};

export default FlipCard;
