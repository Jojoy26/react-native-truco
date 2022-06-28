import React from 'react';
import { CardType } from '../../types/card_type';

import { ImageContainer } from './styles';

type Props = {
  card: CardType;
};

const Card = ({ card }: Props) => {
  return (
    <ImageContainer
      resizeMode="stretch"
      source={{
        uri: card.image,
      }}
    />
  );
};

export default Card;
