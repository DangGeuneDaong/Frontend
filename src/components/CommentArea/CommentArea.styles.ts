import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  height: 100px;
  margin: 0 auto;

  display: flex;
`;

export const CommentContainer = styled.div``;

export const CommentTextarea = styled.textarea`
  width: 590px;
  height: 90px;
  margin: 5px 10px 5px 0px;
  padding: 5px;

  resize: none;

  border: 1px solid ${(props) => props.theme.color.gray};
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  :hover {
    border: 1px solid black;
  }
`;
