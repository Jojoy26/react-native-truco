import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import FlipCard from '../FlipCard';
import { Container } from './styles';

const PlayerCards = () => {
  const playerCards = useContextSelector(
    GameContext,
    state => state.playerCards,
  );

  return (
    <Container>
      {playerCards.map((item, index) => {
        return <FlipCard key={item.uuid} index={index} />;
      })}
    </Container>
  );
};

export default PlayerCards;
