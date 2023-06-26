import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: calc(50% - 60px);
  bottom: 0;
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
  border: 1px solid #FA5672;  
  background-color: white;
  /* background: linear-gradient(to left top, #FFCF5A, #7E3DD9 0%); */
  /* color: white; */
  
  &:hover {
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.18);
  }
`;
