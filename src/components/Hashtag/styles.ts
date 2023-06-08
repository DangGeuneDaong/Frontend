import styled from 'styled-components';
import { HashtagCSSProps } from '.';

export const Hashtag = styled.span<HashtagCSSProps>`
  display: inline-flex;
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 30px;
  padding: 4px 10px;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }

  .closeButton {
    margin: 1px 0 0 2px;
    fill: #9e9d9d;
    cursor: pointer;
  }

  ${(props) => props.theme.font.hashtag};

  ${(props) => props.onClick && `cursor: pointer;`}
`;
