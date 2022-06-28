import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const Button = styled.TouchableOpacity`
  background-color: blueviolet;
  padding: 10px 15px;
  border-radius: 10px;

  position: absolute;
  right: 10px;
  bottom: ${height * 0.3}px;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
