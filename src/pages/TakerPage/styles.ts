import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TakerContainer = styled.div`
  width: 800px;
  height: fit-content;

  margin: 0 auto;
  margin-top: 10px;
  margin-botton: 10px;

  background-color: white;
  border: 1px solid ${(props) => props.theme.color.gray};

  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: gray;
`;
