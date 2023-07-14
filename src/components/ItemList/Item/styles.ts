import styled from "styled-components";

interface ItemStatusCSSProps {
  status: string;
}

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  padding: 24px 32px 28px;
  width: 100%;
  min-height: 265px;
  border-bottom: 1px solid rgba(0,0,0,0.1);

  &:hover {
    /* background-color: rgba(242, 183, 5, 0.25); */
    background-color: rgba(250, 86, 114, 0.25);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;


export const ItemStatus = styled.span<ItemStatusCSSProps>`
  margin-bottom: 4px;
  width: 42px;
  font-size: 12px;
  font-weight: bold;
  /* color: ${props => props.status === '나눔중' ? props.theme.color.primary : 'black'}; */
  color: ${props => props.status === 'SHARING' ? '#FA5672' : 'black'};
`;

export const ItemBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ItemTitle = styled.h2`
  font-size: 18px;
`;

export const ItemLocation = styled.span`
  font-size: 13px;
`;