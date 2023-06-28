import styled from "styled-components";

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PageMoveButtonCSSProps {
  disabled: boolean;
}

interface PageNumCSSProps {
  isCurrent: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  height: 42px;
  color: rgba(0,0,0, 0.5);
  border-bottom: 1px solid rgba(0,0,0, 0.1);
`;

// AiOutlineLeft
export const PrevPageButton = styled(AiOutlineLeft)<PageMoveButtonCSSProps>`
  display: block;
  width: 22px;
  height: 22px;
  padding: 4px;
  border-radius: 50%;
  color: ${props => props.disabled && 'rgba(0,0,0, 0.1)'};
  cursor: ${props => !props.disabled && 'pointer'};

  &:hover {
    background-color: ${props => !props.disabled && 'rgba(0,0,0, 0.1)'};
  }
`;

export const PageNum = styled.button<PageNumCSSProps>`
  width: 22px;
  height: 22px;
  padding: 4px;
  border-radius: 50%;
  color: ${props => props.isCurrent && '#FA5672'};
  font-weight: ${props => props.isCurrent && 'bold'};
  text-decoration: ${props => props.isCurrent && 'underline'};

  &:hover {
    background-color: rgba(0,0,0, 0.1);
  }
`;

// AiOutlineRight
export const NextPageButton = styled(AiOutlineRight)<PageMoveButtonCSSProps>`
  display: block;
  width: 22px;
  height: 22px;
  padding: 4px;
  border-radius: 50%;
  color: ${props => props.disabled && 'rgba(0,0,0, 0.1)'};
  cursor: ${props => !props.disabled && 'pointer'};
  
  &:hover {
    background-color: ${props => !props.disabled && 'rgba(0,0,0, 0.1)'};
  }
`;