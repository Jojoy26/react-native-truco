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
import AlertMessageUI from '../../components/AlertMessageUI';
import TrucoInterface from '../../components/TrucoInterface';
import EndGameInterface from '../../components/EndGameInterface';
import OponentPointsUI from '../../components/OponentPointsUI';

const Game = ({ route }) => {
  const { roomName } = route.params;

  return (
    <SocketProvider roomName={roomName}>
      <GameProvider>
        <GameUIProvider>
          <Container colors={['#0A421C', '#0A4B1F']}>
            <CardStack />
            <CardPack />
            <OponentCards />
            <PlayerCards />
            <TrucoButton />
            <OponentPointsUI />
            <PlayerPointsUI />
            <MessageUI />
            <AlertMessageUI />
            <TrucoInterface />
            <EndGameInterface />
          </Container>
        </GameUIProvider>
      </GameProvider>
    </SocketProvider>
  );
};

export default Game;
