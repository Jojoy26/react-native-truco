import React, { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { PointsType } from '../types/points_type';
import { useSocket } from './socket_context';

type GameUIContextType = {
  pointsInRound: PointsType;
  message: string | null;
  pointsInMatch: PointsType;
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

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    socket.current.on('attRoundPoints', (arg: PointsInRound[]) => {
      console.log('attRoundPoints');
      // I'm subtracting the playerId - 1 because there are two players one with id 1 and one with id 2
      // Then I'm getting the correct index in array
      setPointsInRound({
        playerPoints: arg[playerId.current - 1].pointsInRound,
        oponentPoints: arg[playerId.current === 1 ? 0 : 1].pointsInRound,
      });
    });
    socket.current.on('attCurrentPoints', (arg: PointsInMatch[]) => {
      console.log('attCurrentPoints');
      setPointsInMatch({
        playerPoints: arg[playerId.current - 1].pointsInMatch,
        oponentPoints: arg[playerId.current === 1 ? 0 : 1].pointsInMatch,
      });
    });
    socket.current.on('message', (arg: string) => {
      console.log('message');
      setMessage(arg);
    });
  }, []);

  return (
    <GameUIContext.Provider value={{ pointsInRound, message, pointsInMatch }}>
      {children}
    </GameUIContext.Provider>
  );
};
