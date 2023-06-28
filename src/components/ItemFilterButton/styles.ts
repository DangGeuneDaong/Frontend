import styled from "styled-components";

interface ContainerCSSProps {
  $isFocus: boolean;
}

export const ItemFilterButton = styled.button<ContainerCSSProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 38px;
  height: 28px;
  border: 1px solid ${props => props.$isFocus ? '#FA5672' : 'rgba(0,0,0, 0.1)'};
  border-radius: 14px;

  &:hover {
    border: 1px solid #fa5672;
  }
`;

export const ItemFilterButtonImg = styled.img`
  width: 20px;
  height: 20px;
`;

