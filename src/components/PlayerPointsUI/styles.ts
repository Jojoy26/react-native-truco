import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const Container = styled.View`
  position: absolute;
  bottom: ${height * 0.3}px;
  left: 10px;
`;

export const Points = styled.Text`
  font-size: 27px;
  font-weight: 600;
`;

export const MatchPoints = styled.Text`
  font-size: 27px;
  font-weight: 600;
  color: yellow;
`;
