import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 75px;
  font-size: 15px;
  font-weight: bold;
`;

export const CategoryLabel = styled.label`
  padding: 6px 10px;
  width: 64px;
  font-size: 13px;
  font-weight: lighter;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 16px;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    border: 1px solid ${props => props.theme.color.primary};
  }
`;

export const Category = styled.input`
  display: none;
  
  &:checked + label{
    background-color: ${props => props.theme.color.primary};
    border: none;
  }
`;

export const CategoryImg = styled.img`
  margin-right: 5px;
  width: 14px;
  height: 14px;
`;