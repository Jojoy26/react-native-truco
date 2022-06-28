import React from 'react';

import 'react-native-get-random-values';
import { useContextSelector } from 'use-context-selector';
import { v4 as uuidv4 } from 'uuid';

import { GameContext } from '../../contexts/game_context';
import BlankCard from '../BlankCard';
import CardAnimation from '../CardAnimation';

import { Container } from './styles';

const CardPack = () => {
  const [
    setOponentCardsNumber,
    setPlayerCards,
    currentPlayerId,
    playerId,
    blankCards,
    setBlankCards,
    playerCardsRef,
  ] = useContextSelector(GameContext, state => [
    state.setOponentCardsNumber,
    state.setPlayerCards,
    state.currentPlayerId,
    state.playerId,
    state.blankCards,
    state.setBlankCards,
    state.playerCardsRef,
  ]);

  // Add card to oponentCards or playerCards when each card animation finish
  const onEnd = (isMine: boolean, _index: number) => {
    if (!isMine) {
      setOponentCardsNumber(oponentCardsNumberState => [
        ...oponentCardsNumberState,
        { uuid: uuidv4() },
      ]);
      return;
    }
    setPlayerCards(playerCardsState => {
      return [
        ...playerCardsState,
        playerCardsRef.current[playerCardsState.length],
      ];
    });
  };

  // Set blankCards to empty when all card animations finish
  const onAnimationEnd = () => {
    setBlankCards([]);
  };

  return (
    <Container>
      <BlankCard height={97.2} width={58.5} />
      {blankCards.map((item, index) => {
        return (
          <CardAnimation
            isMine={
              currentPlayerId.current === playerId.current
                ? index >= 3
                : index < 3
            }
            index={index}
            key={index}
            onCardAnimationEnd={onEnd}
            onAnimationEnd={onAnimationEnd}>
            <BlankCard height={97.2} width={58.5} />
          </CardAnimation>
        );
      })}
    </Container>
  );
};

export default CardPack;
