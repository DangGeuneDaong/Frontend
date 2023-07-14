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
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ActiveSaveButton = styled.button.attrs((props) => ({
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

export const InactiveSaveButton = styled(ActiveSaveButton)`
  background-color: #f7d48f;
`;
export const H1 = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const RefreshButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 20px;
`;

export const AddSpan = styled.span`
  color: gray;
  font-size: 18px;
  cursor: pointer;
  margin: 10px 0 50px 0;
`;

export const ImgInput = styled.input`
  visibility: hidden;
  position: absolute;
`;

export const ProfileImg = styled.img`
  width: 145px;
  height: 145px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export const CancelButton = styled(AddSpan)`
  color: ${(props) => props.theme.color.lightRed};
`;
