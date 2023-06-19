import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlertContainer = styled.div<{ color?: string }>`
  width: 50%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${(props) => props.color};
  opacity: 0.7;
  color: white;
  font-weight: 600;
  padding: 10px;
`;
