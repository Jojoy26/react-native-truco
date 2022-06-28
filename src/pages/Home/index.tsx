import React from 'react';
import { Container, Button, ButtonText } from './styles';

const Home = ({ navigation }) => {
  return (
    <Container>
      <Button>
        <ButtonText
          onPress={() => {
            navigation.navigate('Game');
          }}>
          Game
        </ButtonText>
      </Button>
    </Container>
  );
};

export default Home;
