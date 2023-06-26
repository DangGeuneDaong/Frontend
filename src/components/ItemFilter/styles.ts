import styled, { keyframes } from "styled-components";

import closeImg from '../../assets/imgs/remove-icon.png';

const fadeIn = keyframes`
  0% {
    opacity: 1;
    transform: translateY(495px);
  }
`

export const Container = styled.form`
  position: absolute;
  bottom: 0;
  width: 443px;
  height: 475px;
  padding: 38px 0;
  box-sizing: border-box;
  box-shadow: 0 -10px 20px 10px rgba(0,0,0, 0.1);
  border: 1.5px solid rgba(0,0,0, 0.1);
  border-radius: 38px 38px 0 0;
  background-color: white;
  
  animation: ${fadeIn} 0.15s ease-out;
`;

export const FilterUI = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 62px 16px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0,0,0, 0.06);
`;

export const CloseFilterButton = styled.button`
  background: url(${closeImg}) no-repeat;
  background-size: contain;
  width: 14px;
  height: 14px;
`;


export const FilterSection = styled.div`
  padding: 0 62px;
`;

export const FilterHeader = styled.h2`
  margin-bottom: 12px;
  font-size: 18px;
`;

export const PetTypeFilter = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 48px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0,0,0, 0.06);
`;

export const PetTypeLabel = styled.label`
  padding: 6px 12px;
  min-width: 58px;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 16px;
  font-size: 13px;
  color: black;
  text-align: center;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;

  &:hover {
    /* border: 1px solid ${props => props.theme.color.primary}; */
    border: 1px solid rgb(250, 86, 114);
  }
`;

export const PetType = styled.input`
  display: none;
  
  &:checked + label{
    /* background-color: ${props => props.theme.color.primary}; */
    background-color: rgba(250, 86, 114, 0.9);
    color: white;
    border: none;
  }
`;

export const TypeImg = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

export const StatusFilter = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
`;


export const StatusLabel = styled.label`
  padding: 6px 14px;
  min-width: 58px;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 16px;
  font-size: 13px;
  color: black;
  text-align: center;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;

  &:hover {
    /* border: 1px solid ${props => props.theme.color.primary}; */
    border: 1px solid rgb(250, 86, 114);
  }
`;

export const Status = styled.input`
  display: none;
  
  &:checked + label{
    /* background-color: ${props => props.theme.color.primary}; */
    background-color: rgba(250, 86, 114, 0.9);
    color: white;
    border: none;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 85px;
  width: 100%;
  height: 48px;
  line-height: 48px;
  border-radius: 14px;
  background-color: rgba(250, 86, 114, 1);
  font-size: 14px;
  color: white;
  text-align: center;
`;