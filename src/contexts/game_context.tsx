import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContext } from 'use-context-selector';
import { useNavigation } from '@react-navigation/native';

import { CardType } from '../types/card_type';
import { useSocket } from './socket_context';
import { OponentCardType } from '../types/oponent_card_type';
import {
  runOnJS,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { withDelay } from 'react-native-reanimated/lib/types/lib/reanimated2/animation';
import { GameEndType } from '../types/game_end_type';
import { RematchType } from '../types/rematch_type';

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
  callTruco: () => void;
  isTruco: boolean;
  trucoCallbackFunction: React.MutableRefObject<
    ((response: boolean) => void) | null
  >;
  gameEndData: GameEndType | null;
  callRematch: () => void;
  hasRematchSolicitation: RematchType;
};

export const GameContext = createContext({} as GameContextType);

type Props = {
  children: ReactNode;
};

export const GameProvider = ({ children }: Props) => {
  const { socket, currentPlayerId, playerId, room } = useSocket();

  const navigation = useNavigation();

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

  // SharedValue used in DisappearAnimation
  const disappearAnimation = useSharedValue(0);

  // Ref used to save the function that the player receives when the opponent asks for truco
  const trucoCallbackFunction = useRef() as MutableRefObject<
    null | ((response: boolean) => void)
  >;

  // Condition to TrucoInterface appear or disappear
  const [isTruco, setIsTruco] = useState(false);

  // Condition to EndGameInterface appear or disappear
  const [gameEndData, setGameEndData] = useState<GameEndType | null>(null);

  // Ref used to add delay between truco solicitations
  const canCallTruco = useRef(true) as MutableRefObject<boolean>;

  // Used to know if is have rematch solicitation e verify if is current player that called for it
  const [hasRematchSolicitation, setHasRematchSolicitation] =
    useState<RematchType>({
      hasRematch: false,
      iscurrentPlayerCalledRematch: false,
    });

  // Ref used to save the the function that the player receives when the opponent asks for rematch
  const rematchCallbackFunction = useRef() as MutableRefObject<
    null | ((response: boolean) => void)
  >;

  // throwCard function is used to emit for socket that player throwed a card
  const throwCard = useCallback(
    (index: number) => {
      socket.current.emit('throwCard', {
        roomName: room.current,
        card: playerCards[index],
      });
      const copy = [...playerCards];
      copy.splice(index, 1);
      setCardStack(cardStackState => [...cardStackState, playerCards[index]]);
      setPlayerCards(copy);
    },
    [playerCards],
  );

  // Function called in TrucoButton to emit for server this player called for truco
  const callTruco = useCallback(() => {
    if (!canCallTruco.current) {
      return;
    }
    socket.current.emit('callTruco', { roomName: room.current });
    canCallTruco.current = false;

    setTimeout(() => {
      canCallTruco.current = true;
    }, 3500);
  }, []);

  // oponentThrowCard function will be called when socket receive throwCard
  // This function is used to set the oponentThrowedCard and remove one card of oponentCardsNumber
  const oponentThrowCard = useCallback((card: CardType) => {
    const copy = [...oponentCardsNumberRef.current];
    copy.pop();
    oponentCardsNumberRef.current = copy;
    setOponentCardsNumber(oponentCardsNumberRef.current);
    setOponentThrowedCard(card);
  }, []);

  // Function used to reset all cards in table
  const onDisappearAnimationEnd = useCallback(() => {
    setPlayerCards([]);
    setOponentCardsNumber([]);
    setCardStack([]);
  }, []);

  // Function used to call onDisappearAnimationEnd function and to set the disappearAnimation value to 0
  const reset = useCallback(() => {
    onDisappearAnimationEnd();
    disappearAnimation.value = 0;
  }, []);

  // Function used in EndGameInterface to callRematch
  const callRematch = useCallback(() => {
    if (hasRematchSolicitation.hasRematch) {
      rematchCallbackFunction.current(true);
      return;
    }
    socket.current.emit('callRematch', { roomName: room.current });
  }, []);

  useEffect(() => {
    // Socket emit giveCards before the gameStart to give the cards to player and oponent
    socket.current.on('giveCards', (cards: CardType[]) => {
      playerCardsRef.current = cards.map((item, index) => {
        return item;
      });
    });
    // Socket emit gameStart when gameStart
    socket.current.on('gameStart', () => {
      // Setting blank cards to start the giveCards animation in CardPack
      setBlankCards([0, 1, 2, 3, 4, 5]);
    });
    // Socket emit throw when oponent throw a card
    socket.current.on('throwCard', (card: CardType) => {
      oponentThrowCard(card);
    });
    // Socket emit matchEnd when the player or oponent win the match of 3 rounds
    socket.current.on('matchEnd', () => {
      // Setting blankCards to empty for stop the current animation
      setBlankCards([]);
      disappearAnimation.value = withTiming(1, undefined, isFinished => {
        if (isFinished) {
          runOnJS(reset)();
        }
      });
    });
    // Socket emit when the player or oponent throw a card
    socket.current.on('changePlayer', (id: number) => {
      currentPlayerId.current = id;
    });
    // Socket emit when the oponent call for truco
    socket.current.on('truco', (arg: (response: boolean) => any) => {
      trucoCallbackFunction.current = (response: boolean) => {
        arg(response);
        setIsTruco(false);
      };
      setIsTruco(true);
    });
    // Socket emit trucoReject when the player or oponent does not accepter the truco solicitation
    socket.current.on('trucoReject', () => {
      setIsTruco(false);
    });
    // Socket emit gameEnd when the player or oponent get 12 points, or if one of two players disconnect from the game
    socket.current.on('gameEnd', (arg: GameEndType) => {
      setGameEndData(arg);
    });
    // Socket emit rematch when oponent call for rematch
    socket.current.on('rematch', (arg: (response: boolean) => any) => {
      rematchCallbackFunction.current = arg;
      setHasRematchSolicitation({
        hasRematch: true,
        iscurrentPlayerCalledRematch: false,
      });
    });
    // Socket emit rematchSended to confirm the rematch solicitation of player
    socket.current.on('rematchSended', () => {
      setHasRematchSolicitation({
        hasRematch: true,
        iscurrentPlayerCalledRematch: true,
      });
    });
    // Socket emit rematchAccept when player or oponent accept the rematch
    socket.current.on('rematchAccept', () => {
      setGameEndData(null);
      setHasRematchSolicitation({
        hasRematch: false,
        iscurrentPlayerCalledRematch: false,
      });
    });
    // Socket emit rematchAccept when player or oponent decline the rematch
    socket.current.on('rematchDecline', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
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
        callTruco,
        isTruco,
        trucoCallbackFunction,
        gameEndData,
        callRematch,
        hasRematchSolicitation,
      }}>
      {children}
    </GameContext.Provider>
  );
};
