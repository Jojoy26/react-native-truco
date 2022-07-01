import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import TimeBar from '../TimeBar';

import {
  Container,
  Header,
  Message,
  Scoreboard,
  Player,
  Pontuation,
  PlayerName,
  RematchButton,
  ButtonText,
} from './styles';

const EndGameInterface = () => {
  const gameEndData = useContextSelector(
    GameContext,
    state => state.gameEndData,
  );
  const hasRematchSolicitation = useContextSelector(
    GameContext,
    state => state.hasRematchSolicitation,
  );
  const callRematch = useContextSelector(
    GameContext,
    state => state.callRematch,
  );
  const rematchCallbackFunction = useContextSelector(
    GameContext,
    state => state.rematchCallbackFunction,
  );

  return (
    <>
      {gameEndData !== null ? (
        <Container>
          <Header>O jogo acabou</Header>
          <Message>{gameEndData.message}</Message>
          <Scoreboard>
            <Player>
              <PlayerName>Você</PlayerName>
              <Pontuation>{gameEndData.scoreboard.playerPontuation}</Pontuation>
            </Player>
            <Player>
              <PlayerName>Oponente</PlayerName>
              <Pontuation>
                {gameEndData.scoreboard.oponentPontuation}
              </Pontuation>
            </Player>
          </Scoreboard>
          <RematchButton onPress={callRematch}>
            <ButtonText>
              {!hasRematchSolicitation.hasRematch
                ? 'Revanche'
                : hasRematchSolicitation.iscurrentPlayerCalledRematch &&
                  hasRematchSolicitation.hasRematch
                ? 'Esperando oponente'
                : 'Seu oponente pediu por revanche, aceitar?'}
            </ButtonText>
          </RematchButton>
          {hasRematchSolicitation.hasRematch ? <TimeBar seconds={15} /> : null}
        </Container>
      ) : null}
    </>
  );
};

export default EndGameInterface;
