import styled from 'styled-components';
import { MessageCSSProps } from './Message';

export const MessageListContainer = styled.div<MessageCSSProps>`
  ${(props) => {
    switch (props.messageReceived) {
      case 'message received':
        return `
          background: white;
          color: ${props.theme.color.gray};
        `;
      case 'message sended':
        return `
          background: ${props.theme.color.primary};
          color: white;
          margin-left: auto;
        `;
    }
  }}

  > div {
    margin-bottom: 3px;
  }
`;
