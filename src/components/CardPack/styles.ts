import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;
const m = height / 2 - 100;

export const Container = styled.View`
  position: absolute;
  right: 10px;
  top: ${m}px;
`;
