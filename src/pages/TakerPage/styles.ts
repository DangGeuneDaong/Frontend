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
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.gray};

  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`;

export const FormContainer = styled.div`
  width: 700px;
  height: 100px;
  margin: 5px auto 10px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0 10px;
`;

export const ButtonContainer = styled.div`
  :hover {
    border: 1px solid black;
  }
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: gray;
`;
