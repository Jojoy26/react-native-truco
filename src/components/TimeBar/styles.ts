import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  width: 80%;
  height: 15px;
  background-color: #000;
  overflow: hidden;
  border-radius: 15px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const AnimatedBar = styled(Animated.View)`
  height: 15px;
  width: 0px;
  background-color: blueviolet;
`;
