import styled, { css } from 'styled-components';
import { LoaderCSSProps } from '.';

const handleLoaderType = (props: LoaderCSSProps) => {
  switch (props.bgColor) {
    case 'white':
      return css`
        background-color: rgba(255, 255, 255, 0.5);
      `;
    case 'black':
      return css`
        background-color: rgba(0, 0, 0, 0.5);
      `;
    default:
      return css`
        background-color: transparent;
      `;
  }
};

export const LoaderContainer = styled.div<LoaderCSSProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  ${(props) => handleLoaderType(props)}
`;
