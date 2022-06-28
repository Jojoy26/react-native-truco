import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  height: 108px;
  width: 65px;
  border-radius: 3px;
  overflow: hidden;
`;

export const FrontContainer = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
`;

export const BackContainer = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
`;

export const BackCardImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const FrontCardImage = styled.Image`
  height: 100%;
  width: 100%;
`;
