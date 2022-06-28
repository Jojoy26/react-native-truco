import React from 'react';

import {
  Container,
  Header,
  Row,
  AcepptButton,
  RejectButton,
  Text,
} from './styles';

const TrucoInterface = () => {
  return (
    <Container>
      <Header>Seu Oponente está pedindo truco</Header>
      <Row>
        <AcepptButton>
          <Text>Aceitar</Text>
        </AcepptButton>
        <RejectButton>
          <Text>Rejeitar</Text>
        </RejectButton>
      </Row>
    </Container>
  );
};

export default TrucoInterface;
