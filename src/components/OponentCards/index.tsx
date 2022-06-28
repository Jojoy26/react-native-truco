import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { GameContext } from '../../contexts/game_context';
import { CardType } from '../../types/card_type';
import Card from '../Card';
import OponentCard from '../OponentCard';
import OponentThrowCardAnimation from '../OponentThrowCardAnimation';

import { Container, CardsContainer } from './styles';

const OponentCards = () => {
  const oponentCardsNumber = useContextSelector(
    GameContext,
    state => state.oponentCardsNumber,
  );
  const oponentThrowedCard = useContextSelector(
    GameContext,
    state => state.oponentThrowedCard,
  );
  const setOponentThrowedCard = useContextSelector(
    GameContext,
    state => state.setOponentThrowedCard,
  );
  const setCardStack = useContextSelector(
    GameContext,
    state => state.setCardStack,
  );

  const onAnimationEnd = () => {
    setCardStack(cardStackState => [
      ...cardStackState,
      oponentThrowedCard as CardType,
    ]);
    setOponentThrowedCard(null);
  };

  return (
    <Container>
      <CardsContainer>
        {oponentCardsNumber.map((item, index) => {
          return <OponentCard key={item.uuid} index={index} />;
        })}
      </CardsContainer>
      {oponentThrowedCard !== null ? (
        <OponentThrowCardAnimation onAnimationEnd={onAnimationEnd}>
          <Card card={oponentThrowedCard} />
        </OponentThrowCardAnimation>
      ) : null}
    </Container>
  );
};

export default OponentCards;
