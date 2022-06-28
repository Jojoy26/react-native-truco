import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContext } from 'use-context-selector';

import { CardType } from '../types/card_type';
import { useSocket } from './socket_context';
import { OponentCardType } from '../types/oponent_card_type';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

type GameContextType = {
  playerCards: CardType[];
  setPlayerCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  oponentCardsNumber: OponentCardType[];
  setOponentCardsNumber: React.Dispatch<
    React.SetStateAction<OponentCardType[]>
  >;
  cardStack: CardType[];
  setCardStack: React.Dispatch<React.SetStateAction<CardType[]>>;
  currentPlayerId: React.MutableRefObject<number>;
  playerId: React.MutableRefObject<number>;
  blankCards: number[];
  setBlankCards: React.Dispatch<React.SetStateAction<number[]>>;
  throwCard: (index: number) => void;
  oponentThrowedCard: null | CardType;
  setOponentThrowedCard: React.Dispatch<React.SetStateAction<CardType | null>>;
  playerCardsRef: React.MutableRefObject<CardType[]>;
  disappearAnimation: SharedValue<number>;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: ReactNode;
};

export const GameProvider = ({ children }: Props) => {
  const { socket, currentPlayerId, playerId } = useSocket();

  // cardStack are the cards that players have already played
  const [cardStack, setCardStack] = useState([] as CardType[]);

  // playerCards are the cards of player
  const [playerCards, setPlayerCards] = useState([] as CardType[]);

  // oponentCardsNumber are the number of cards that oponent have
  const [oponentCardsNumber, setOponentCardsNumber] = useState(
    [] as OponentCardType[],
  );

  // blankCards are just used to represent the give cards animation
  const [blankCards, setBlankCards] = useState([] as number[]);

  // oponentThrowedCard is used to create a card that oponent throwed and then start animation
  const [oponentThrowedCard, setOponentThrowedCard] = useState<null | CardType>(
    null,
  );

  // Is used to save the cards of player when the game give the cards, and later will be used to set playerCards
  const playerCardsRef = useRef([] as CardType[]);

  // This ref was created to save the state of oponentCardsNumber because the state inside socket.on is not changing when oponentCardsNumber is chaging
  const oponentCardsNumberRef = useRef([] as OponentCardType[]);

  const disappearAnimation = useSharedValue(0);

  // throwCard function is used to emit for socket that player throwed a card
  const throwCard = useCallback(
    (index: number) => {
      socket.current.emit('throwCard', {
        roomName: 'room',
        card: playerCards[index],
      });
      const copy = [...playerCards];
      copy.splice(index, 1);
      setCardStack(cardStackState => [...cardStackState, playerCards[index]]);
      setPlayerCards(copy);
    },
    [playerCards],
  );

  // oponentThrowCard function will be called when socket receive throwCard
  // This function is used to set the oponentThrowedCard and remove one card of oponentCardsNumber
  const oponentThrowCard = useCallback((card: CardType) => {
    const copy = [...oponentCardsNumberRef.current];
    copy.pop();
    oponentCardsNumberRef.current = copy;
    setOponentCardsNumber(oponentCardsNumberRef.current);
    setOponentThrowedCard(card);
  }, []);

  const onDisappearAnimationEnd = useCallback(() => {
    setPlayerCards([]);
    setOponentCardsNumber([]);
    setCardStack([]);
  }, []);

  const reset = useCallback(() => {
    onDisappearAnimationEnd();
    disappearAnimation.value = 0;
  }, []);

  useEffect(() => {
    socket.current.on('giveCards', (cards: CardType[]) => {
      playerCardsRef.current = cards.map((item, index) => {
        return item;
      });
    });
    socket.current.on('gameStart', () => {
      setBlankCards([0, 1, 2, 3, 4, 5]);
    });
    socket.current.on('throwCard', (card: CardType) => {
      oponentThrowCard(card);
    });
    socket.current.on('matchEnd', () => {
      onDisappearAnimationEnd();
    });
    socket.current.on('changePlayer', (id: number) => {
      currentPlayerId.current = id;
    });
  }, []);

  useEffect(() => {
    oponentCardsNumberRef.current = oponentCardsNumber;
  }, [oponentCardsNumber]);

  return (
    <GameContext.Provider
      value={{
        playerCards,
        setPlayerCards,
        oponentCardsNumber,
        setOponentCardsNumber,
        cardStack,
        setCardStack,
        currentPlayerId,
        playerId,
        blankCards,
        setBlankCards,
        throwCard,
        oponentThrowedCard,
        setOponentThrowedCard,
        playerCardsRef,
        disappearAnimation,
      }}>
      {children}
    </GameContext.Provider>
  );
};
