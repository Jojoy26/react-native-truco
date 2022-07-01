import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;

  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Header = styled.Text`
  font-size: 21px;
  color: #eee;
  font-weight: 700;
`;

export const Message = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: 700;
  text-align: center;
`;

export const Scoreboard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin-top: 20px;
`;

export const Player = styled.View`
  align-items: center;
`;

export const Pontuation = styled.Text`
  font-size: 19px;
  color: #eee;
  font-weight: 700;
`;

export const PlayerName = styled.Text`
  font-size: 19px;
  color: #eee;
  font-weight: 700;
`;

export const RematchButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: blueviolet;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  color: #eee;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
`;
