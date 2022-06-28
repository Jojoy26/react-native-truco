import React from 'react';
import { ImageContainer } from './styles';

type Props = {
  height?: number;
  width?: number;
};

const BlankCard = ({ height = 108, width = 65 }: Props) => {
  return (
    <ImageContainer
      height={height}
      width={width}
      resizeMode="stretch"
      source={{
        uri: 'https://media.istockphoto.com/vectors/playing-card-back-side-vector-id133281126?k=20&m=133281126&s=612x612&w=0&h=_Qn_dc02F4k5NuDni4m1jfMmGNTKgKy6aIBQN5pBKnY=',
      }}
    />
  );
};

export default BlankCard;
