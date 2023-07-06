import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: calc(50% - 140px);
  bottom: 0;
`;

export const SearchItemButton = styled.button`
  position: absolute;
  bottom: 12px;
  z-index: 2;
  width: 140px;
  height: 50px;
  line-height: 50px;
  border-radius: 24px;
  background-color: #FA5672;
  color: white;
  font-size: 14px;
  font-weight: bold;

  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.18);
    background-color: rgb(255, 69, 100);
    transform: scale(1.04);
  }
`;

export const UploadPost = styled(Link)`
  position: absolute;
  right: calc((100% - 590px) / 2);
  bottom: 13px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 140px;
  height: 50px;
  border-radius: 24px;
  background-color: white;
  font-size: 15px;
  font-weight: bold;

  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.18);
    transform: scale(1.04);
  }
`;

export const UploadPostImg = styled.img`
  width: 24px;
  height: 24px;
  padding: 0 0 2px 2px;
  margin-right: 4px;
`;
