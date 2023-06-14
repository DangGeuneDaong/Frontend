import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 0 auto;

  > button {
    width: 90px;
    height: 40px;

    margin: 10px;

    background-color: ${(props) => props.theme.color.primary};
    border-radius: 10px;
    font-weight: 600;
  }
`;
