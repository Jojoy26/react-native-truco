import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import Card from '../Card';
import DisappearAnimation from '../DisappearAnimation';

import { Container, CardContainer } from './styles';

const CardStack = () => {
  const cardStack = useContextSelector(GameContext, state => state.cardStack);

  return (
    <Container>
      {cardStack.map((item, index) => {
        return (
          <CardContainer key={item.uuid}>
            <DisappearAnimation>
              <Card card={item} />
            </DisappearAnimation>
          </CardContainer>
        );
      })}
    </Container>
  );
};

export default CardStack;
