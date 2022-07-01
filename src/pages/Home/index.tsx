import React, { useState } from 'react';
import { Container, Button, ButtonText, Input } from './styles';

const Home = ({ navigation }) => {
  const [inputText, setInputText] = useState('');

  return (
    <Container colors={['#0A421C', '#0A4B1F']}>
      <Input placeholder="Digite o nome da sala" onChangeText={setInputText} />
      <Button>
        <ButtonText
          onPress={() => {
            if (inputText.length >= 1) {
              navigation.navigate('Game', { roomName: inputText });
            }
          }}>
          Entrar
        </ButtonText>
      </Button>
    </Container>
  );
};

export default Home;
