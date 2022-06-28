import styled from 'styled-components/native';

type ImageContainerProps = {
  height: number;
  width: number;
};

export const ImageContainer = styled.Image<ImageContainerProps>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border-radius: 3px;
`;
