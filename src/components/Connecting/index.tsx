import React from 'react';
import { useSocket } from '../../contexts/socket_context';

import { Container, Text } from './styles';

const Connecting = () => {
  const { hasError } = useSocket();

  return (
    <Container colors={['#0A421C', '#0A4B1F']}>
      <Text>{hasError !== null ? hasError : 'Conectando...'}</Text>
    </Container>
  );
};

export default Connecting;
