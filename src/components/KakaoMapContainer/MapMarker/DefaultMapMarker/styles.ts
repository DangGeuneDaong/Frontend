import styled from "styled-components";

interface ContainerCSSProps {
  isShow: boolean;
}

export const Container = styled.div<ContainerCSSProps>`
  position: relative;
  display: ${props => props.isShow ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  /* border: 1px solid ${props => props.theme.color.primary}; */
  border: 1px solid #FA5672;
  border-radius: 24px;
  background-color: white;

  &:hover {
    color: #FA5672;
  }

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
    /* border-color: ${props => props.theme.color.primary} transparent; */
    border-color: #FA5672 transparent;
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
