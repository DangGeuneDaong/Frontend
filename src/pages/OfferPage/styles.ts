import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;
  margin-bottom: 10px;
`;

export const OfferContainer = styled.div`
  width: 800px;
  height: fit-content;
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.gray};

  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`;

export const EditContainer = styled.div`
  width: 700px;
  margin: 0 auto;

  display: flex;
  button {
    width: 90px;
    height: 40px;

    margin: 10px;

    background-color: ${(props) => props.theme.color.primary};
    border-radius: 10px;
    font-weight: 600;
  }
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  background-color: gray;
`;

export const ListTitleContainer = styled.div`
  width: 700px;
  margin: 0 auto;

  ${(props) => props.theme.font.heading_sm}
`;
