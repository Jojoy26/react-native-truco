import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { Container, Points, MatchPoints } from './styles';

const PlayerPointsUI = () => {
  const pointsInRound = useContextSelector(
    GameUIContext,
    state => state.pointsInRound,
  );
  const pointsInMatch = useContextSelector(
    GameUIContext,
    state => state.pointsInMatch,
  );
  return (
    <Container>
      <Points>{pointsInRound.playerPoints}</Points>
      <MatchPoints>{pointsInMatch.playerPoints}</MatchPoints>
    </Container>
  );
};

export default PlayerPointsUI;
