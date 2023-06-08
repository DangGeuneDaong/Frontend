import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.div`
  width: 30%;
  height: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  padding: 70px;

  @media screen and (min-width: 768px) {
    width: 70%;
  }

  @media screen and (min-width: 1024px) {
    width: 50%;
  }
`;

export const H1 = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`;

export const ActiveJoinButton = styled.button.attrs((props) => ({
  type: 'submit',
}))`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.primary};
  font-style: ${(props) => props.theme.font.heading_md};
  font-weight: 500;
  font-size: 16px;

  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

export const InactiveJoinButton = styled(ActiveJoinButton)`
  background-color: #f7d48f;
`;
