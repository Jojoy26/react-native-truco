import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { Container, Points, MatchPoints } from './styles';

const PlayerPointsUI = () => {
  const { playerPoints } = useContextSelector(
    GameUIContext,
    state => state.pointsInRound,
  );
  const { playerPoints: playerPointsInMatch } = useContextSelector(
    GameUIContext,
    state => state.pointsInMatch,
  );
  return (
    <Container>
      <Points>{playerPoints}</Points>
      <MatchPoints>{playerPointsInMatch}</MatchPoints>
    </Container>
  );
};

export default PlayerPointsUI;
