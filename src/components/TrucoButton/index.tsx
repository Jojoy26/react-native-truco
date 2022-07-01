import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';

import { Button, ButtonText } from './styles';

const TrucoButton = () => {
  const callTruco = useContextSelector(GameContext, state => state.callTruco);

  return (
    <Button onPress={callTruco}>
      <ButtonText>Truco</ButtonText>
    </Button>
  );
};

export default TrucoButton;
