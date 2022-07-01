import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { GameContext } from '../../contexts/game_context';
import TimeBar from '../TimeBar';

import {
  Container,
  Header,
  Row,
  AcepptButton,
  RejectButton,
  Text,
} from './styles';

const TrucoInterface = () => {
  const isTruco = useContextSelector(GameContext, state => state.isTruco);
  const trucoCallbackFunction = useContextSelector(
    GameContext,
    state => state.trucoCallbackFunction,
  );

  return (
    <>
      {isTruco === true ? (
        <Container>
          <Header>Seu Oponente está pedindo truco</Header>
          <Row>
            <AcepptButton
              onPress={() => {
                if (trucoCallbackFunction.current !== null) {
                  trucoCallbackFunction.current(true);
                }
              }}>
              <Text>Aceitar</Text>
            </AcepptButton>
            <RejectButton
              onPress={() => {
                if (trucoCallbackFunction.current !== null) {
                  trucoCallbackFunction.current(false);
                }
              }}>
              <Text>Rejeitar</Text>
            </RejectButton>
          </Row>
          <TimeBar seconds={10} />
        </Container>
      ) : null}
    </>
  );
};

export default TrucoInterface;
