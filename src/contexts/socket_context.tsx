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
import Connecting from '../components/Connecting';

type SocketContextType = {
  socket: MutableRefObject<Socket>;
  playerId: MutableRefObject<number>;
  currentPlayerId: MutableRefObject<number>;
  room: MutableRefObject<string>;
  hasError: string | null;
};

const SocketContext = createContext({} as SocketContextType);

type Props = {
  children: ReactNode;
  roomName: string;
};

export const SocketProvider = ({ children, roomName }: Props) => {
  const socket = useRef(null) as unknown as MutableRefObject<Socket>;
  const playerId = useRef(null) as unknown as MutableRefObject<number>;
  const currentPlayerId = useRef(null) as unknown as MutableRefObject<number>;
  const room = useRef(roomName) as MutableRefObject<string>;
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);

  useEffect((): any => {
    socket.current = io('https://truco-backend-app.herokuapp.com/');
    socket.current.on('connect', () => {
      socket.current.emit('joinRoom', room.current);
    });
    socket.current.on('joinedSucessfully', (id, currentPlayer) => {
      playerId.current = id;
      currentPlayerId.current = currentPlayer;
      setIsConnected(true);
    });
    socket.current.on('error', () => {
      setHasError('Erro ao entrar na sala');
    });
    socket.current.on('fullRoom', () => {
      setHasError('Sala cheia');
    });
    if (socket) {
      return () => socket.current.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, playerId, currentPlayerId, room, hasError }}>
      {isConnected === true ? children : <Connecting />}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
