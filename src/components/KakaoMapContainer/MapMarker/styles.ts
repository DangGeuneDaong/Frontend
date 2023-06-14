import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: 1px solid ${props => props.theme.color.primary};
  border-radius: 24px;
  background-color: white;

  &:after {
    content: '';
    position: absolute;
    bottom: -5.5px;
    left: 24px;
    z-index: 1;
    display: block;
    width: 0;
    border-width: 7px 4px 0;
    border-style: solid;
    border-color: white transparent;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 24px;
    z-index: 1;
    display: block;
    width: 0;
    border-width: 7px 4px 0;
    border-style: solid;
    border-color: ${props => props.theme.color.primary} transparent;
  }
`;

export const MarkerImage = styled.img`
  width: 22px;
  height: 22px;
`;


export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled.h2`
  font-size: 12px;
  max-width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Category = styled.span`
  font-size: 10px;
`;
