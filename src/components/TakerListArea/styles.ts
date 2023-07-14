import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 0 auto;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;

  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const ProfileContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 5px;

  background-color: ${(props) => props.theme.color.red};
  border-radius: 50%;
`;

export const NameDistanceContainer = styled.div`
  > span {
    margin-right: 15px;
    font-weight: 600;
  }
`;

export const ChatButtonContainer = styled.div`
  margin-left: auto;

  > button {
    width: 90px;

    line-height: 50px;
    background-color: ${(props) => props.theme.color.primary};
  }
`;
