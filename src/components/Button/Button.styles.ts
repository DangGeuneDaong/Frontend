import styled, { css } from 'styled-components';
import { ButtonCSSProps } from '.';

export const Button = styled.button<ButtonCSSProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${(props) => props.width || '100%'};
  height: ${(props) => (props.height ? props.height : '40px')};
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: ${(props) => props.borderRadius || props.borderRadius};
  border-width: ${(props) => props.borderWidth || props.borderWidth};
  white-space: nowrap;

  // font weight, font-size 디자인 시스템
  ${(props) => props.theme.font.button}

  ${(props) => {
    if (props.inverted) {
      return css`
        background-color: transparent;
        border-color: ${props.theme.color.primary};
      `;
    }

    switch (props.styleType) {
      case 'primary':
        return `
          background-color: ${props.theme.color.primary};
        `;
      case 'warning':
        return `
          background-color: ${props.theme.color.red};
        `;
      case 'disabled':
        return `
          pointer-events: none;
          background-color: #eee;
          color: #bbb;
          cursor: none;
        `;
      default:
        return null;
    }
  }}
`;
