import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px 15px;
  background-color: blueviolet;
  margin-top: 20px;
`;
export const ButtonText = styled.Text`
  font-weight: 700;
  color: #fff;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  width: 80%;
  border-radius: 10px;
  padding-left: 20px;
`;
