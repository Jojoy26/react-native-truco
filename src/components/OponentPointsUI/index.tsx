import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameUIContext } from '../../contexts/gameUI_context';

import { Container, Points, MatchPoints } from './styles';

const OponentPointsUI = () => {
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
      <MatchPoints>{pointsInMatch.oponentPoints}</MatchPoints>
      <Points>{pointsInRound.oponentPoints}</Points>
    </Container>
  );
};

export default OponentPointsUI;
