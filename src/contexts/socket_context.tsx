import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
  socket: MutableRefObject<Socket>;
  playerId: MutableRefObject<number>;
  currentPlayerId: MutableRefObject<number>;
};

const SocketContext = createContext({} as SocketContextType);

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  const socket = useRef(null) as unknown as MutableRefObject<Socket>;
  const playerId = useRef(null) as unknown as MutableRefObject<number>;
  const currentPlayerId = useRef(null) as unknown as MutableRefObject<number>;
  const [isConnected, setIsConnected] = useState(false);

  useEffect((): any => {
    socket.current = io('http://192.168.0.106:3333');
    socket.current.on('connect', () => {
      socket.current.emit('joinRoom', 'room');
    });
    socket.current.on('joinedSucessfully', (id, currentPlayer) => {
      playerId.current = id;
      currentPlayerId.current = currentPlayer;
      setIsConnected(true);
    });
    if (socket) {
      return () => socket.current.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, playerId, currentPlayerId }}>
      {isConnected === true ? children : null}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
