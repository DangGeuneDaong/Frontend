import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  height: calc(100% - 202px);
  overflow-x: scroll;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);

  /* &::-webkit-scrollbar {
    width: 12px;
    height: 20px;
  } */
`;
