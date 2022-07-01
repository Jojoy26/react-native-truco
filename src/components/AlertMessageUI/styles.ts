import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const AnimatedText = styled(Animated.Text)`
  position: absolute;
  bottom: 0px;
  font-size: 20px;
  color: #fff;
  text-align: center;
  padding: 0px 50px;
  font-weight: 600;
  z-index: 10;
`;
