import styled, { css } from 'styled-components';
import { UplodePageCSSProps } from '.';

export const Container = styled.div`
  width: 100%;
  max-width: calc(1080px + 24px * 2);
  padding: 0 24px;
  margin: 88px auto 50px;
`;

export const Inner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  padding: 32px 34px;
`;

export const Title = styled.p`
  ${(props) => props.theme.font.heading_sm};
`;

export const DropdownContainer = styled.div`
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
`;

export const InputContainer = styled.div<UplodePageCSSProps>`
  display: flex;
  align-items: ${(props) =>
    props.inputContainerDirection === 'row' ? 'center' : 'flex-start'};
  flex-direction: ${(props) => props.inputContainerDirection || 'column'};
  padding: 14px 16px;
  border-top: 3px solid ${(props) => props.theme.color.primary};

  ${(props) => {
    switch (props.inputContainerDirection) {
      case 'row':
        return css`
          ${Title} {
            margin-right: 10px;
          }
        `;
      case 'column':
        return css`
          margin-bottom: 5px;
        `;
      default:
        return css`
          ${Title} {
            margin-right: 10px;
          }
        `;
    }
  }}
`;

export const HashtagContainer = styled.div`
  margin-bottom: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0 8px;
`;
