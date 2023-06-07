import styled from 'styled-components';

export const Hashtag = styled.span`
  display: inline-flex;
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 30px;
  padding: 4px 10px;
  cursor: pointer;

  ${(props) => props.theme.font.hashtag};
`;
