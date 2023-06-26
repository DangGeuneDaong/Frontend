import styled from "styled-components";

import { AiOutlineSearch } from 'react-icons/ai';

import removeIcon from '../../assets/imgs/remove-icon.png';

interface ItemSearchInputLabelCSSProps {
  focus: boolean;
}

interface ItemSearchButtonCSSProps {
  $isFocus: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 85px;
`;

export const ItemSearchInputLabel = styled.label<ItemSearchInputLabelCSSProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 310px;
  height: 45px;
  /* border: ${props => props.focus && '1.5px solid' + props.theme.color.primary}; */
  border: ${props => props.focus && '1.5px solid' + '#FA5672'};
  border-radius: 14px;
  background-color: transparent;
  box-shadow: ${props => !props.focus && '0 0 5px 2px rgba(0,0,0,0.1)'};
`;

export const ItemSearchInput = styled.input`
  margin-left: 4px;
  width: 250px;
  height: 32px;
  font-size: 15px;
  border: none;
  background-color: transparent;
`;

export const ItemSearchButton = styled(AiOutlineSearch)<ItemSearchButtonCSSProps>`
  display: flex;
  margin-left: 18px;
  width: 18px;
  height: 18px;
  /* color: ${props => props.$isFocus && props.theme.color.primary}; */
  color: ${props => props.$isFocus && '#FA5672'};
`;

export const RemoveInputValueButton = styled.button`
  display: block;
  margin-right: 16px;
  width: 12px;
  height: 12px;
  background: url(${removeIcon}) no-repeat;
  background-size: contain;
`;