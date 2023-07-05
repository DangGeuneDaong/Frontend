import * as S from './styles';

export interface MessageCSSProps {
  messageReceived?: 'message received' | 'message sended';
}

interface MessagesProps extends MessageCSSProps {
  message: {
    message: string;
    userId: string;
  };
}

function Message({ message }: MessagesProps) {
  return (
    <S.MessageListContainer>
      <li>
        <span>{message.userId}</span>
        <span>time</span>
        <p>{message.message}</p>
      </li>
    </S.MessageListContainer>
  );
}

export default Message;
