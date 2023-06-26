import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.div`
  width: 600px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
  padding: 70px;
`;
export const ActiveLoginButton = styled.button.attrs((props) => ({
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
`;

export const InactiveLoginButton = styled(ActiveLoginButton)`
  background-color: #f7d48f;
`;
export const H1 = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

export const Comment = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 100px;
`;

export const Emphasis = styled.span`
  color: #ff557a;
  font-weight: 600;
`;

export const SocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Hr = styled.hr`
  width: 100%;
  color: black;
  size: 10;
  margin: 20px 0 20px 0;
`;
