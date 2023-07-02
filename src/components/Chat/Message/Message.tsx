import * as S from './styles';

export interface MessageCSSProps {
  messageReceived?: 'message received' | 'message sended';
}

interface MessagesProps extends MessageCSSProps {
  message: {
    message: string;
    username: string;
  };
}

function Message({ message }: MessagesProps) {
  return (
    <S.MessageListContainer>
      <div>
        <span>{message.username}</span>
        <span>time</span>
        <p>{message.message}</p>
      </div>
    </S.MessageListContainer>
  );
}

export default Message;
