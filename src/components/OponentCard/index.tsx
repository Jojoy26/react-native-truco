import React, { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import AppearAnimation from '../AppearAnimation';
import BlankCard from '../BlankCard';
import DisappearAnimation from '../DisappearAnimation';
import { Container } from './styles';

type Props = {
  index: Number;
};

const OponentCard = ({ index }: Props) => {
  const setOponentCardsNumber = useContextSelector(
    GameContext,
    state => state.setOponentCardsNumber,
  );
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withTiming(1);
  }, []);

  return (
    <DisappearAnimation>
      <AppearAnimation animationValue={animation} index={index} isMine={false}>
        <Container>
          <BlankCard />
        </Container>
      </AppearAnimation>
    </DisappearAnimation>
  );
};

export default OponentCard;
