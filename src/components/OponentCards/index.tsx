import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { GameContext } from '../../contexts/game_context';
import { CardType } from '../../types/card_type';
import Card from '../Card';
import OponentCard from '../OponentCard';
import OponentThrowCardAnimation from '../OponentThrowCardAnimation';

import { Container, CardsContainer } from './styles';

const OponentCards = () => {
  const [
    oponentCardsNumber,
    oponentThrowedCard,
    setOponentThrowedCard,
    setCardStack,
  ] = useContextSelector(GameContext, state => [
    state.oponentCardsNumber,
    state.oponentThrowedCard,
    state.setOponentThrowedCard,
    state.setCardStack,
  ]);

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
