import { Link } from "react-router-dom";
import styled from "styled-components";

interface ItemInfoCSSProps {
  isOpenModal: boolean;
}

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const ItemInfo = styled.div<ItemInfoCSSProps>`
  display: flex;
  flex-direction: column;
  min-width: 442px;
  max-width: 442px;
  height: 700px;
  background-color: ${props => props.isOpenModal && 'rgba(0,0,0, 0.15)'};
`;

export const ItemFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: center;
`;

export const RegisterGood = styled(Link)`
  position: absolute;
  top: 15px;
  left: 460px;
  z-index: 2;
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 12px;
  background-color: #FA5672;
  color: white;
`;