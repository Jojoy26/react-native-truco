import React, { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { PointsType } from '../types/points_type';
import { useSocket } from './socket_context';

type GameUIContextType = {
  pointsInRound: PointsType;
  pointsInMatch: PointsType;
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  alertMessage: Message;
  setAlertMessage: React.Dispatch<React.SetStateAction<Message>>;
};

export const GameUIContext = createContext({} as GameUIContextType);

type Props = {
  children: ReactNode;
};

type PointsInRound = {
  pointsInRound: number;
};

type PointsInMatch = {
  pointsInMatch: number;
};

type Message = {
  message: string;
};

export const GameUIProvider = ({ children }: Props) => {
  const { socket, playerId } = useSocket();

  const [pointsInRound, setPointsInRound] = useState<PointsType>({
    playerPoints: 0,
    oponentPoints: 0,
  } as PointsType);
  const [pointsInMatch, setPointsInMatch] = useState<PointsType>({
    playerPoints: 0,
    oponentPoints: 0,
  });

  const [message, setMessage] = useState<Message>({ message: '' });

  const [alertMessage, setAlertMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    socket.current.on('attRoundPoints', (arg: PointsInRound[]) => {
      // I'm subtracting the playerId - 1 because there are two players one with id 1 and one with id 2
      // Then I'm getting the correct index in array
      console.log(playerId.current - 1, playerId.current === 1 ? 0 : 1);
      setPointsInRound({
        playerPoints: arg[playerId.current - 1].pointsInRound,
        oponentPoints: arg[playerId.current !== 1 ? 0 : 1].pointsInRound,
      });
    });
    socket.current.on('attCurrentPoints', (arg: PointsInMatch[]) => {
      // I'm subtracting the playerId - 1 because there are two players one with id 1 and one with id 2
      // Then I'm getting the correct index in array
      setPointsInMatch({
        playerPoints: arg[playerId.current - 1].pointsInMatch,
        oponentPoints: arg[playerId.current !== 1 ? 0 : 1].pointsInMatch,
      });
    });
    socket.current.on('message', (arg: string) => {
      const obj = { message: arg };
      setMessage(obj);
    });
    socket.current.on('alertMessage', (arg: string) => {
      const obj = { message: arg };
      setAlertMessage(obj);
    });
  }, []);

  return (
    <GameUIContext.Provider
      value={{
        pointsInRound,
        pointsInMatch,
        message,
        setMessage,
        alertMessage,
        setAlertMessage,
      }}>
      {children}
    </GameUIContext.Provider>
  );
};
