import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 600px;

  margin-left: 10px;

  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`;

export const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-top: 10px;
  padding-bottom: 10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 3px solid ${(props) => props.theme.color.primary};

  
`

export const ProfileContainer = styled.div`
  width: 75px;
  height: 75px;
  margin-right: 5px;

  background-color: ${(props) => props.theme.color.red};
  border-radius: 50%;
`

export const NameDistanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > span {
    ${(props) => props.theme.font.heading_sm}
  }
  > span:last-child {
    ${(props) => props.theme.font.contents}
  }
`

export const ChatBodyContainer = styled.div`
  height: calc(100% - 100px - 50px);

  padding-top: 10px;
  padding-bottom: 10px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

export const TakerContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 5px;
`

export const TakerProfile = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;

  background-color: ${(props) => props.theme.color.red};
  border-radius: 50%;
`

export const ChatContent = styled.div`
  width: 250px;
  margin-right: 5px;

  padding: 5px;

  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
`

export const OfferContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 5px;

  > div:first-child {
    background-color: ${(props) => props.theme.color.primary};
  }
  > div:last-child {
    margin-right: 5px;
  }
`

export const ChatFooterContainer = styled.div`
  height: 50px;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  > button {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.color.gray};
    border-radius: 50%;

    font-size: 12px;
  }
`

export const ChatInputContainer = styled.div`
  > input {
    width: 300px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.color.gray};
    border-radius: 10px;
  }
`