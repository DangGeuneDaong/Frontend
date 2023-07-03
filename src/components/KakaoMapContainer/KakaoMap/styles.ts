import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: calc(50% - 60px);
  bottom: 0;
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
  right: calc((100% - 530px) / 2);
  width: 120px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: bold;
  color: white;

  z-index: 2;
  height: 40px;
  background-color: #0D85FF;
  /* background-color: #FA5672; */
  /* border: 1px solid #FA5672; */
  /* background: linear-gradient(to left top, #FFCF5A, #7E3DD9 0%); */
`;

export const UploadPostImg = styled.img`
  width: 24px;
  height: 24px;
  padding: 0 0 2px 2px;
  filter: invert(100%); 
`;

export const SearchItemButton = styled.button`
  position: absolute;
  bottom: 12px;
  z-index: 2;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: bold;
  /* background-color: ${props => props.theme.color.primary}; */
  /* background-color:  #FA5672; */
  /* border: 1px solid #FA5672;   */
  border: 1px solid #0D85FF;  
  /* color: white; */
  /* background-color: #0D85FF; */
  background-color: white;
  /* background: linear-gradient(to left top, #FFCF5A, #7E3DD9 0%); */
  /* color: white; */
  
  &:hover {
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.18);
  }
`;
