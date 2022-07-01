import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);

  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const Header = styled.Text`
  font-size: 21px;
  color: #eee;
  font-weight: 700;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const AcepptButton = styled.TouchableOpacity`
  padding: 10px 15px;
  background-color: green;
  border-radius: 10px;
`;

export const RejectButton = styled.TouchableOpacity`
  margin-left: 40px;
  padding: 10px 15px;
  background-color: red;
  border-radius: 10px;
`;

export const Text = styled.Text`
  color: #fff;
`;
