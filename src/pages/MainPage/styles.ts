import { Link } from "react-router-dom";
import styled from "styled-components";

interface ItemInfoCSSProps {
  isOpenModal: boolean;
}

export const Container = styled.div`
  display: flex;
  position: relative;
  min-width: 690px;
  height: calc(100vh - var(--header-height) - var(--footer-height));
`;

export const ItemInfo = styled.div<ItemInfoCSSProps>`
  display: flex;
  flex-direction: column;
  min-width: 442px;
  max-width: 442px;
  /* height: 700px; */
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${props => props.isOpenModal && 'rgba(0,0,0, 0.15)'};
`;

export const ItemFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 8px;
`;

export const UploadPost = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 13px;
  /* right: 12px; */ // 우측 하단
  /* right: calc((100% - 690px) / 2);
  width: 40px;
  border-radius: 50%; */
  
  gap: 6px;
  right: calc((100% - 850px) / 2);
  width: 120px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: bold;
  color: white;

  z-index: 2;
  height: 40px;
  background-color: #FA5672;
  /* border: 1px solid #FA5672; */
  /* background: linear-gradient(to left top, #FFCF5A, #7E3DD9 0%); */
`;

export const UploadPostImg = styled.img`
  width: 24px;
  height: 24px;
  padding: 0 0 2px 2px;
  filter: invert(100%); 
`;