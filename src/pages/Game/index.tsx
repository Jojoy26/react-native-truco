import React from 'react';

import { Container } from './styles';
import CardPack from '../../components/CardPack';
import { GameProvider } from '../../contexts/game_context';
import CardStack from '../../components/CardStack';
import OponentCards from '../../components/OponentCards';
import { SocketProvider } from '../../contexts/socket_context';
import PlayerCards from '../../components/PlayerCards';
import { GameUIProvider } from '../../contexts/gameUI_context';
import PlayerPointsUI from '../../components/PlayerPointsUI';
import MessageUI from '../../components/MessageUI';
import TrucoButton from '../../components/TrucoButton';

const Game = () => {
  return (
    <SocketProvider>
      <GameProvider>
        <GameUIProvider>
          <Container colors={['#0A421C', '#0A4B1F']}>
            <CardStack />
            <CardPack />
            <OponentCards />
            <PlayerCards />
            <TrucoButton />
            <PlayerPointsUI />
            <MessageUI />
          </Container>
        </GameUIProvider>
      </GameProvider>
    </SocketProvider>
  );
};

export default Game;
